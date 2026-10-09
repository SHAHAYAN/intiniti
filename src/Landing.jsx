import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav, { Footer } from './Nav.jsx'
import { TemplateGrid } from './Templates.jsx'
import { templates } from './data.js'

const features = [
  ['✦', 'Scratch-off date', 'Guests scratch a gold foil card to uncover your date.'],
  ['⏳', 'Live countdown', 'Days, hours, minutes and seconds ticking to the big moment.'],
  ['✉', 'RSVP inbox', 'Collect attendance, head-counts and wishes in one place.'],
  ['♫', 'Ambient music', 'A soft soundtrack with a one-tap mute button.'],
  ['⌖', 'Venue map', 'Embedded map and one-click directions.'],
  ['🚪', 'Grand entrances', 'Door, curtain and envelope reveals with sparkles.'],
  ['🖼', 'Photo story', 'An auto-playing slideshow of your favourite moments.'],
  ['⚙', 'Toggle sections', 'Dress code, schedule, travel tips — show only what you need.'],
]
const steps = [
  ['Pick a design', 'Browse the gallery and open any live demo.'],
  ['Unlock it', 'One flat payment. No subscription.'],
  ['Add your details', 'Names, venue, timings and photos in a short form.'],
  ['Send the link', 'Share via WhatsApp, email or any chat app.'],
]
const faqs = [
  ['How do guests open it?', 'They simply tap your unique link — no app or sign-up needed.'],
  ['Can I make changes later?', 'Yes, edit as often as you like right up to the event; updates go live instantly.'],
  ['Is there a guest limit?', 'No. Share your link with as many people as you want.'],
  ['Which payment methods work?', 'UPI, cards, net banking and popular wallets.'],
]

export default function Landing() {
  const [open, setOpen] = useState(0)
  return (
    <>
      <Nav />
      <section className="hero">
        <div className="sparkles" />
        <p className="eyebrow">Digital invitations · Weddings · Birthdays · Every celebration</p>
        <h1 className="serif">Your invitation,<br /><em>as a living webpage.</em></h1>
        <p className="lead">Animated entrances, a scratch-to-reveal date, countdown, music, map and RSVP — all in one link your guests will remember.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/templates" className="btn">Browse templates</Link>
          <Link to="/invite/jade-gilt" className="btn btn-ghost">Open a live demo</Link>
        </div>
      </section>

      <section className="section">
        <h2 className="serif h2">Everything paper can't do</h2>
        <div className="grid">{features.map(([i, t, d]) => (
          <div className="feat" key={t}><div className="ficon">{i}</div><h3>{t}</h3><p>{d}</p></div>))}
        </div>
      </section>

      <section className="section alt">
        <h2 className="serif h2">{templates.length} handcrafted designs</h2>
        <TemplateGrid items={templates.slice(0, 4)} />
        <div style={{ textAlign: 'center', marginTop: 32 }}><Link to="/templates" className="btn">See all templates</Link></div>
      </section>

      <section className="section" id="how">
        <h2 className="serif h2">Ready in four steps</h2>
        <div className="grid">{steps.map(([t, d], i) => (
          <div className="feat" key={t}><div className="step">{i + 1}</div><h3>{t}</h3><p>{d}</p></div>))}
        </div>
      </section>

      <section className="section alt" id="faq">
        <h2 className="serif h2">Questions, answered</h2>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>{faqs.map(([q, a], i) => (
          <div className="faq" key={q} onClick={() => setOpen(open === i ? -1 : i)}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{q}</strong><span>{open === i ? '−' : '+'}</span></div>
            {open === i && <p style={{ margin: '10px 0 0', color: '#6b6258' }}>{a}</p>}
          </div>))}
        </div>
      </section>
      <Footer />
    </>
  )
}
