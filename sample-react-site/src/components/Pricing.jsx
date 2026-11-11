import { useState } from 'react'

const plans = [
  { name: 'Doodler', monthly: 0, perks: ['Drawing pad app', '10 robot sketches / month', 'Community prompts'] },
  { name: 'Artist', monthly: 12, perks: ['Unlimited sketches', 'Custom pen colors', 'Save & share gallery'], featured: true },
  { name: 'Studio', monthly: 39, perks: ['Up to 5 robots', 'Classroom mode', 'Priority support'] },
]

export default function Pricing() {
  const [yearly, setYearly] = useState(false)

  return (
    <section className="section" id="pricing">
      <h2>Simple pricing</h2>
      <div className="billing-toggle" role="group" aria-label="Billing period">
        <button className={!yearly ? 'active' : ''} onClick={() => setYearly(false)}>
          Monthly
        </button>
        <button className={yearly ? 'active' : ''} onClick={() => setYearly(true)}>
          Yearly <span className="save">−20%</span>
        </button>
      </div>
      <div className="grid">
        {plans.map((p) => {
          const price = yearly ? Math.round(p.monthly * 12 * 0.8) : p.monthly
          return (
            <article key={p.name} className={p.featured ? 'card plan featured' : 'card plan'}>
              {p.featured && <span className="pill">Most popular</span>}
              <h3>{p.name}</h3>
              <p className="price">
                ${price}
                <span>/{yearly ? 'year' : 'month'}</span>
              </p>
              <ul>
                {p.perks.map((perk) => (
                  <li key={perk}>✓ {perk}</li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
    </section>
  )
}
