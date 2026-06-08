import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FutureLetter() {
  const [msg, setMsg] = useState('')
  const [sealed, setSealed] = useState(false)

  const seal = () => {
    if (!msg.trim()) return
    setSealed(true)
    setMsg('')
    
    // Hide the success message after 6 seconds
    setTimeout(() => {
      setSealed(false)
    }, 6000)
  }

  return (
    <section className="relative z-10 px-4 py-16 max-w-2xl mx-auto">
      {/* Heading */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <h2
          className="font-playfair font-bold text-white"
          style={{ fontSize: 'clamp(1.8rem,5vw,2.8rem)', textShadow: '0 4px 20px rgba(0,0,0,0.12)' }}
        >
          Geleceğe Mektup 📬
        </h2>
        <p className="text-white/55 font-nunito text-sm mt-2">
          Kendine bir not bırak — 23. doğum günündeki hislerin 🤍
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!sealed ? (
          /* Write form */
          <motion.div
            key="write"
            className="rounded-3xl p-6"
            style={{
              background: 'linear-gradient(135deg,rgba(0,0,0,0.6),rgba(0,0,0,0.3))',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            {/* Envelope top deco */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">✍️</span>
              <div>
                <p className="text-white font-nunito font-black text-base">Kendine Yaz</p>
                <p className="text-white/45 font-nunito text-xs mt-0.5">
                  Bu mesaj sonsuza dek kaybolacak ve dileğin olarak seninle yaşayacaktır 🌌
                </p>
              </div>
            </div>

            <div className="mb-4 px-4 py-3 rounded-2xl text-sm font-nunito text-white/55 italic"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px dashed rgba(255,255,255,0.2)' }}
            >
              Şu an nasıl hissediyorsun? Hayallerini, korkularını, beklentilerini evrene bırak. 🤍
            </div>

            <textarea
              placeholder="Sevgili 23 yaşındaki Diloş, şu an..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              maxLength={600}
              rows={6}
              className="w-full px-4 py-3 rounded-2xl text-sm font-nunito font-bold outline-none resize-none mb-4"
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1.5px solid rgba(255,255,255,0.25)',
                color: 'white',
                caretColor: 'white',
              }}
            />

            <div className="flex items-center justify-between">
              <span className="text-white/30 text-xs font-nunito">{msg.length}/600</span>
              <motion.button
                onClick={seal}
                disabled={!msg.trim()}
                className="px-8 py-3 rounded-2xl text-white font-nunito font-black text-sm relative overflow-hidden disabled:opacity-40"
                style={{
                  background: 'linear-gradient(135deg,#fbbf24,#f97316,#f43f7e)',
                  boxShadow: msg.trim() ? '0 8px 24px rgba(249,115,22,0.4)' : 'none',
                }}
                whileHover={msg.trim() ? { scale: 1.03 } : {}}
                whileTap={msg.trim() ? { scale: 0.97 } : {}}
              >
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s linear infinite',
                }} />
                <span className="relative">Mühürle 📩</span>
              </motion.button>
            </div>

          </motion.div>
        ) : (
          <motion.div
            key="sealed"
            className="rounded-3xl p-8 flex flex-col items-center gap-6 text-center"
            style={{
              background: 'linear-gradient(135deg,rgba(0,0,0,0.6),rgba(0,0,0,0.3))',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(251,191,36,0.3)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.3), inset 0 0 20px rgba(251,191,36,0.1)',
            }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <motion.div
              className="text-6xl"
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              ✨
            </motion.div>
            <div>
              <h3 className="text-amber-400 font-nunito font-black text-xl mb-2">Evrene Gönderildi</h3>
              <p className="text-white/80 font-nunito text-base leading-relaxed italic">
                "Bu mesaj sonsuza dek kayboldu ve bir dilek olarak seninle yaşamaya devam edecek..."
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
