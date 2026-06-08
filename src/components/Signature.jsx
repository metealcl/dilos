import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Signature() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  const text = "Daima seninle..."

  return (
    <div ref={ref} className="w-full flex flex-col items-center justify-center py-24 pb-40 relative z-10">
      <div className="flex overflow-hidden">
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            className="font-playfair italic text-3xl md:text-5xl text-amber-500"
            style={{ 
              textShadow: '0 0 20px rgba(251,191,36,0.4)',
              marginRight: char === ' ' ? '0.5em' : '0'
            }}
            initial={{ opacity: 0, y: 20, rotate: -10 }}
            animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.5 + index * 0.1,
              type: "spring",
              stiffness: 100
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
      
      {/* Animated underline */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mt-6"
        initial={{ width: 0, opacity: 0 }}
        animate={inView ? { width: '200px', opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
      />
    </div>
  )
}
