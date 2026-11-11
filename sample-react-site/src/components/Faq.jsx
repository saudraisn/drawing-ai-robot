import { useState } from 'react'

const faqs = [
  ['Do I need to know how to code?', 'Not at all. The app handles everything; the code is there if you want to tinker.'],
  ['What paper does it use?', 'Any flat sheet up to A4, from printer paper to thick watercolor card.'],
  ['Can it draw my own designs?', 'Yes. Draw on the pad or upload an image and Sketchbot plots it line by line.'],
  ['Is this a real product?', 'No. This is a sample website built with React to show what a landing page can look like.'],
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section alt" id="faq">
      <h2>Questions</h2>
      <div className="faq">
        {faqs.map(([q, a], i) => (
          <div key={q} className={open === i ? 'faq-item open' : 'faq-item'}>
            <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              {q}
              <span aria-hidden="true">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && <p>{a}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
