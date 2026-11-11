import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="section" id="contact">
      <h2>Get early access</h2>
      {submitted ? (
        <div className="card thanks" role="status">
          <h3>Thanks, {form.name.split(' ')[0] || 'friend'}!</h3>
          <p>This is a demo, so nothing was sent, but in a real site your message would be on its way.</p>
          <button
            className="btn btn-ghost"
            onClick={() => {
              setForm({ name: '', email: '', message: '' })
              setSubmitted(false)
            }}
          >
            Send another
          </button>
        </div>
      ) : (
        <form className="card form" onSubmit={submit}>
          <label>
            Name
            <input name="name" value={form.name} onChange={update} required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={update} required />
          </label>
          <label>
            What would you draw first?
            <textarea name="message" rows="4" value={form.message} onChange={update} />
          </label>
          <button className="btn" type="submit">
            Join the waitlist
          </button>
        </form>
      )}
    </section>
  )
}
