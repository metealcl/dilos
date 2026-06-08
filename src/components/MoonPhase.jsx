import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function MoonPhase() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section className="relative z-10 px-4 py-16 max-w-4xl mx-auto">
      <div
        ref={ref}
        className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 rounded-[2rem] gap-10"
        style={{
          background: 'linear-gradient(135deg, rgba(10,12,16,0.8), rgba(5,2,10,0.6))',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white/40 font-nunito text-xs tracking-[0.4em] uppercase mb-3 block">09 Haziran 2003</span>
            <h2 className="font-playfair font-bold text-white text-3xl md:text-4xl mb-4">
              Gökyüzünün Şahidi 🌔
            </h2>
            <p className="text-white/60 font-nunito leading-relaxed text-sm md:text-base">
              Senin dünyaya gözlerini açtığın o ilk gecede, Ay gökyüzünde tam olarak bu evredeydi (İlk Dördün). O geceki ışığı şimdi senin yolunu aydınlatmaya devam ediyor...
            </p>
          </motion.div>
        </div>

        {/* Visual Content (CSS Moon) */}
        <motion.div
          className="relative flex items-center justify-center w-40 h-40 shrink-0"
          initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3, type: 'spring' }}
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-slate-100 blur-2xl opacity-20" />
          
          {/* Moon Body */}
          <div className="relative w-32 h-32 rounded-full bg-[#1a1c23] shadow-[inset_-10px_0_20px_rgba(255,255,255,0.1)] overflow-hidden border border-white/5">
            {/* The illuminated part (First Quarter / Waxing Gibbous) */}
            <div 
              className="absolute top-0 right-0 bottom-0 w-[58%] bg-slate-200 rounded-l-[100%] shadow-[0_0_30px_rgba(255,255,255,0.5)]"
              style={{
                boxShadow: 'inset 20px 0 30px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.2)'
              }}
            >
              {/* Moon craters texture (subtle) */}
              <div className="absolute top-6 left-4 w-4 h-4 rounded-full bg-black/10 blur-[1px]" />
              <div className="absolute top-16 left-8 w-6 h-6 rounded-full bg-black/5 blur-[2px]" />
              <div className="absolute bottom-8 left-6 w-3 h-3 rounded-full bg-black/10 blur-[1px]" />
            </div>
          </div>
          
          {/* Orbiting tiny star */}
          <motion.div
            className="absolute top-0 left-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]"
            style={{ originY: '80px' }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
