import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PLACEHOLDER_WISHES = [
  { name: 'Ayşe', msg: 'İyi ki doğdun can! 🌸', emoji: '🌸' },
  { name: 'Zeynep', msg: 'Nice yıllara Diloş! 🎂', emoji: '🎂' },
  { name: 'Meryem', msg: 'Hep mutlu ol! 💖', emoji: '💖' },
]

export default function WishForm() {
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  const [wishes, setWishes] = useState(PLACEHOLDER_WISHES)
  const [submitted, setSubmitted] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim() || !msg.trim()) return
    const emojis = ['🌷','⭐','🎉','💗','✨','🎊','🌟','🦋']
    setWishes((prev) => [
      { name: name.trim(), msg: msg.trim(), emoji: emojis[Math.floor(Math.random() * emojis.length)] },
      ...prev,
    ])
    setName('')
    setMsg('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2500)
  }

  return (
    <section className="relative z-10 px-4 pb-10 max-w-2xl mx-auto">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <h2
          className="font-playfair font-bold text-white"
          style={{ fontSize: 'clamp(1.8rem,5vw,2.8rem)', textShadow: '0 4px 20px rgba(0,0,0,0.12)' }}
        >
          Dilek Bırak 💌
        </h2>
        <p className="text-white/55 font-nunito text-sm mt-1">Diloş'a bir mesaj yaz!</p>
      </motion.div>

      {/* Form */}
      <motion.div
        className="rounded-3xl p-6 mb-6"
        style={{
          background: 'linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0.08))',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.28)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.35)',
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, type: 'spring', delay: 0.1 }}
      >
        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Adın 👤"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            className="w-full px-4 py-3 rounded-2xl text-sm font-nunito font-bold outline-none"
            style={{
              background: 'rgba(255,255,255,0.18)',
              border: '1.5px solid rgba(255,255,255,0.3)',
              color: 'white',
              caretColor: 'white',
            }}
          />
          <textarea
            placeholder="Diloş'a ne söylemek istersin? 💬"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            maxLength={120}
            rows={3}
            className="w-full px-4 py-3 rounded-2xl text-sm font-nunito font-bold outline-none resize-none"
            style={{
              background: 'rgba(255,255,255,0.18)',
              border: '1.5px solid rgba(255,255,255,0.3)',
              color: 'white',
              caretColor: 'white',
            }}
          />
          <motion.button
            type="submit"
            className="py-3 rounded-2xl text-white font-nunito font-black text-base tracking-wide relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #f43f7e, #f97316)',
              boxShadow: '0 8px 24px rgba(244,63,126,0.4)',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s linear infinite',
              }}
            />
            <span className="relative">Gönder 💌</span>
          </motion.button>
        </form>

        <AnimatePresence>
          {submitted && (
            <motion.div
              className="mt-4 py-3 px-4 rounded-2xl text-center text-white font-nunito font-bold text-sm"
              style={{ background: 'rgba(52,211,153,0.3)', border: '1px solid rgba(52,211,153,0.4)' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              ✅ Dilek gönderildi! Diloş çok mutlu olacak! 🎉
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Wish list */}
      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {wishes.map((wish, i) => (
            <motion.div
              key={`${wish.name}-${i}`}
              className="flex items-start gap-3 px-5 py-4 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.07))',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.22)',
              }}
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 150 }}
            >
              <span className="text-2xl flex-shrink-0 mt-0.5">{wish.emoji}</span>
              <div>
                <p className="text-white font-nunito font-black text-sm">{wish.name}</p>
                <p className="text-white/70 font-nunito text-sm mt-0.5">{wish.msg}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
