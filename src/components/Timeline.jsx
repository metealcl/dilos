import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const FEATURES = [
  { num: '01', title: 'O Beklenmedik Gülüşün', desc: 'Bazen en sıradan anları bile bir anda aydınlatan, insanın aklına kazınan o ince tebessüm...', icon: '✧' },
  { num: '02', title: 'Kelimelerdeki Zarafetin', desc: 'Sustuğunda bile çok şey anlatan, konuştuğunda ise en karmaşık düşünceleri bile sadeleştiren o tatlı zekan.', icon: '✦' },
  { num: '03', title: 'Kendine Has Havan', desc: 'Girdiğin her ortama saniyeler içinde kendi enerjini, o farklı ve gizemli imzanı bırakabilmen.', icon: '✧' },
  { num: '04', title: 'Tutkulu İnadın', desc: 'Kafana koyduğunu yaparkenki o kararlılığın... Hem biraz tatlı bir inat hem de gizli bir ilham kaynağı.', icon: '✦' },
  { num: '05', title: 'Sadece Sen Olman', desc: 'Hiçbir kalıba sığmayan, tamamen kendine özgü, hayatın içine özenle bırakılmış çok güzel bir detay olman.', icon: '✧' },
]

export default function Timeline() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 50%'],
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={containerRef} className="relative z-10 px-4 py-24 max-w-4xl mx-auto">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <p className="text-amber-500/60 font-nunito text-xs mt-3 uppercase tracking-[0.4em] mb-4">Gözlem Raporu</p>
        <h2 className="font-playfair font-bold text-white text-4xl md:text-5xl" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          Seni Sen Yapan Detaylar ✦
        </h2>
      </motion.div>

      <div className="relative">
        {/* Background Line */}
        <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
        
        {/* Animated Line Fill */}
        <motion.div
          className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 origin-top"
          style={{
            background: 'linear-gradient(to bottom, transparent, #fbbf24, #d97706, transparent)',
            scaleY: pathLength,
            boxShadow: '0 0 15px rgba(251,191,36,0.5)',
          }}
        />

        {/* Features List */}
        <div className="flex flex-col gap-16 md:gap-24">
          {FEATURES.map((feat, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={i}
                className={`relative flex items-center ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.1 }}
              >
                {/* Center Node */}
                <div className="absolute left-[28px] md:left-1/2 w-8 h-8 rounded-full bg-[#0a0508] border border-amber-500/30 flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
                  <span className="text-amber-500/80 text-xs">{feat.icon}</span>
                </div>
                
                {/* Mobile spacer */}
                <div className="w-[70px] md:hidden flex-shrink-0" />
                
                {/* Content Card */}
                <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                  <div
                    className="relative group p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2"
                    style={{
                      background: 'linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(251,191,36,0.1)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                    }}
                  >
                    {/* Background glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                    
                    <span className="block text-amber-500/20 font-serif font-black text-6xl absolute -top-6 -z-10 group-hover:text-amber-500/30 transition-colors" style={isLeft ? { right: '1rem' } : { left: '1rem' }}>
                      {feat.num}
                    </span>
                    
                    <h3 className="font-playfair font-bold text-white text-xl md:text-2xl mb-3 text-amber-50">
                      {feat.title}
                    </h3>
                    <p className="text-white/55 font-nunito text-sm md:text-base leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
