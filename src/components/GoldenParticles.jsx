import { useEffect, useRef } from 'react'

// Warm golden bokeh particles — reduced count for mobile performance
const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 4 + Math.random() * 22,
  dur: 6 + Math.random() * 10,
  delay: Math.random() * 8,
  opacity: 0.06 + Math.random() * 0.18,
  color: [
    'rgba(251,191,36,', // amber
    'rgba(249,115,22,', // orange
    'rgba(244,114,182,', // pink
    'rgba(253,186,116,', // peach
    'rgba(252,211,77,', // yellow
    'rgba(255,255,255,', // white
  ][i % 6],
}))

export default function GoldenParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, ${p.color}${p.opacity + 0.1}) 0%, ${p.color}0) 70%)`,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}${p.opacity}), 0 0 ${p.size}px ${p.color}${p.opacity * 0.5})`,
            filter: 'blur(0.5px)',
            animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0px) translateX(0px) scale(1); opacity: var(--op, 0.15); }
          25%      { transform: translateY(-18px) translateX(8px)  scale(1.08); }
          50%      { transform: translateY(-10px) translateX(-6px) scale(0.96); }
          75%      { transform: translateY(-22px) translateX(4px)  scale(1.04); }
        }
      `}</style>
    </div>
  )
}
