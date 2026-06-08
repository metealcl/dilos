import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CustomCursor from './components/CustomCursor'
import Phase1 from './components/Phase1'
import Phase2and3 from './components/Phase2and3'
import Preloader from './components/Preloader'

export default function App() {
  const [phase, setPhase] = useState('terminal') // 'terminal' | 'main'
  const [loading, setLoading] = useState(true)
  const [shaking, setShaking] = useState(false)
  const [flashing, setFlashing] = useState(false)

  useEffect(() => {
    // Prevent scrolling while preloader is active
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [loading])

  const handleLaunch = () => {
    // 1. Shake
    setShaking(true)
    setTimeout(() => {
      setShaking(false)
      // 2. Flash white
      setFlashing(true)
      setTimeout(() => {
        // 3. Switch phase during flash
        setPhase('main')
        setTimeout(() => setFlashing(false), 600)
      }, 300)
    }, 550)
  }

  return (
    <motion.div
      className="relative w-full min-h-screen overflow-x-hidden"
      animate={
        shaking
          ? { x: [0, -8, 12, -14, 14, -10, 7, -4, 0], y: [0, -5, 5, -8, 8, -5, 3, -1, 0] }
          : { x: 0, y: 0 }
      }
      transition={shaking ? { duration: 0.55, ease: 'linear' } : {}}
    >
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <CustomCursor />

      {/* Flash overlay */}
      <AnimatePresence>
        {flashing && (
          <motion.div
            key="flash"
            className="fixed inset-0 z-[9990] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, #ffffff, #fce7f3)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === 'terminal' ? (
          <motion.div
            key="terminal"
            className="w-full min-h-screen"
            exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
            transition={{ duration: 0.55 }}
          >
            <Phase1 onLaunch={handleLaunch} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <Phase2and3 />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
