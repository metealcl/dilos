import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Tilt + scroll-reveal wrapper ── */
function TiltCard({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setTilt({
      x: ((e.clientX - r.left) / r.width  - 0.5) * 20,
      y: ((e.clientY - r.top)  / r.height - 0.5) * -20,
    })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.88 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.75, type: 'spring', stiffness: 90, damping: 14 }}
      style={{
        transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.18s ease-out',
        willChange: 'transform',
      }}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="h-full rounded-3xl"
    >
      {children}
    </motion.div>
  )
}

function Glass({ children, gradient, className = '' }) {
  return (
    <div
      className={`w-full h-full rounded-3xl p-6 md:p-7 ${className}`}
      style={{
        background: gradient || 'linear-gradient(135deg,rgba(0,0,0,0.6),rgba(0,0,0,0.3))',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
      }}
    >
      {children}
    </div>
  )
}

/* ── CARD 1: Enerji barları ── */
function EnergyCard() {
  const bars = [
    { label: 'Mutluluk', color: '#f43f7e', emoji: '💗' },
    { label: 'Güzellik', color: '#f97316', emoji: '✨' },
    { label: 'Enerji',   color: '#10b981', emoji: '⚡' },
    { label: 'Vibe',     color: '#fbbf24', emoji: '🔥' },
  ]

  return (
    <Glass gradient="linear-gradient(135deg,rgba(60,25,10,0.7),rgba(20,5,5,0.5))">
      <div className="flex flex-col h-full gap-5">
        <div className="flex items-center gap-3">
          <motion.span className="text-4xl" animate={{ rotate:[0,15,-10,8,0] }} transition={{ repeat:Infinity,duration:2.5 }}>⚡</motion.span>
          <div>
            <h3 className="text-white font-nunito font-black text-xl leading-tight">Yeni Yaş Enerjisi</h3>
            <p className="text-white/55 text-xs font-nunito mt-0.5">22. yaş raporu 📊</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          {bars.map(({ label, color, emoji }) => (
            <div key={label}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-white/80 font-nunito font-bold text-sm">{emoji} {label}</span>
                <motion.span className="font-nunito font-black text-white text-sm" initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:0.8}}>
                  ∞
                </motion.span>
              </div>
              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background:`linear-gradient(90deg,${color},${color}bb)`, boxShadow:`0 0 12px ${color}88` }}
                  initial={{width:0}} whileInView={{width:'100%'}} viewport={{once:true}}
                  transition={{duration:1.6,ease:'easeOut',delay:0.4}}
                >
                  <div className="absolute inset-0 rounded-full" style={{ background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)', backgroundSize:'200% 100%', animation:'shimmer 1.8s linear infinite' }}/>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-white/30 text-xs font-nunito text-center">* Grafikler gerçek verilere dayanmaktadır. 💅</p>
      </div>
    </Glass>
  )
}

/* ── CARD 2: Flip mesaj ── */
function MessageCard() {
  const [flipped, setFlipped] = useState(false)
  return (
    <div className="w-full h-full cursor-pointer" style={{perspective:'1000px'}} onClick={() => setFlipped(f=>!f)}>
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{rotateY: flipped ? 180 : 0}}
        transition={{duration:0.75,type:'spring',stiffness:90,damping:14}}
      >
        <div className="absolute inset-0 backface-hidden rounded-3xl">
          <Glass gradient="linear-gradient(135deg,rgba(60,10,35,0.7),rgba(20,5,10,0.5))">
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
              <motion.div className="text-6xl" animate={{rotate:[0,12,-12,0],scale:[1,1.12,1]}} transition={{repeat:Infinity,duration:2.2}}>💌</motion.div>
              <h3 className="text-white font-nunito font-black text-xl">Özel Mesaj</h3>
              <p className="text-white/55 text-sm font-nunito">Kartı çevir! 🔄</p>
              <motion.p className="text-white/30 text-xs font-nunito" animate={{x:[0,6,0]}} transition={{repeat:Infinity,duration:1.4}}>👆 Tıkla</motion.p>
            </div>
          </Glass>
        </div>
        <div className="absolute inset-0 backface-hidden rounded-3xl" style={{transform:'rotateY(180deg)'}}>
          <Glass gradient="linear-gradient(135deg,rgba(50,20,40,0.7),rgba(20,5,15,0.5))">
            <div className="flex flex-col justify-center h-full gap-4">
              <span className="text-3xl">✨</span>
              <p className="text-white font-nunito font-bold text-base leading-relaxed">
                Bazen en güzel anlar, hiç planlanmayan anlardır. Yeni yaşında yüzündeki o tatlı tebessüm hiç kaybolmasın. Belki de bu yaş, unutulmaz anıların başlangıcıdır... ✨
              </p>
              <p className="text-white/45 text-sm font-nunito italic">— Senin için ✦</p>
            </div>
          </Glass>
        </div>
      </motion.div>
    </div>
  )
}

/* ── CARD 3: YouTube Müzik Kartı ── */
function MusicCard() {
  return (
    <Glass gradient="linear-gradient(135deg,rgba(5,20,10,0.8),rgba(0,10,5,0.6))">
      <div className="flex flex-col gap-4 h-full">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🎧</span>
          <span className="text-[#1DB954] font-nunito font-black text-sm tracking-wide">Spotify'da Dinle</span>
          <span className="ml-auto text-white/30 text-xs font-nunito">Diloş'a özel ✦</span>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <iframe 
            style={{ borderRadius: '12px' }} 
            src="https://open.spotify.com/embed/track/0ZJKPGKFJQM9riXJ8TOyiO?utm_source=generator&theme=0" 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allowFullScreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          />
        </div>
        
        <p className="text-center text-white/40 text-xs font-nunito italic mt-2">
          "O ikonik ritim başlasın..."
        </p>
      </div>
    </Glass>
  )
}

/* ── EXPORT ── */
export default function Phase4() {
  return (
    <section className="relative z-10 px-4 py-20 max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, type: 'spring' }}
      >
        <p className="text-white/60 font-nunito font-bold tracking-widest text-sm uppercase mb-2">
          ✦ &nbsp; Sürpriz Bölüm &nbsp; ✦
        </p>
        <h2
          className="font-playfair font-bold text-white"
          style={{ fontSize: 'clamp(2rem,6vw,3.2rem)', textShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
        >
          Sana Özel 🎁
        </h2>
        <p className="text-white/50 mt-2 font-nunito text-sm">
          Hover yap, tıkla, keşfet!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <TiltCard delay={0.1}><div className="h-[380px] md:h-[420px]"><EnergyCard /></div></TiltCard>
        <TiltCard delay={0.25}><div className="h-[380px] md:h-[420px]"><MessageCard /></div></TiltCard>
        <TiltCard delay={0.4}><div className="h-[380px] md:h-[420px]"><MusicCard /></div></TiltCard>
      </div>
    </section>
  )
}
