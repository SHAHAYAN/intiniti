import { Link } from 'react-router-dom'
import Nav, { Footer } from './Nav.jsx'
import { templates } from './data.js'
export function TemplateGrid({ items = templates }) {
  return (
    <div className="grid">
      {items.map(t => (
        <Link to={`/invite/${t.id}`} key={t.id} className="tcard">
          <div className="tprev" style={{ background: t.bg, color: t.text, borderColor: t.accent }}>
            <div style={{ border: `1px solid ${t.accent}`, inset: 12, position: 'absolute', borderRadius: 6 }} />
            <small style={{ color: t.accent, letterSpacing: 3 }}>TOGETHER WITH THEIR FAMILIES</small>
            <div className="serif" style={{ fontSize: 30, margin: '10px 0' }}>Meera <span style={{ color: t.accent }}>&</span> Kabir</div>
            <small>12 · 12 · 2026</small>
          </div>
          <div style={{ padding: 16 }}>
            <h3 className="serif" style={{ margin: 0, fontSize: 22 }}>{t.name}</h3>
            <p style={{ margin: '6px 0 0', color: '#6b6258', fontSize: 14 }}>{t.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
export default function Templates() {
  return (<><Nav /><section className="section"><h1 className="serif h2">All templates</h1><p className="muted">Tap any design to open a fully interactive demo.</p><TemplateGrid /></section><Footer /></>)
}
