import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function StarMap() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  // Random stars for the background
  const bgStars = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 2,
    dur: Math.random() * 3 + 2,
  }))

  // Constellation points (representing Gemini, June 8th birth sign!)
  const constellation = [
    { id: 'c1', x: 20, y: 30 },
    { id: 'c2', x: 35, y: 25 },
    { id: 'c3', x: 50, y: 35 },
    { id: 'c4', x: 45, y: 55 },
    { id: 'c5', x: 65, y: 45 },
    { id: 'c6', x: 75, y: 25 },
    { id: 'c7', x: 85, y: 65 },
    { id: 'c8', x: 65, y: 75 },
    { id: 'c9', x: 30, y: 80 },
  ]

  // Edges connecting the stars
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 7], [7, 6], [3, 8]
  ]

  return (
    <section className="relative z-10 px-4 py-16 max-w-4xl mx-auto">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <h2 className="font-playfair font-bold text-white text-4xl" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
          Gökyüzü Haritası 🌌
        </h2>
        <p className="text-white/60 font-nunito text-sm mt-3 uppercase tracking-widest">08 Haziran 2003 Gecesi</p>
      </motion.div>

      <div ref={ref} className="relative w-full aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />

        {/* BG Stars */}
        {bgStars.map(s => (
          <motion.div
            key={`bg-${s.id}`}
            className="absolute bg-white rounded-full"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
            animate={inView ? { opacity: [0.1, 0.8, 0.1] } : { opacity: 0 }}
            transition={{ repeat: Infinity, duration: s.dur, delay: s.delay, ease: 'easeInOut' }}
          />
        ))}

        {/* Constellation SVG Overlay */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Edges */}
          {edges.map((edge, i) => {
            const p1 = constellation[edge[0]]
            const p2 = constellation[edge[1]]
            return (
              <motion.line
                key={`line-${i}`}
                x1={`${p1.x}%`} y1={`${p1.y}%`}
                x2={`${p2.x}%`} y2={`${p2.y}%`}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.3"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: 'easeInOut' }}
              />
            )
          })}

          {/* Points */}
          {constellation.map((p, i) => (
            <motion.circle
              key={p.id}
              cx={`${p.x}%`} cy={`${p.y}%`}
              r="0.8"
              fill="#fff"
              filter="drop-shadow(0 0 4px rgba(255,255,255,0.8))"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: [0, 1.5, 1], opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.1, type: 'spring' }}
            />
          ))}
        </svg>

        {/* Text Overlay */}
        <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2, duration: 1 }}
          >
            <p className="font-playfair italic text-white/80 text-lg md:text-xl">
              "Yıldızların senin için hizalandığı o eşsiz gece..."
            </p>
            <p className="font-mono text-white/30 text-xs mt-2 tracking-widest">
              RA 06h 15m | Dec +23° | GEMINI
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
