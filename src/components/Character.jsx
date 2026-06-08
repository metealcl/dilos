import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const MSG =
  'Dünyaya gelişin belki sıradan bir 9 Haziran günüydü ama seninle tanışmak çok güzel bir tesadüftü... İyi ki doğdun. O tatlı gülüşün, bu yeni yaşında da her şeyi güzelleştirmeye devam etsin. Kim bilir, belki de en güzel hikayeler henüz yazılmamıştır... ✦'

function useTypewriter(text, speed = 35, startDelay = 0) {
  const [shown, setShown] = useState('')

  useEffect(() => {
    let i = 0
    let iv
    const to = setTimeout(() => {
      iv = setInterval(() => {
        i++
        setShown(text.slice(0, i))
        if (i >= text.length) clearInterval(iv)
      }, speed)
    }, startDelay)
    return () => { clearTimeout(to); clearInterval(iv) }
  }, [text, speed, startDelay])

  return shown
}

export default function ElegantMessage() {
  const shown = useTypewriter(MSG, 40, 500)

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 mt-8">
      <motion.div
        className="relative p-8 md:p-12 rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,215,0,0.03), rgba(255,215,0,0.01))',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,215,0,0.15)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        {/* Subtle glow behind text */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.05),transparent_60%)] pointer-events-none" />

        <div className="text-5xl text-amber-500/20 font-serif absolute top-4 left-6 leading-none">"</div>
        
        <div className="relative z-10 text-center py-4 px-2">
          <p className="font-playfair italic text-white/90 text-xl md:text-2xl leading-relaxed tracking-wide">
            {shown}
            {shown.length < MSG.length && (
              <span className="inline-block w-1 h-6 ml-2 align-middle bg-amber-400/60 animate-pulse" />
            )}
          </p>
        </div>

        <div className="text-5xl text-amber-500/20 font-serif absolute bottom-0 right-8 leading-none">"</div>

        {/* Elegant bottom divider */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      </motion.div>
    </div>
  )
}
