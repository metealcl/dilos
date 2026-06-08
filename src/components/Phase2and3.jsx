import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import GoldenParticles from './GoldenParticles'
import Character from './Character'
import Phase4 from './Phase4'
import FutureLetter from './FutureLetter'
import AgeCounter from './AgeCounter'
import FireworkButton from './FireworkButton'
import ToastAnimation from './ToastAnimation'
import Timeline from './Timeline'
import StarMap from './StarMap'
import MoonPhase from './MoonPhase'
import ZodiacProfile from './ZodiacProfile'
import SecretVault from './SecretVault'
import Signature from './Signature'

export default function Phase2and3() {
  useEffect(() => {
    const C = ['#fbbf24','#f43f7e','#f97316','#a78bfa','#34d399','#60a5fa','#fb923c','#fff']
    const fire = (opts) => confetti({ colors: C, ticks: 380, ...opts })

    fire({ particleCount: 200, spread: 115, origin: { x: .5, y: .42 }, scalar: 1.45 })
    setTimeout(() => {
      fire({ particleCount: 110, angle: 55,  spread: 85, origin: { x: 0, y: .62 } })
      fire({ particleCount: 110, angle: 125, spread: 85, origin: { x: 1, y: .62 } })
    }, 320)
    setTimeout(() => fire({ particleCount: 190, spread: 145, origin: { x: .5, y: .18 }, scalar: 1.2 }), 680)

    const fw = () => fire({
      particleCount: 45, startVelocity: 52, spread: 360,
      origin: { x: Math.random(), y: Math.random() * .6 }, scalar: 0.9,
    })
    ;[1100, 1500, 1900, 2350, 2800, 3300, 4000].forEach((t) => setTimeout(fw, t))
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050203]">
      {/* Luxury dark background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, #1a0f14 0%, #0a0508 50%, #050203 100%)',
        }}
      />

      <GoldenParticles />

      {/* Hero section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pb-24">

        {/* Age counter at top */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <AgeCounter />
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.1, type: 'spring', stiffness: 55 }}
        >
          <motion.p
            className="text-white/75 font-nunito font-bold tracking-[0.4em] text-sm md:text-base mb-3 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1.4 }}
          >
            ✦ &nbsp; Çok Özel Bir Gün &nbsp; ✦
          </motion.p>
          <h1
            className="font-playfair font-bold text-white leading-tight"
            style={{
              fontSize: 'clamp(2.6rem, 9vw, 5.8rem)',
              textShadow: '0 4px 32px rgba(0,0,0,0.15), 0 0 60px rgba(255,255,255,0.2)',
            }}
          >
            İyi ki Doğdun
          </h1>
          <motion.h2
            className="font-playfair italic font-bold text-white"
            style={{
              fontSize: 'clamp(3rem, 11vw, 7rem)',
              textShadow: '0 4px 32px rgba(0,0,0,0.18), 0 0 80px rgba(255,255,255,0.25)',
            }}
            animate={{
              textShadow: [
                '0 4px 32px rgba(0,0,0,0.18), 0 0 40px rgba(255,255,255,0.18)',
                '0 4px 32px rgba(0,0,0,0.18), 0 0 90px rgba(255,255,255,0.5)',
                '0 4px 32px rgba(0,0,0,0.18), 0 0 40px rgba(255,255,255,0.18)',
              ],
            }}
            transition={{ repeat: Infinity, duration: 2.8 }}
          >
            Diloş! 🤍
          </motion.h2>
        </motion.div>

        <Character />

        {/* Kadeh kaldırma animasyonu */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <ToastAnimation />
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/65 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
        >
          <span className="text-xs font-nunito font-bold tracking-widest uppercase">
            Scroll for more magic ✨
          </span>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.8, 0.3, 0.8] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Astrolojik Profil */}
      <ZodiacProfile />

      {/* Zaman Çizelgesi */}
      <Timeline />

      {/* Phase 4 cards (Müzik vb) */}
      <Phase4 />

      {/* Mini Şifre Kutusu */}
      <SecretVault />

      {/* Ay Evresi */}
      <MoonPhase />

      {/* Yıldız Haritası */}
      <StarMap />

      {/* Geleceğe mektup */}
      <FutureLetter />

      {/* Footer */}
      <div className="relative z-10 text-center pb-10 text-white/40 text-xs font-nunito font-bold tracking-wider">
        Made with 💖 just for Diloş
      </div>

      {/* Kapanış İmzası */}
      <Signature />

      {/* Floating firework button */}
      <FireworkButton />
    </div>
  )
}
