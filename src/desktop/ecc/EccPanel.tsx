import { useEffect, useMemo, useRef, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { createPortal } from 'react-dom'
import { api, useDesktop } from '../client'
import { Icon } from '../Icons'
import { kindLabels, loadCatalog, sourceLink } from './types'
import type { EccCatalog, EccItem, EccKind, EccOpenRequest, EccState } from './types'
import './ecc.css'

const errorText = (error: unknown) => error instanceof Error ? error.message : String(error)
const emptyState: EccState = { favorites: [], kits: [] }
const pageSize = 40
interface UseDraft { task: string; sessionId: string; prompt: string; promptHash: string; preparedTask: string; status: string; sent: boolean; requestId: string }
const freshDraft = (task = ''): UseDraft => ({ task, sessionId: '', prompt: '', promptHash: '', preparedTask: '', status: '', sent: false, requestId: crypto.randomUUID() })

export default function EccPanel({ onClose, onNavigate, request }: { onClose: () => void; onNavigate: (panel: 'skills' | 'mcp' | 'settings') => void; request?: EccOpenRequest }) {
  const desktop = useDesktop()
  const [catalog, setCatalog] = useState<EccCatalog | null>(null)
  const [saved, setSaved] = useState<EccState>(emptyState)
  const [stateReady, setStateReady] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [tab, setTab] = useState<'workflows' | 'library' | 'kits'>(request?.query ? 'library' : 'workflows')
  const [query, setQuery] = useState(request?.query || '')
  const [kind, setKind] = useState<EccKind | 'all'>('all')
  const [limit, setLimit] = useState(pageSize)
  const [expanded, setExpanded] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [detail, setDetail] = useState<EccItem | null>(null)
  const [using, setUsing] = useState(false)
  const [draft, setDraft] = useState<UseDraft>(() => freshDraft(request?.task))
  const [draftBusy, setDraftBusy] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)
  const detailRequest = useRef(0)
  const [kitName, setKitName] = useState('')
  const [saving, setSaving] = useState(false)
  const saveLock = useRef(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    let alive = true
    loadCatalog().then(value => { if (alive) setCatalog(value) }).catch(error => { if (alive) setError(errorText(error)) })
    api<EccState>('/ecc/state').then(value => { if (alive) { setSaved(value); setStateReady(true) } }).catch(error => { if (alive) setError(`Private kits could not be loaded: ${errorText(error)}`) })
    return () => { alive = false }
  }, [])
  useEffect(() => {
    if (!expanded || !dialog.current) return
    const previous = document.activeElement as HTMLElement | null
    const element = dialog.current
    element.showModal()
    return () => { element.close(); previous?.focus() }
  }, [expanded])
  useEffect(() => {
    closeButton.current?.focus()
  }, [])
  const filtered = useMemo(() => (catalog?.items || []).filter(item => (kind === 'all' || item.kind === kind) && `${item.name} ${item.description} ${item.path}`.toLowerCase().includes(query.toLowerCase())), [catalog, kind, query])
  const picked = useMemo(() => (catalog?.items || []).filter(item => selected.includes(item.id)), [catalog, selected])
  async function persist(next: EccState) {
    if (saveLock.current || !stateReady || !desktop.connected) return false
    saveLock.current = true; setSaving(true); setError('')
    try { setSaved(await api<EccState>('/ecc/state', next, 'PUT')); return true }
    catch (error) { setError(errorText(error)); return false }
    finally { saveLock.current = false; setSaving(false) }
  }
  const favorite = (id: string) => void persist({ ...saved, favorites: saved.favorites.includes(id) ? saved.favorites.filter(value => value !== id) : [...saved.favorites, id] })
  const choose = (id: string) => setSelected(values => values.includes(id) ? values.filter(value => value !== id) : values.length < 8 ? [...values, id] : values)
  async function showDetail(item: EccItem) {
    if (draftBusy) return
    const generation = ++detailRequest.current
    setDetail(item); setUsing(false); setDetailLoading(true)
    try {
      const full = await api<EccItem>(`/ecc/item?id=${encodeURIComponent(item.id)}`)
      if (generation === detailRequest.current) setDetail(full)
    } catch (error) { if (generation === detailRequest.current) setError(errorText(error)) }
    finally { if (generation === detailRequest.current) setDetailLoading(false) }
  }
  const beginUse = (ids: string[]) => { if (draftBusy) return; detailRequest.current++; setDraft(freshDraft(request?.task)); setSelected(ids); setUsing(true); setExpanded(true); setNotice('') }
  const changeTab = (value: typeof tab) => { if (draftBusy) return; detailRequest.current++; setTab(value); setDetail(null); setUsing(false); setLimit(pageSize); setQuery('') }
  const back = () => { if (draftBusy) return; detailRequest.current++; if (using) setUsing(false); else if (detail) setDetail(null); else setExpanded(false) }
  const itemRow = (item: EccItem) => <article className={`ecc-item ${selected.includes(item.id) ? 'is-picked' : ''}`} key={item.id}>
    <input type="checkbox" disabled={draftBusy || using || (selected.length >= 8 && !selected.includes(item.id))} checked={selected.includes(item.id)} onChange={() => choose(item.id)} aria-label={`Select ${item.name}`} />
    <button className="ecc-item-main" disabled={draftBusy} onClick={() => void showDetail(item)}><span className="ecc-kind">{item.kind}</span><strong>{item.name}</strong><span>{item.description || item.path}</span></button>
    <button className={`ecc-star ${saved.favorites.includes(item.id) ? 'is-favorite' : ''}`} disabled={!stateReady || saving || !desktop.connected} onClick={() => favorite(item.id)} aria-label={`${saved.favorites.includes(item.id) ? 'Unfavorite' : 'Favorite'} ${item.name}`} title="Save to My Kits">{saved.favorites.includes(item.id) ? '★' : '☆'}</button>
  </article>
  const body = <>
    <header className="ecc-header"><div><span className="ecc-eyebrow">ON-DEMAND TOOLKIT</span><h2><Icon name="ecc" size={20} /> ECC</h2></div><div className="ecc-header-actions">{expanded ? <button className="desk-icon" disabled={draftBusy} onClick={() => setExpanded(false)} aria-label="Collapse ECC" title="Return to compact drawer"><Icon name="back" /></button> : <button className="desk-icon" onClick={() => setExpanded(true)} aria-label="Expand ECC" title="Expand library"><Icon name="external" /></button>}<button ref={expanded ? undefined : closeButton} className="desk-icon" disabled={draftBusy} onClick={onClose} aria-label="Close ECC"><Icon name="close" /></button></div></header>
    <nav className="ecc-tabs" aria-label="ECC sections">{([['workflows', 'Workflows'], ['library', 'Library'], ['kits', 'My Kits']] as const).map(([value, label]) => <button key={value} disabled={draftBusy} aria-current={tab === value ? 'page' : undefined} onClick={() => changeTab(value)}>{label}</button>)}</nav>
    <div className="ecc-context"><span className="ecc-status-dot" /> Instructions only · nothing runs automatically</div>
    {error && <div className="ecc-message error" role="alert">{error}<button onClick={() => setError('')} aria-label="Dismiss ECC error">×</button></div>}
    {notice && <p className="ecc-message" role="status">{notice}</p>}
    {!desktop.connected && <p className="ecc-message">Offline: browsing remains available. Save and send require the local service.</p>}
    {!catalog ? <div className="ecc-empty">{error ? 'Close and reopen ECC to retry loading.' : 'Loading your bundled library…'}</div> : <div className={`ecc-body ${detail || using ? 'has-detail' : ''}`}>
      <section className="ecc-browser" aria-label="ECC catalog">
        {tab !== 'kits' && <div className="ecc-search"><Icon name="search" size={15} /><input aria-label="Search ECC" placeholder={tab === 'workflows' ? 'Find a workflow…' : 'Search skills, roles, commands…'} value={query} onChange={event => { setQuery(event.target.value); setLimit(pageSize) }} /></div>}
        {tab === 'workflows' && <div className="ecc-scroll"><div className="ecc-intro"><h3>Choose a starting point</h3><p>Curated instruction bundles for one task. Review before you send.</p></div>{catalog.workflows.filter(flow => `${flow.name} ${flow.description}`.toLowerCase().includes(query.toLowerCase())).map((flow, index) => <article className="ecc-workflow" key={flow.id}><span className="ecc-workflow-number">{String(index + 1).padStart(2, '0')}</span><h3>{flow.name}</h3><p>{flow.description}</p><div><small>{flow.itemIds.length} instructions</small><button onClick={() => beginUse(flow.itemIds)}>Use once <Icon name="arrow" size={13} /></button></div></article>)}{!catalog.workflows.some(flow => `${flow.name} ${flow.description}`.toLowerCase().includes(query.toLowerCase())) && <p className="ecc-empty">No matching workflows. Browse Library for individual instructions.</p>}</div>}
        {tab === 'library' && <><div className="ecc-filters"><label>Type<select value={kind} onChange={event => { setKind(event.target.value as EccKind | 'all'); setLimit(pageSize) }}><option value="all">All instructions</option>{Object.entries(kindLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><span>{filtered.length} results</span></div><div className="ecc-scroll">{filtered.slice(0, limit).map(itemRow)}{!filtered.length && <p className="ecc-empty">No matches. Try a shorter phrase or another type.</p>}{filtered.length > limit && <button className="ecc-load" onClick={() => setLimit(value => value + pageSize)}>Show {Math.min(pageSize, filtered.length - limit)} more</button>}</div></>}
        {tab === 'kits' && <div className="ecc-scroll"><div className="ecc-intro"><h3>My Kits</h3><p>Private favorites and reusable bundles. Saving a kit does not install or enable it.</p></div>{saved.kits.map(kit => <article className="ecc-kit" key={kit.id}><h3>{kit.name}</h3><p>{kit.itemIds.length} instructions</p><div><button onClick={() => beginUse(kit.itemIds)}>Use once</button><button disabled={saving || !stateReady || !desktop.connected} onClick={() => void persist({ ...saved, kits: saved.kits.filter(value => value.id !== kit.id) })} aria-label={`Remove kit ${kit.name}`}>Remove</button></div></article>)}<h4 className="ecc-section-label">Favorites · {saved.favorites.length}</h4>{catalog.items.filter(item => saved.favorites.includes(item.id)).map(itemRow)}{!saved.favorites.length && <p className="ecc-empty">Star an instruction in Library to keep it here.</p>}</div>}
      </section>
      {using ? <UseOnce catalog={catalog} items={picked} draft={draft} setDraft={setDraft} busy={draftBusy} setBusy={setDraftBusy} onBack={back} /> : detail ? <section className="ecc-detail"><button className="ecc-back" onClick={back}><Icon name="back" size={14} /> Back to library</button><span className="ecc-kind">{detail.kind} · instruction only</span><h3>{detail.name}</h3><p>{detail.description}</p><button className="ecc-primary" onClick={() => beginUse([detail.id])}>Use once</button><dl><dt>Source</dt><dd>{detail.path}</dd><dt>Compatibility</dt><dd>{Array.isArray(detail.compatibility) ? detail.compatibility.join(' · ') : typeof detail.compatibility === 'string' ? detail.compatibility : 'Native syntax may vary by provider. Review the original instructions; unsupported integrations remain manual.'}</dd></dl>{!!detail.requirements?.length && <><h4>Requirements</h4><ul>{detail.requirements.map((value, i) => <li key={i}>{value}</li>)}</ul></>}{!!detail.cautions?.length && <><h4>Review before use</h4><ul>{detail.cautions.map((value, i) => <li key={i}>{value}</li>)}</ul></>}{!!detail.companions?.length && <details><summary>Companion files · not installed</summary><ul>{detail.companions.map((file, i) => <li key={i}>{file.path}{file.executable ? ' · executable, manual review required' : ''}</li>)}</ul></details>}<details className="ecc-source" open><summary>Read original instructions</summary><pre>{detailLoading ? 'Loading pinned instructions…' : detail.content || 'Source unavailable. Close and reopen this item to retry.'}</pre></details>{sourceLink(catalog, detail.path) && <a href={sourceLink(catalog, detail.path)!} target="_blank" rel="noreferrer">View pinned upstream source ↗</a>}</section> : expanded && <section className="ecc-detail ecc-detail-empty"><Icon name="ecc" size={44} /><h3>Bring the right instructions.<br />Only when you ask.</h3><p>Choose a workflow, inspect an item, or select a few instructions to make your own kit.</p><span>Browse → Review → Use once</span></section>}
    </div>}
    {!!selected.length && !using && <div className="ecc-selection"><strong>{selected.length}/8 selected</strong><button onClick={() => setSelected([])}>Clear</button><button className="ecc-primary" onClick={() => beginUse(selected)}>Review & use</button><form onSubmit={event => { event.preventDefault(); if (!kitName.trim()) return; void persist({ ...saved, kits: [...saved.kits, { id: crypto.randomUUID(), name: kitName.trim(), itemIds: selected }] }).then(ok => { if (ok) setKitName('') }) }}><input aria-label="New kit name" placeholder="Name this kit…" value={kitName} maxLength={60} onChange={event => setKitName(event.target.value)} /><button disabled={!kitName.trim() || saving || !stateReady || !desktop.connected}>Save kit</button></form></div>}
    <footer className="ecc-footer"><details><summary>Advanced & source</summary><p>Pinned ECC {catalog?.source.commit.slice(0, 8) || '…'} · {catalog?.source.license || 'MIT'}. This bundled snapshot makes no network requests on open. Updates require review and an application update.</p><p>Hooks, memory and orchestration references are documentation only. Nothing is installed globally, connected or injected into ordinary messages.</p><div><button disabled={draftBusy} onClick={() => onNavigate('skills')}>Project Skills</button><button disabled={draftBusy} onClick={() => onNavigate('mcp')}>MCP status</button><button disabled={draftBusy} onClick={() => onNavigate('settings')}>Settings</button></div></details></footer>
  </>
  return <><div className="files-panel ecc-panel" onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); if (!draftBusy) onClose() } }}>{!expanded && body}{expanded && <div className="ecc-empty">ECC is expanded.<button disabled={draftBusy} onClick={() => setExpanded(false)}>Return to drawer</button></div>}</div>{expanded && createPortal(<dialog ref={dialog} className="ecc-dialog" aria-label="ECC library" onCancel={event => { event.preventDefault(); if (!draftBusy) setExpanded(false) }}><div className="ecc-panel ecc-expanded">{body}</div></dialog>, document.body)}</>
}

