import { useState } from 'react'

const subjects = ['a sleepy cat', 'a lighthouse', 'a robot in love', 'a mountain cabin', 'a dancing cactus', 'a rocket']
const styles = ['in one continuous line', 'with only circles', 'upside down', 'in 30 seconds', 'with your eyes closed', 'as a tiny comic']

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export default function Hero() {
  const [prompt, setPrompt] = useState('Draw a lighthouse in one continuous line')

  return (
    <section className="hero" id="top">
      <div className="hero-text">
        <span className="pill">New · Learns from every stroke</span>
        <h1>
          The robot that <em>draws</em> with you.
        </h1>
        <p>
          Sketchbot is a pen-plotting robot trained with reinforcement learning. Give it a
          prompt, doodle a line, and it finishes the sketch on real paper.
        </p>
        <div className="prompt-card">
          <span className="prompt-label">Today’s prompt</span>
          <p className="prompt" aria-live="polite">{prompt}</p>
          <button
            className="btn"
            onClick={() => setPrompt(`Draw ${pick(subjects)} ${pick(styles)}`)}
          >
            Give me another
          </button>
        </div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <svg viewBox="0 0 200 200">
          <rect x="55" y="60" width="90" height="70" rx="16" className="bot-body" />
          <circle cx="82" cy="92" r="9" className="bot-eye" />
          <circle cx="118" cy="92" r="9" className="bot-eye" />
          <path d="M84 113 Q100 124 116 113" className="bot-line" />
          <line x1="100" y1="60" x2="100" y2="40" className="bot-line" />
          <circle cx="100" cy="35" r="6" className="bot-accent" />
          <path d="M145 110 L172 140 L166 146 L140 118" className="bot-arm" />
          <path d="M20 175 C 60 150, 100 190, 170 160" className="bot-scribble" />
        </svg>
      </div>
    </section>
  )
}
