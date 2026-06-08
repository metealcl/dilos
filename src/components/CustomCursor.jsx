import { useEffect, useRef } from 'react'

const COLORS = ['#f9a8d4', '#c084fc', '#818cf8', '#fbbf24', '#f472b6', '#a5f3fc']
const N = 18

export default function CustomCursor() {
  const containerRef = useRef(null)
  const posRef = useRef({ x: -200, y: -200 })
  const starsRef = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Build trail star elements
    const stars = []
    for (let i = 0; i < N; i++) {
      const ratio = (i + 1) / N
      const size = 3 + ratio * 8
      const el = document.createElement('div')
      el.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        background: ${COLORS[i % COLORS.length]};
        box-shadow: 0 0 ${size * 2}px ${COLORS[i % COLORS.length]}, 0 0 ${size}px white;
        will-change: left, top;
        left: -200px;
        top: -200px;
      `
      container.appendChild(el)
      stars.push({ el, x: -200, y: -200 })
    }
    starsRef.current = stars

    // Smooth chase loop
    const loop = () => {
      const target = posRef.current
      const s = starsRef.current

      s[0].x += (target.x - s[0].x) * 0.35
      s[0].y += (target.y - s[0].y) * 0.35
      s[0].el.style.left = s[0].x + 'px'
      s[0].el.style.top = s[0].y + 'px'

      for (let i = 1; i < N; i++) {
        s[i].x += (s[i - 1].x - s[i].x) * 0.35
        s[i].y += (s[i - 1].y - s[i].y) * 0.35
        s[i].el.style.left = s[i].x + 'px'
        s[i].el.style.top = s[i].y + 'px'
        s[i].el.style.opacity = ((i + 1) / N) * 0.85
      }

      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    const onMouse = (e) => { posRef.current = { x: e.clientX, y: e.clientY } }

    window.addEventListener('mousemove', onMouse)

    return () => {
      window.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return <div ref={containerRef} className="hidden md:block fixed inset-0 pointer-events-none" style={{ zIndex: 999999 }} />
}
