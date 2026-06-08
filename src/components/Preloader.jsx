import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 2200 // 2.2 seconds total loading
    const intervalTime = 40
    const steps = duration / intervalTime

    const timer = setInterval(() => {
      start += 100 / steps
      if (start >= 100) {
        setProgress(100)
        clearInterval(timer)
        setTimeout(() => {
          onComplete()
        }, 500) // Hold at 100% for half a second before fading out
      } else {
        // Add random jitter to make it feel like real network loading
        const randomJump = start + (Math.random() * 3 - 1)
        setProgress(Math.min(Math.max(randomJump, 0), 99))
      }
    }, intervalTime)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999999] bg-[#050203] flex flex-col items-center justify-center pointer-events-auto"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-64 flex flex-col items-center">
        {/* The elegant loading text */}
        <motion.div 
          className="text-amber-500/80 font-nunito tracking-[0.4em] text-[10px] mb-8 uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Connecting to 08.06.2003
        </motion.div>

        {/* The extremely thin premium line */}
        <div className="w-full h-[1px] bg-white/5 relative overflow-hidden rounded-full">
          <motion.div 
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-amber-600 to-amber-400"
            style={{ width: `${progress}%` }}
            animate={{ boxShadow: '0 0 15px rgba(251,191,36,0.6)' }}
          />
        </div>

        {/* The percentage */}
        <motion.div 
          className="mt-6 text-white/40 font-playfair italic text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Math.floor(progress)}%
        </motion.div>
      </div>
    </motion.div>
  )
}
