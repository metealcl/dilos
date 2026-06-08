import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ToastAnimation() {
  const [toasted, setToasted] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const handleToast = () => {
    if (toasted) return
    setToasted(true)
    setTimeout(() => setShowMessage(true), 800)
    setTimeout(() => { setToasted(false); setShowMessage(false) }, 4000)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        onClick={handleToast}
        className="flex items-center gap-3 px-6 py-3 rounded-full text-amber-500 font-playfair italic text-lg tracking-wide select-none"
        style={{
          background: 'linear-gradient(135deg, rgba(251,191,36,0.08), rgba(251,191,36,0.02))',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(251,191,36,0.3)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {toasted ? (
            <motion.span
              key="clink"
              initial={{ rotate: -30, scale: 0 }}
              animate={{ rotate: [30, -20, 15, -10, 0], scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="text-xl"
            >
              ✦
            </motion.span>
          ) : (
            <motion.span key="glass" className="text-xl" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✧
            </motion.span>
          )}
        </AnimatePresence>
        <span>Bir Dilek Tut</span>
      </motion.button>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="text-center px-6 py-3 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg,rgba(0,0,0,0.6),rgba(0,0,0,0.3))',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(251,191,36,0.2)',
            }}
            initial={{ opacity: 0, y: -12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <p className="text-amber-400 font-playfair italic text-sm tracking-wide">
              "Tüm dileklerinin gerçek olması dileğiyle..." ✦
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
