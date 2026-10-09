import { Link } from 'react-router-dom'
export default function Nav() {
  return (
    <header className="nav">
      <Link to="/" className="logo">Vow<span>link</span></Link>
      <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <Link to="/templates">Templates</Link>
        <a href="/#how">How it works</a>
        <a href="/#faq">FAQ</a>
        <Link to="/invite/jade-gilt" className="btn btn-sm">Live demo</Link>
      </nav>
    </header>
  )
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="logo">Vow<span>link</span></div>
      <p style={{ opacity: .7, margin: '8px 0 0' }}>© 2026 Vowlink. Invitations that feel like an event of their own.</p>
    </footer>
  )
}
