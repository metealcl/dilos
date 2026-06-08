import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Diloş'un doğum tarihini buraya yaz (yıl, ay-1, gün)
const BIRTH_DATE = new Date(2003, 5, 9) // 09 Haziran 2003

function getAge(birthDate) {
  const now = new Date()
  let age = now.getFullYear() - birthDate.getFullYear()
  const hasBirthdayPassedThisYear =
    now.getMonth() > birthDate.getMonth() ||
    (now.getMonth() === birthDate.getMonth() && now.getDate() >= birthDate.getDate())
  if (!hasBirthdayPassedThisYear) age--
  return age
}

export default function AgeCounter() {
  const age = getAge(BIRTH_DATE)
  const [displayed, setDisplayed] = useState(0)

  // Sayaç animasyonu: 0 → age
  useEffect(() => {
    let start = 0
    const step = Math.ceil(age / 40)
    const iv = setInterval(() => {
      start = Math.min(start + step, age)
      setDisplayed(start)
      if (start >= age) clearInterval(iv)
    }, 40)
    return () => clearInterval(iv)
  }, [age])

  return (
    <motion.div
      className="flex items-center gap-3 px-6 py-3 rounded-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.08))',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.3)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 150 }}
    >
      <motion.span
        className="text-amber-500/50 text-xl"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 3, delay: 1 }}
      >
        ✦
      </motion.span>
      <div className="text-center px-4 border-x border-white/10">
        <div className="flex items-baseline justify-center gap-1.5">
          <motion.span
            className="font-playfair font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', lineHeight: 1 }}
          >
            {displayed}
          </motion.span>
          <span className="text-white/60 font-playfair italic text-lg">yaşında</span>
        </div>
        <p className="text-amber-500/60 font-nunito text-[10px] font-bold tracking-[0.3em] mt-1 uppercase">
          Efsanenin Yeni Yılı
        </p>
      </div>
      <motion.span
        className="text-amber-500/50 text-xl"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
      >
        ✦
      </motion.span>
    </motion.div>
  )
}
