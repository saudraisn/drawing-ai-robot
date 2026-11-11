const features = [
  { icon: '🧠', title: 'Trained with RL', text: 'Learned to draw through thousands of episodes of trial, error and reward.' },
  { icon: '🖊️', title: 'Real pen, real paper', text: 'A precise two-axis arm plots your drawing on any A4 sheet.' },
  { icon: '🤝', title: 'Draws with you', text: 'Start a sketch and let Sketchbot finish it, or take turns line by line.' },
  { icon: '⚡', title: 'Fast setup', text: 'Plug in over USB, open the app, and you are drawing within two minutes.' },
]

export default function Features() {
  return (
    <section className="section alt" id="features">
      <h2>Why Sketchbot</h2>
      <div className="grid">
        {features.map((f) => (
          <article key={f.title} className="card">
            <span className="card-icon" aria-hidden="true">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
