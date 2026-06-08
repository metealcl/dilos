import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GoldenParticles from './GoldenParticles'

export default function Phase1({ onLaunch }) {
  const [step, setStep] = useState(0) // 0=logo, 1=text, 2=button
  const [buttonHovered, setButtonHovered] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 900)
    const t2 = setTimeout(() => setStep(2), 2400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 40%, #1a0c10 0%, #0d0608 55%, #060304 100%)' }}
    >
      <GoldenParticles />

      {/* Soft center spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 55% 45% at 50% 45%, rgba(251,146,60,0.07) 0%, transparent 65%)',
            'radial-gradient(ellipse 40% 35% at 50% 45%, rgba(244,114,182,0.05) 0%, transparent 60%)',
          ].join(','),
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg gap-8">
        
        {/* Elegant monogram / icon */}
        <AnimatePresence>
          <motion.div
            key="icon"
            initial={{ opacity: 0, scale: 0.4, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 14, delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            {/* Decorative ring */}
            <div className="relative">
              <motion.div
                className="w-28 h-28 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(145deg, rgba(251,191,36,0.12), rgba(244,114,182,0.08))',
                  border: '1px solid rgba(251,191,36,0.2)',
                  boxShadow: '0 0 60px rgba(251,191,36,0.12), 0 0 120px rgba(244,114,182,0.06), inset 0 0 40px rgba(251,191,36,0.04)',
                }}
                animate={{ boxShadow: [
                  '0 0 40px rgba(251,191,36,0.1), 0 0 80px rgba(244,114,182,0.05)',
                  '0 0 70px rgba(251,191,36,0.2), 0 0 140px rgba(244,114,182,0.1)',
                  '0 0 40px rgba(251,191,36,0.1), 0 0 80px rgba(244,114,182,0.05)',
                ]}}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <motion.span
                  className="text-5xl"
                  animate={{ rotate: [0, -8, 8, -5, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 2 }}
                >
                  🎁
                </motion.span>
              </motion.div>

              {/* Orbiting dots */}
              {[0, 120, 240].map((deg, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: i === 0 ? '#fbbf24' : i === 1 ? '#f472b6' : '#fb923c',
                    top: '50%', left: '50%',
                    boxShadow: `0 0 8px ${i === 0 ? '#fbbf24' : i === 1 ? '#f472b6' : '#fb923c'}`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4 + i, ease: 'linear' }}
                  transformOrigin="center"
                  // orbit at radius 54px
                  transformTemplate={(_,generated) =>
                    `rotate(${deg}deg) translateX(54px) rotate(-${deg}deg) ${generated}`
                  }
                />
              ))}
            </div>

            {/* Elegant top line */}
            <div className="flex items-center gap-3">
              <div className="h-px w-14 bg-gradient-to-r from-transparent to-amber-400/40" />
              <span className="text-amber-400/60 text-xs font-nunito font-bold tracking-[0.35em] uppercase">Sana Özel</span>
              <div className="h-px w-14 bg-gradient-to-l from-transparent to-amber-400/40" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Main name */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              key="name"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 70, damping: 16 }}
              className="flex flex-col items-center gap-2"
            >
              <h1
                className="font-playfair font-bold text-white"
                style={{
                  fontSize: 'clamp(3.5rem, 14vw, 6.5rem)',
                  lineHeight: 1.05,
                  textShadow: '0 4px 40px rgba(251,191,36,0.25), 0 0 80px rgba(244,114,182,0.15)',
                  letterSpacing: '-0.01em',
                }}
              >
                Diloş
              </h1>

              <motion.p
                className="font-nunito text-white/45 text-sm tracking-[0.22em] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Hoş geldin &nbsp;✦&nbsp; Seni bekliyorduk
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtitle */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.p
              key="sub"
              className="font-playfair italic text-white/35 text-lg md:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9 }}
              style={{ textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}
            >
              "Bugün dünya daha güzel,<br />çünkü sen doğdun. 🤍"
            </motion.p>
          )}
        </AnimatePresence>

        {/* Enter button */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              key="btn"
              initial={{ opacity: 0, y: 28, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 140, damping: 16 }}
              className="flex flex-col items-center gap-3 mt-2"
            >
              <motion.button
                onClick={onLaunch}
                className="relative group px-10 py-3.5 rounded-full overflow-hidden font-nunito text-sm md:text-base text-white/90 tracking-[0.2em] uppercase select-none border border-white/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), 0 10px 30px rgba(0,0,0,0.5)',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Subtle hover glow behind text */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-3">
                  <span className="font-semibold text-amber-500/80 group-hover:text-amber-400 transition-colors duration-500">Sürprizi Aç</span>
                  <span className="text-amber-500/50 group-hover:text-amber-400 transition-colors duration-500">→</span>
                </span>
              </motion.button>

              <motion.p
                className="text-white/20 text-xs font-nunito tracking-widest"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.4 }}
              >
                sana özel hazırlandı ✦
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom ambient line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.2), rgba(244,114,182,0.2), transparent)' }}
      />
    </div>
  )
}
