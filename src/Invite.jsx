import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { templates } from './data.js'

const EVENT = new Date('2026-12-12T18:30:00')
const photos = ['#c9a27e', '#8fa89b', '#b7869a', '#7d8fb3']

function Countdown() {
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])
  const d = Math.max(0, EVENT - now)
  const parts = [['Days', d / 864e5], ['Hours', d / 36e5 % 24], ['Mins', d / 6e4 % 60], ['Secs', d / 1e3 % 60]]
  return <div className="cd">{parts.map(([l, v]) => <div key={l}><b>{String(Math.floor(v)).padStart(2, '0')}</b><span>{l}</span></div>)}</div>
}

function Scratch({ accent }) {
  const ref = useRef(); const [done, setDone] = useState(false)
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d')
    const g = ctx.createLinearGradient(0, 0, c.width, c.height)
    g.addColorStop(0, '#c9a54e'); g.addColorStop(1, '#f1dc9a')
    ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height)
    ctx.fillStyle = '#5a4415'; ctx.font = '16px Inter'; ctx.textAlign = 'center'
    ctx.fillText('Scratch to reveal the date', c.width / 2, c.height / 2 + 5)
    let down = false, n = 0
    const scratch = e => {
      if (!down) return; const r = c.getBoundingClientRect(); const p = e.touches ? e.touches[0] : e
      ctx.globalCompositeOperation = 'destination-out'; ctx.beginPath()
      ctx.arc(p.clientX - r.left, p.clientY - r.top, 22, 0, 7); ctx.fill()
      if (++n > 60) setDone(true)
    }
    const on = () => (down = true), off = () => (down = false)
    c.addEventListener('pointerdown', on); window.addEventListener('pointerup', off); c.addEventListener('pointermove', scratch)
    return () => { window.removeEventListener('pointerup', off) }
  }, [])
  return (
    <div className="scratch" style={{ borderColor: accent }}>
      <div className="serif" style={{ fontSize: 34 }}>Saturday<br /><span style={{ color: accent }}>12 December 2026</span></div>
      <canvas ref={ref} width={320} height={140} style={{ opacity: done ? 0 : 1 }} />
    </div>
  )
}

export default function Invite() {
  const { id } = useParams()
  const t = templates.find(x => x.id === id) || templates[0]
  const [opened, setOpened] = useState(false)
  const [opening, setOpening] = useState(false)
  const [muted, setMuted] = useState(true)
  const [slide, setSlide] = useState(0)
  const [msgs, setMsgs] = useState([{ name: 'Riya', attending: 'Yes', count: 2, msg: 'Cannot wait to celebrate with you both!' }])
  const [form, setForm] = useState({ name: '', attending: 'Yes', count: 1, msg: '' })
  const audio = useRef()
  useEffect(() => { const s = setInterval(() => setSlide(x => (x + 1) % photos.length), 3000); return () => clearInterval(s) }, [])
  const toggleMusic = () => {
    if (!audio.current) {
      const ac = new AudioContext(); const gain = ac.createGain(); gain.gain.value = 0.04; gain.connect(ac.destination)
      ;[261.6, 329.6, 392].forEach(f => { const o = ac.createOscillator(); o.type = 'sine'; o.frequency.value = f; o.connect(gain); o.start() })
      audio.current = ac; setMuted(false); return
    }
    muted ? audio.current.resume() : audio.current.suspend(); setMuted(!muted)
  }
  const send = e => { e.preventDefault(); if (!form.name) return; setMsgs([form, ...msgs]); setForm({ name: '', attending: 'Yes', count: 1, msg: '' }) }
  const css = { '--bg': t.bg, '--ac': t.accent, '--tx': t.text }

  return (
    <div className="inv" style={css}>
      {!opened && (
        <div className={`entry ${opening ? 'open' : ''}`} onClick={() => { setOpening(true); setTimeout(() => setOpened(true), 1400) }}>
          <div className="leaf l" /><div className="leaf r" />
          <div className="entry-label"><div className="serif" style={{ fontSize: 40 }}>M <span style={{ color: t.accent }}>&</span> K</div><p>Tap to open</p></div>
        </div>
      )}
      <button className="mute" onClick={toggleMusic} aria-label="Toggle music">{muted ? '🔇' : '🔊'}</button>
      <Link to="/templates" className="back">← Templates</Link>

      <section className="ihero">
        <div className="sparkles" />
        <small className="ac" style={{ letterSpacing: 4 }}>TOGETHER WITH THEIR FAMILIES</small>
        <h1 className="serif">Meera <span className="ac">&</span> Kabir</h1>
        <p>request the pleasure of your company at their wedding</p>
      </section>
      <section className="isec"><h2 className="serif">Save the date</h2><Scratch accent={t.accent} /></section>
      <section className="isec"><h2 className="serif">Counting down</h2><Countdown /></section>
      <section className="isec"><h2 className="serif">Our story</h2>
        <div className="slides">{photos.map((p, i) => <div key={i} className="slide" style={{ background: p, opacity: slide === i ? 1 : 0 }}><span className="serif">Chapter {i + 1}</span></div>)}</div>
      </section>
      <section className="isec"><h2 className="serif">Schedule</h2>
        <div className="sched">{[['Haldi', '11 Dec · 10:00 AM'], ['Sangeet', '11 Dec · 7:00 PM'], ['Wedding', '12 Dec · 6:30 PM']].map(([a, b]) => <div key={a}><h3 className="serif ac">{a}</h3><p>{b}</p></div>)}</div>
        <p style={{ opacity: .8 }}>Dress code: festive traditional · Shuttle from city centre at 5:30 PM</p>
      </section>
      <section className="isec"><h2 className="serif">Venue</h2><p>The Lakeside Gardens, Udaipur</p>
        <iframe title="map" className="map" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=73.67%2C24.56%2C73.70%2C24.59&layer=mapnik" />
      </section>
      <section className="isec"><h2 className="serif">RSVP & wishes</h2>
        <form className="rsvp" onSubmit={send}>
          <input placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <div style={{ display: 'flex', gap: 8 }}>
            <select value={form.attending} onChange={e => setForm({ ...form, attending: e.target.value })}><option>Yes</option><option>No</option><option>Maybe</option></select>
            <input type="number" min="1" value={form.count} onChange={e => setForm({ ...form, count: e.target.value })} />
          </div>
          <textarea placeholder="Leave a message" value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} />
          <button className="btn">Send</button>
        </form>
        <div className="inbox">{msgs.map((m, i) => <div key={i}><b>{m.name}</b> · {m.attending} ({m.count})<p>{m.msg}</p></div>)}</div>
      </section>
      <footer className="isec" style={{ opacity: .7 }}>Made with Vowlink</footer>
    </div>
  )
}
