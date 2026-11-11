import { useState } from 'react'

const links = [
  ['Try it', 'try'],
  ['Features', 'features'],
  ['Pricing', 'pricing'],
  ['FAQ', 'faq'],
  ['Contact', 'contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const go = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="nav">
      <button className="brand" onClick={() => go('top')}>
        <span className="brand-mark" aria-hidden="true">✎</span> Sketchbot
      </button>
      <button
        className="nav-toggle"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        ☰
      </button>
      <nav className={open ? 'nav-links open' : 'nav-links'}>
        {links.map(([label, id]) => (
          <button key={id} onClick={() => go(id)}>
            {label}
          </button>
        ))}
      </nav>
    </header>
  )
}
