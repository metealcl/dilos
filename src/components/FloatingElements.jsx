import { motion } from 'framer-motion'

const ITEMS = [
  { emoji: '🎈', left: '4%',  dur: 9,  delay: 0,   size: '2.4rem' },
  { emoji: '🎀', left: '12%', dur: 8,  delay: 1.2, size: '2rem'   },
  { emoji: '⭐', left: '22%', dur: 11, delay: 0.4, size: '2.6rem' },
  { emoji: '🎁', left: '33%', dur: 9,  delay: 2.5, size: '2.2rem' },
  { emoji: '🌸', left: '45%', dur: 10, delay: 0.8, size: '2rem'   },
  { emoji: '💖', left: '55%', dur: 8,  delay: 1.8, size: '2.4rem' },
  { emoji: '🎊', left: '66%', dur: 9,  delay: 0.2, size: '2rem'   },
  { emoji: '✨', left: '76%', dur: 7,  delay: 1.5, size: '2.2rem' },
  { emoji: '🦋', left: '85%', dur: 12, delay: 0.6, size: '2.4rem' },
  { emoji: '🌟', left: '93%', dur: 10, delay: 2,   size: '2rem'   },
  { emoji: '🎆', left: '8%',  dur: 14, delay: 3,   size: '2.8rem' },
  { emoji: '💫', left: '50%', dur: 13, delay: 3.5, size: '2rem'   },
  { emoji: '🎉', left: '38%', dur: 11, delay: 4,   size: '2.2rem' },
]

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {ITEMS.map((item, i) => (
        <motion.div
          key={i}
          className="absolute select-none"
          style={{ left: item.left, top: '110%', fontSize: item.size }}
          animate={{
            y: [0, -(window.innerHeight * 1.35)],
            x: [0, 18, -14, 22, -10, 6, 0],
            rotate: [0, 12, -8, 10, -5, 3, 0],
            opacity: [0, 0.85, 0.85, 0.85, 0.85, 0.4, 0],
          }}
          transition={{
            duration: item.dur,
            delay: item.delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.08, 0.3, 0.55, 0.8, 0.95, 1],
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  )
}
