import { useEffect, useRef, useState } from 'react'

const colors = ['#1f2937', '#e2553f', '#2f80ed', '#27ae60', '#f2a93b']

export default function DrawingPad() {
  const canvasRef = useRef(null)
  const drawing = useRef(false)
  const last = useRef(null)
  const [color, setColor] = useState(colors[0])
  const [size, setSize] = useState(4)
  const [strokes, setStrokes] = useState(0)

  // Match the canvas's pixel size to its on-screen size for crisp lines.
  useEffect(() => {
    const canvas = canvasRef.current
    const ratio = window.devicePixelRatio || 1
    const { width, height } = canvas.getBoundingClientRect()
    canvas.width = width * ratio
    canvas.height = height * ratio
    const ctx = canvas.getContext('2d')
    ctx.scale(ratio, ratio)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [])

  const point = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const start = (e) => {
    canvasRef.current.setPointerCapture(e.pointerId)
    drawing.current = true
    last.current = point(e)
  }

  const move = (e) => {
    if (!drawing.current) return
    const ctx = canvasRef.current.getContext('2d')
    const p = point(e)
    ctx.strokeStyle = color
    ctx.lineWidth = size
    ctx.beginPath()
    ctx.moveTo(last.current.x, last.current.y)
    ctx.lineTo(p.x, p.y)
    ctx.stroke()
    last.current = p
  }

  const end = () => {
    if (drawing.current) setStrokes((n) => n + 1)
    drawing.current = false
  }

  const clear = () => {
    const canvas = canvasRef.current
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    setStrokes(0)
  }

  return (
    <section className="section" id="try">
      <h2>Try the drawing pad</h2>
      <p className="section-lead">
        Draw something below. Sketchbot watches every stroke you make.
      </p>
      <div className="pad">
        <div className="pad-toolbar">
          <div className="swatches" role="radiogroup" aria-label="Pen color">
            {colors.map((c) => (
              <button
                key={c}
                role="radio"
                aria-checked={c === color}
                aria-label={`Color ${c}`}
                className={c === color ? 'swatch active' : 'swatch'}
                style={{ background: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
          <label className="size">
            Pen size
            <input
              type="range"
              min="1"
              max="20"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
            />
            <span>{size}px</span>
          </label>
          <button className="btn btn-ghost" onClick={clear}>
            Clear
          </button>
        </div>
        <canvas
          ref={canvasRef}
          className="canvas"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
        />
        <p className="pad-status">
          {strokes === 0
            ? 'Blank page. Draw a line to begin.'
            : `${strokes} stroke${strokes === 1 ? '' : 's'}. Sketchbot is ${
                strokes < 5 ? 'warming up' : strokes < 15 ? 'taking notes' : 'very impressed'
              }.`}
        </p>
      </div>
    </section>
  )
}
