import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NEXT_BIRTHDAY = new Date(2025, 5, 8) // 08 Haziran 2025
const CREATED_DATE  = '08 Haziran 2024'

export default function FutureLetter() {
  const [msg, setMsg] = useState('')
  const [sealed, setSealed] = useState(false)
  const [savedMsg, setSavedMsg] = useState(
    () => localStorage.getItem('dilos_future_letter') || ''
  )
  const [showLetter, setShowLetter] = useState(false)

  const daysUntil = Math.max(
    0,
    Math.ceil((NEXT_BIRTHDAY - new Date()) / (1000 * 60 * 60 * 24))
  )

  const seal = () => {
    if (!msg.trim()) return
    localStorage.setItem('dilos_future_letter', msg.trim())
    setSavedMsg(msg.trim())
    setSealed(true)
    setMsg('')
  }

  const reveal = () => setShowLetter(true)

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
          Gelecekteki Diloş'a bir not bırak — 22. doğum günündeki hislerin 🤍
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Show saved letter */}
        {savedMsg && showLetter ? (
          <motion.div
            key="revealed"
            className="rounded-3xl p-7"
            style={{
              background: 'linear-gradient(135deg,rgba(40,20,10,0.96),rgba(30,10,5,0.98))',
              border: '2px solid rgba(251,191,36,0.25)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
            initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ type: 'spring', stiffness: 90, damping: 14 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="text-2xl">📜</span>
              <div>
                <p className="font-nunito font-black text-amber-300 text-sm">Kendi Mektubun</p>
                <p className="font-nunito text-amber-400/70 text-xs">Yazıldı: {CREATED_DATE}</p>
              </div>
            </div>
            <p className="font-nunito text-amber-50/90 text-base leading-relaxed whitespace-pre-wrap">
              "{savedMsg}"
            </p>
            <div className="mt-6 pt-4 border-t border-amber-200 flex justify-between items-center">
              <p className="text-amber-600/55 text-xs font-nunito font-bold">— Diloş, 22 yaşında 💛</p>
              <button
                onClick={() => { setShowLetter(false); setSavedMsg(''); localStorage.removeItem('dilos_future_letter'); setSealed(false) }}
                className="text-amber-400/60 hover:text-amber-600/80 text-xs font-nunito transition-colors"
              >
                Sil & Yeniden Yaz
              </button>
            </div>
          </motion.div>
        ) : savedMsg && !showLetter ? (
          /* Sealed letter waiting */
          <motion.div
            key="sealed"
            className="rounded-3xl p-7 flex flex-col items-center gap-6 text-center"
            style={{
              background: 'linear-gradient(135deg,rgba(0,0,0,0.6),rgba(0,0,0,0.3))',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 120 }}
          >
            <motion.div
              className="text-7xl"
              animate={{ rotate: [0, -6, 6, -4, 4, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: 2 }}
            >
              📩
            </motion.div>
            <div>
              <h3 className="text-white font-nunito font-black text-xl">Mektup Mühürlendi!</h3>
              <p className="text-white/60 font-nunito text-sm mt-2">
                23. doğum gününde açabilirsin 🔒<br />
                <span className="text-white/40 text-xs mt-1 block">
                  {daysUntil > 0 ? `${daysUntil} gün sonra açılabilir` : 'Artık açabilirsin! 🎉'}
                </span>
              </p>
            </div>
            <motion.button
              onClick={reveal}
              className="px-8 py-3 rounded-2xl text-white font-nunito font-black text-sm overflow-hidden relative"
              style={{
                background: 'linear-gradient(135deg,#fbbf24,#f97316)',
                boxShadow: '0 8px 24px rgba(251,191,36,0.35)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {daysUntil > 0 ? `Yine de Aç 🔓` : 'Mektubu Aç 💌'}
            </motion.button>
          </motion.div>
        ) : (
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
                  23. doğum gününde okuyacaksın 💛
                </p>
              </div>
            </div>

            <div className="mb-4 px-4 py-3 rounded-2xl text-sm font-nunito text-white/55 italic"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px dashed rgba(255,255,255,0.2)' }}
            >
              Şu an nasıl hissediyorsun? Hayallerini, korkularını, beklentilerini yaz. Bir yıl sonraki sen okuyacak 🤍
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

            <AnimatePresence>
              {sealed && (
                <motion.div
                  className="mt-4 py-3 px-4 rounded-2xl text-center text-white font-nunito font-bold text-sm"
                  style={{ background: 'rgba(52,211,153,0.25)', border: '1px solid rgba(52,211,153,0.35)' }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  📩 Mektup mühürlendi! Bir yıl sonra aç! 🎉
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
