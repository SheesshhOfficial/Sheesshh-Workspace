export type EccKind = 'skill' | 'role' | 'command' | 'rule' | 'context'
export interface EccItem {
  id: string; kind: EccKind; name: string; description: string; path: string; sha256: string; content: string
  companions?: { path: string; executable?: boolean }[]
  requirements?: string[]; compatibility?: unknown; cautions?: string[]
}
export interface EccWorkflow { id: string; name: string; description?: string; itemIds: string[]; instructions?: string }
export interface EccCatalog { schemaVersion: number; source: { repo: string; commit: string; license: string }; items: EccItem[]; itemFiles?: string[]; workflows: EccWorkflow[] }
export interface EccKit { id: string; name: string; itemIds: string[] }
export interface EccState { favorites: string[]; kits: EccKit[]; updatedAt?: string }
export interface EccOpenRequest { query?: string; task?: string }
export const kindLabels: Record<EccKind, string> = { skill: 'Skills', role: 'Roles', command: 'Commands', rule: 'Rules', context: 'Contexts' }
let catalogPromise: Promise<EccCatalog> | undefined
export function loadCatalog() {
  catalogPromise ||= fetch('/ecc/catalog.json').then(async response => {
    if (!response.ok) throw new Error('The bundled ECC catalog is unavailable. Check your application update.')
    const data = await response.json() as EccCatalog
    if (!Array.isArray(data.items) || !Array.isArray(data.workflows) || !data.source?.commit) throw new Error('The bundled ECC catalog is invalid.')
    if (data.itemFiles) {
      if (!Array.isArray(data.itemFiles) || data.itemFiles.length > 20 || data.itemFiles.some(file => !/^items\/part-[0-9]+\.json$/.test(file))) throw new Error('Invalid ECC item manifest.')
      const parts = await Promise.all(data.itemFiles.map(async file => {
        const response = await fetch(`/ecc/${file}`)
        if (!response.ok) throw new Error('The bundled ECC index is incomplete.')
        const items: unknown = await response.json()
        if (!Array.isArray(items)) throw new Error('Invalid ECC item index.')
        return items as EccItem[]
      }))
      data.items = parts.flat()
    }
    return data
  }).catch(error => { catalogPromise = undefined; throw error })
  return catalogPromise
}
export function sourceLink(catalog: EccCatalog, path = '') {
  const repo = catalog.source.repo.replace(/^https:\/\/github.com\//, '').replace(/\/$/, '')
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo) || !/^[a-f0-9]{40}$/i.test(catalog.source.commit)) return null
  return `https://github.com/${repo}/blob/${catalog.source.commit}/${path.split('/').map(encodeURIComponent).join('/')}`
}
