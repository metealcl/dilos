import { useEffect, useRef } from 'react'

// Katakana + ASCII mix for that matrix feel
const CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*<>{}[]'

export default function MatrixRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animId
    const fontSize = 13
    let cols, drops

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      cols = Math.floor(canvas.width / fontSize) + 1
      drops = Array.from({ length: cols }, () => Math.random() * -50)
    }
    init()

    const PURPLE_SHADES = ['#9333ea', '#a855f7', '#c084fc', '#7c3aed', '#6d28d9']

    const draw = () => {
      // Slight fade trail
      ctx.fillStyle = 'rgba(8, 8, 16, 0.055)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `bold ${fontSize}px "Courier New", monospace`

      for (let i = 0; i < cols; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const shade = PURPLE_SHADES[i % PURPLE_SHADES.length]
        ctx.fillStyle = shade
        ctx.globalAlpha = Math.random() * 0.5 + 0.15
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        // Bright head character
        if (Math.random() > 0.97) {
          ctx.fillStyle = '#e9d5ff'
          ctx.globalAlpha = 0.9
          ctx.fillText(char, i * fontSize, drops[i] * fontSize)
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i] += 0.5
      }
      ctx.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    const onResize = () => { init() }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.55 }}
    />
  )
}
