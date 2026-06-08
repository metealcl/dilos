import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function MemoryGallery() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  // Maps vertical scroll to horizontal scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"])

  const memories = [
    { id: 1, title: 'Birlikte İlk Adım', subtitle: 'Geleceğin başlangıcı...', color: 'from-[#2a1b14] to-[#0a0508]', emoji: '🌟' },
    { id: 2, title: 'Plansız Maceralar', subtitle: 'Rüzgara kapıldığımız anlar', color: 'from-[#1f1015] to-[#0a0508]', emoji: '🍷' },
    { id: 3, title: 'Uzun Geceler', subtitle: 'Saatlerce süren sohbetler', color: 'from-[#121820] to-[#0a0508]', emoji: '🌌' },
    { id: 4, title: 'Sonsuz Kahkahalar', subtitle: 'Sadece bizim anladığımız espriler', color: 'from-[#1a1410] to-[#0a0508]', emoji: '✨' },
    { id: 5, title: 'Yeni Yaşın', subtitle: 'Daha yazılacak çok hikaye var', color: 'from-[#201015] to-[#0a0508]', emoji: '🤍' },
  ]

  return (
    <section ref={targetRef} className="relative h-[250vh] bg-[#050203]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Title */}
        <div className="absolute top-20 md:top-32 left-6 md:left-24 z-20">
          <motion.h2 
            className="font-playfair font-bold text-white text-4xl md:text-5xl" 
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Anı Galerisi 🎞️
          </motion.h2>
          <motion.p 
            className="text-amber-500/60 font-nunito text-sm mt-3 uppercase tracking-widest"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Henüz çekilmemiş fotoğraflar...
          </motion.p>
        </div>

        {/* Scrolling Track */}
        <motion.div style={{ x }} className="flex gap-6 md:gap-10 px-6 md:px-24 mt-20">
          {memories.map((m) => (
            <div
              key={m.id}
              className="relative w-[280px] h-[380px] md:w-[350px] md:h-[480px] rounded-[2rem] shrink-0 flex flex-col justify-end p-8 overflow-hidden group"
              style={{
                border: '1px solid rgba(251,191,36,0.15)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              }}
            >
              {/* Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${m.color}`} />
              
              {/* Photo placeholder / empty frame border */}
              <div className="absolute top-8 left-8 right-8 bottom-32 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm flex items-center justify-center transition-all duration-500 group-hover:bg-white/10">
                <span className="text-white/20 font-nunito text-xs tracking-widest uppercase">Fotoğraf Alanı</span>
              </div>
              
              {/* Text */}
              <div className="relative z-10 mt-auto">
                <span className="text-3xl mb-3 block">{m.emoji}</span>
                <h3 className="text-white font-playfair font-bold text-xl md:text-2xl mb-1">{m.title}</h3>
                <p className="text-white/50 font-nunito text-xs md:text-sm">{m.subtitle}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator overlay */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-40">
          <span className="text-white font-nunito text-xs tracking-widest uppercase">Kaydır</span>
          <span className="animate-bounce">👉</span>
        </div>
      </div>
    </section>
  )
}
