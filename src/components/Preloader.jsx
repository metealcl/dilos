import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [year, setYear] = useState(2003)

  useEffect(() => {
    let currentYear = 2003
    const targetYear = 2026
    const totalDuration = 3500 // 3.5 seconds total
    const intervalTime = totalDuration / (targetYear - 2003)

    const timer = setInterval(() => {
      currentYear++
      if (currentYear >= targetYear) {
        setYear(targetYear)
        clearInterval(timer)
        setTimeout(() => {
          onComplete()
        }, 1000) // Hold at 2026 for a full second
      } else {
        setYear(currentYear)
      }
    }, intervalTime)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999999] bg-[#050203] flex flex-col items-center justify-center pointer-events-auto overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.15, filter: 'blur(20px)' }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative flex items-center justify-center w-80 h-80">
        
        {/* Core Glowing Planet / Singularity */}
        <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-amber-900/40 to-amber-500/20 shadow-[0_0_60px_rgba(251,191,36,0.3),inset_0_0_20px_rgba(251,191,36,0.5)] backdrop-blur-md border border-amber-500/20" />

        {/* 3D Orbit Ring 1 (Fast Inner) */}
        <motion.div 
          className="absolute w-40 h-40 rounded-full border border-amber-500/20"
          style={{ borderTop: '3px solid rgba(251,191,36,0.9)', boxShadow: '0 -5px 15px rgba(251,191,36,0.4)' }}
          animate={{ rotateX: 60, rotateY: 30, rotateZ: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
        
        {/* 3D Orbit Ring 2 (Medium Middle) */}
        <motion.div 
          className="absolute w-56 h-56 rounded-full border border-amber-400/10"
          style={{ borderBottom: '2px solid rgba(251,191,36,0.7)', boxShadow: '0 5px 20px rgba(251,191,36,0.3)' }}
          animate={{ rotateX: 75, rotateY: -45, rotateZ: -360 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
        />

        {/* 3D Orbit Ring 3 (Slow Outer) */}
        <motion.div 
          className="absolute w-72 h-72 rounded-full border border-amber-300/5"
          style={{ borderRight: '2px solid rgba(251,191,36,0.5)', boxShadow: '5px 0 25px rgba(251,191,36,0.2)' }}
          animate={{ rotateX: 50, rotateY: 60, rotateZ: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />

        {/* Floating Particles Around Orbit */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]"
            animate={{
              rotate: 360,
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 2 + i, ease: "linear" },
              scale: { repeat: Infinity, duration: 1 + i*0.5, ease: "easeInOut" },
              opacity: { repeat: Infinity, duration: 1 + i*0.5, ease: "easeInOut" }
            }}
            style={{
              originX: `${(i+2)*20}px`, // Varied orbit radius
              originY: `${(i+1)*15}px`
            }}
          />
        ))}

        {/* Dynamic Year Counter in the Center */}
        <div className="absolute flex flex-col items-center">
          <motion.div 
            className="text-4xl md:text-5xl font-playfair font-black text-white"
            style={{ 
              textShadow: '0 0 30px rgba(251,191,36,0.8), 0 0 10px rgba(255,255,255,0.8)',
              fontVariantNumeric: 'tabular-nums'
            }}
            key={year}
            initial={{ opacity: 0.5, scale: 0.8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.15 }}
          >
            {year}
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="mt-16 text-amber-500/70 font-nunito tracking-[0.5em] text-xs uppercase"
        initial={{ opacity: 0, letterSpacing: '0.1em' }}
        animate={{ opacity: 1, letterSpacing: '0.5em' }}
        transition={{ duration: 2 }}
      >
        {year === 2026 ? "Orbit Complete" : "Initiating 23rd Orbit..."}
      </motion.div>
    </motion.div>
  )
}