function UseOnce({ catalog, items, draft, setDraft, busy, setBusy, onBack }: { catalog: EccCatalog; items: EccItem[]; draft: UseDraft; setDraft: Dispatch<SetStateAction<UseDraft>>; busy: boolean; setBusy: (value: boolean) => void; onBack: () => void }) {
  const desktop = useDesktop()
  const { task, sessionId, prompt, preparedTask, promptHash, status, sent, requestId } = draft
  const patch = (value: Partial<UseDraft>) => setDraft(current => ({ ...current, ...value }))
  const setStatus = (status: string) => patch({ status })
  const lock = useRef(false)
  const sessions = desktop.sessions.filter(session => session.open && session.status === 'running' && ['codex', 'claude'].includes(session.agent) && !session.bypass)
  const selected = sessions.find(session => session.id === sessionId)
  const itemIds = items.map(item => item.id)
  const current = !!prompt && preparedTask === task
  async function prepare() {
    if (lock.current) return
    lock.current = true; setBusy(true); setStatus('')
    try { const result = await api<{ prompt: string; promptHash: string }>('/ecc/prepare', { itemIds, task, catalogCommit: catalog.source.commit }); patch({ prompt: result.prompt, promptHash: result.promptHash, preparedTask: task }) }
    catch (error) { setStatus(errorText(error)) }
    finally { lock.current = false; setBusy(false) }
  }
  async function send() {
    if (lock.current || sent || !current || !selected) return
    lock.current = true; setBusy(true); patch({ sent: true })
    try { const result = await api<{ status: string; message?: string }>('/ecc/send', { requestId, promptHash, sessionId, itemIds, task, catalogCommit: catalog.source.commit }); setStatus(result.message || (result.status === 'delivered' ? 'Delivered to the selected terminal. This is not task completion.' : 'Delivery uncertain. Inspect the terminal before doing anything else.')) }
    catch (error) { setStatus(`Delivery not confirmed: ${errorText(error)}. Inspect the terminal before retrying; this form will not resend.`) }
    finally { lock.current = false; setBusy(false) }
  }
  return <section className="ecc-detail ecc-use"><button className="ecc-back" disabled={busy} onClick={onBack}><Icon name="back" size={14} /> Back</button><span className="ecc-kind">ONE TASK · EXPLICIT SEND</span><h3>Review before using</h3><p>{items.length} instruction{items.length === 1 ? '' : 's'}: {items.map(item => item.name).join(', ')}</p><label>Your task<textarea aria-label="ECC task" placeholder="Describe one bounded task and what must stay unchanged…" value={task} maxLength={4000} disabled={busy || sent} onChange={event => patch({ task: event.target.value })} /></label><label>Existing agent & project<select aria-label="ECC target chat" value={sessionId} disabled={busy || sent} onChange={event => patch({ sessionId: event.target.value })}><option value="">Choose a running chat…</option>{sessions.map(session => <option key={session.id} value={session.id}>{session.agent} · {session.name} · {session.cwd}</option>)}</select></label>{selected && <div className="ecc-target"><strong>{selected.agent} · normal CLI permissions</strong><code>{selected.cwd}</code></div>}{!sessions.length && <p>No eligible running Codex or Claude chats. Other providers can use Copy prompt. Open a supported chat yourself with normal CLI permissions, or copy the reviewed prompt. ECC never starts an agent.</p>}<button className="ecc-primary" onClick={() => void prepare()} disabled={busy || sent || !task.trim() || !items.length || !desktop.connected}>Prepare exact prompt</button>{prompt && <><label>Prompt preview · {prompt.length.toLocaleString()} characters<textarea className="ecc-prompt" value={prompt} readOnly aria-label="ECC prompt preview" /></label>{!current && <p>Task changed. Prepare the prompt again before sending or copying.</p>}<div className="ecc-use-actions"><button disabled={!current || busy} onClick={() => navigator.clipboard.writeText(prompt).then(() => setStatus('Prompt copied. Review the destination before pasting; nothing was sent.')).catch(error => setStatus(errorText(error)))}><Icon name="copy" size={14} /> Copy prompt</button><button className="ecc-primary" disabled={!current || !selected || busy || sent || !desktop.connected} onClick={() => void send()}>Send once to selected chat</button></div></>}<p className="ecc-small">Instructions are reference material, not permission to install tools, execute hooks, change global rules or weaken approvals. Existing agent/project rules still apply.</p>{status && <p className="ecc-message" role="status">{status}</p>}</section>
}
