import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SecretVault() {
  const [code, setCode] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState(false)
  const CORRECT_CODE = '0806' // Haziran 8 (08.06)

  const handleKey = (num) => {
    if (code.length < 4 && !unlocked) {
      const newCode = code + num
      setCode(newCode)
      if (newCode.length === 4) {
        if (newCode === CORRECT_CODE) {
          setTimeout(() => setUnlocked(true), 300)
        } else {
          setError(true)
          setTimeout(() => {
            setCode('')
            setError(false)
          }, 800)
        }
      }
    }
  }

  const handleDelete = () => {
    if (code.length > 0 && !unlocked) setCode(code.slice(0, -1))
  }

  return (
    <section className="relative z-10 px-4 py-20 max-w-lg mx-auto">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-amber-500/60 font-nunito text-xs tracking-[0.3em] uppercase mb-2 block">Çok Gizli</span>
        <h2 className="font-playfair font-bold text-white text-3xl md:text-4xl">Gizli Kasa 🔒</h2>
        {!unlocked && <p className="text-white/40 text-sm mt-3 font-nunito italic">Şifre: Doğduğunuz gün ve ay (4 hane)</p>}
      </motion.div>

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="lock"
            className="p-8 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg,rgba(15,10,20,0.8),rgba(5,2,10,0.6))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(251,191,36,0.15)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            {/* Display */}
            <motion.div
              className={`flex justify-center gap-4 mb-8 ${error ? 'text-red-500' : 'text-amber-500'}`}
              animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{ borderColor: error ? '#ef4444' : 'rgba(251,191,36,0.3)' }}>
                  {code[i] && <div className="w-2.5 h-2.5 rounded-full bg-current" />}
                </div>
              ))}
            </motion.div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-6 max-w-[240px] mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <motion.button
                  key={num}
                  onClick={() => handleKey(num.toString())}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' }}
                  whileTap={{ scale: 0.95, backgroundColor: 'rgba(251,191,36,0.15)' }}
                  className="h-16 w-16 mx-auto rounded-full text-white/80 font-nunito text-2xl font-light cursor-pointer flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/0 hover:border-white/5 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  {num}
                </motion.button>
              ))}
              <div />
              <motion.button
                onClick={() => handleKey('0')}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.95, backgroundColor: 'rgba(251,191,36,0.15)' }}
                className="h-16 w-16 mx-auto rounded-full text-white/80 font-nunito text-2xl font-light cursor-pointer flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/0 hover:border-white/5 transition-colors"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                0
              </motion.button>
              <motion.button
                onClick={handleDelete}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.95, backgroundColor: 'rgba(2ef,68,68,0.2)' }}
                className="h-16 w-16 mx-auto rounded-full text-white/40 hover:text-red-400 font-nunito text-base font-light cursor-pointer flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/0 hover:border-red-500/20 transition-colors"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                ⌫
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            className="p-8 md:p-10 rounded-3xl text-center"
            style={{
              background: 'linear-gradient(135deg,rgba(40,20,10,0.9),rgba(15,5,5,0.8))',
              border: '1px solid rgba(251,191,36,0.4)',
              boxShadow: '0 0 80px rgba(251,191,36,0.15), inset 0 0 20px rgba(251,191,36,0.05)',
            }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <span className="text-5xl mb-4 block">🎫</span>
            <h3 className="font-playfair font-bold text-white text-2xl mb-4">Erişim Onaylandı</h3>
            <div className="w-16 h-px bg-amber-500/30 mx-auto mb-5" />
            <p className="text-white/80 font-nunito text-base leading-relaxed italic">
              "Bu şifreyi çözebilecek kadar akıllı olduğunu biliyordum... Bu sana özel bir davetiye. İstediğin bir gün, istediğin bir yerde kahveler benden. Sadece ne zaman müsait olduğunu söylemen yeterli. ✨"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
