import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ZodiacProfile() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  const traits = [
    { label: 'Zeka', value: 98 },
    { label: 'Merak', value: 100 },
    { label: 'Cazibe', value: 95 },
    { label: 'Özgürlük', value: 90 },
  ]

  return (
    <section className="relative z-10 px-4 py-16 max-w-5xl mx-auto">
      <div
        ref={ref}
        className="flex flex-col md:flex-row gap-8 items-center p-8 md:p-12 rounded-[2rem]"
        style={{
          background: 'linear-gradient(135deg, rgba(15,10,20,0.8), rgba(5,2,10,0.6))',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(251,191,36,0.15)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        {/* Left Side: Astrological Info */}
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-amber-500 font-serif text-2xl">♊</span>
              <span className="text-amber-500/60 font-nunito tracking-[0.3em] text-xs uppercase font-bold">
                Astrolojik Profil
              </span>
            </div>
            <h2 className="text-white font-playfair font-bold text-4xl md:text-5xl leading-tight">
              İkizler Ruhu
            </h2>
          </motion.div>

          <motion.p
            className="text-white/70 font-nunito leading-relaxed text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hava elementinin en zarif temsilcisi. Hem derin bir zekaya hem de etrafına ışık saçan bir enerjiye sahipsin. İletişim yeteneğin, zerafetin ve bitmek bilmeyen merakınla her ortamda fark ediliyorsun.
          </motion.p>

          <div className="space-y-4 pt-4">
            {traits.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              >
                <div className="flex justify-between text-xs font-nunito font-bold mb-1.5">
                  <span className="text-white/80">{t.label}</span>
                  <span className="text-amber-500">%{t.value}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-300 rounded-full"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${t.value}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.6 + i * 0.1, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Symbol / Visual */}
        <motion.div
          className="flex-1 flex justify-center items-center relative w-full h-[300px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* Glowing orbital rings */}
          <motion.div
            className="absolute inset-0 m-auto w-64 h-64 rounded-full border border-amber-500/20"
            style={{ boxShadow: 'inset 0 0 40px rgba(251,191,36,0.05)' }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-0 m-auto w-48 h-48 rounded-full border border-amber-500/30"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
          />
          
          <div className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-gradient-to-br from-amber-500/20 to-transparent blur-xl" />
          
          {/* Main icon */}
          <motion.div
            className="relative z-10 text-[100px] text-amber-100"
            style={{ textShadow: '0 0 40px rgba(251,191,36,0.5)' }}
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            ♊
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
