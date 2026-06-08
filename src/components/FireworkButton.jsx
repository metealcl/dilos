import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function FireworkButton() {
  const [burst, setBurst] = useState(false)

  const launch = () => {
    if (burst) return
    setBurst(true)

    const C = ['#fbbf24','#f43f7e','#f97316','#a78bfa','#34d399','#60a5fa','#e879f9','#fff']
    const fire = (opts) => confetti({ colors: C, ticks: 350, ...opts })

    // Massive simultaneous burst
    fire({ particleCount: 200, spread: 120, origin: { x: .5, y: .4 }, scalar: 1.5 })
    setTimeout(() => {
      fire({ particleCount: 100, angle: 55,  spread: 80, origin: { x: 0,  y: .5 } })
      fire({ particleCount: 100, angle: 125, spread: 80, origin: { x: 1,  y: .5 } })
      fire({ particleCount: 80,  angle: 90,  spread: 60, origin: { x: .5, y: .8 } })
    }, 150)
    setTimeout(() => {
      // Fireworks from random positions
      for (let i = 0; i < 5; i++) {
        setTimeout(() => fire({
          particleCount: 50,
          startVelocity: 55,
          spread: 360,
          origin: { x: Math.random(), y: Math.random() * .5 },
        }), i * 200)
      }
    }, 400)

    setTimeout(() => setBurst(false), 3500)
  }

  return (
    <motion.button
      onClick={launch}
      className="fixed left-6 bottom-6 z-[1000] w-[72px] h-[72px] rounded-full flex flex-col items-center justify-center shadow-2xl select-none overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1f140a, #0a0508)',
        border: '1px solid rgba(251,191,36,0.3)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6), inset 0 0 20px rgba(251,191,36,0.1)',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 90, damping: 14 }}
    >
      {/* Shimmer sweep */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s linear infinite',
        }}
      />

      <AnimatePresence mode="wait">
        {burst ? (
          <motion.span
            key="boom"
            className="text-2xl relative z-10 text-amber-500"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.4, 1] }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            ✦
          </motion.span>
        ) : (
          <motion.span key="idle" className="text-2xl relative z-10 text-amber-300" initial={{ scale: 0 }} animate={{ scale: 1 }}>
            ✧
          </motion.span>
        )}
      </AnimatePresence>
      <span className="text-amber-500/70 text-[9px] font-nunito font-black tracking-widest relative z-10 mt-1 uppercase">Tıkla</span>
    </motion.button>
  )
}
