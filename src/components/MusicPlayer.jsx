import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TRACK = 'https://assets.mixkit.co/music/preview/mixkit-feeling-happy-5.mp3'

export default function MusicPlayer() {
  const [playing, setPlaying]     = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [progress, setProgress]   = useState(0)
  const [volume, setVolume]       = useState(0.5)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(TRACK)
    audio.loop   = true
    audio.volume = volume
    audioRef.current = audio

    audio.addEventListener('timeupdate', () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100)
    })

    return () => { audio.pause(); audio.src = '' }
  }, []) // eslint-disable-line

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) { a.pause() } else { a.play().catch(() => {}) }
    setPlaying((p) => !p)
  }

  const changeVolume = (v) => {
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v
  }

  const seekTo = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - r.left) / r.width
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = ratio * audioRef.current.duration
    }
  }

  return (
    <motion.div
      className="fixed bottom-5 right-5 z-[1000]"
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 90, damping: 14 }}
    >
      <AnimatePresence mode="wait">
        {collapsed ? (
          /* ── Mini pill ── */
          <motion.button
            key="mini"
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-2xl"
            style={{
              background: 'linear-gradient(135deg,#f472b6,#a78bfa)',
              boxShadow: '0 8px 28px rgba(244,114,182,0.5)',
            }}
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 20 }}
            transition={{ type: 'spring', stiffness: 200 }}
            onClick={() => setCollapsed(false)}
          >
            🎵
          </motion.button>
        ) : (
          /* ── Expanded player ── */
          <motion.div
            key="full"
            className="rounded-3xl overflow-hidden w-72 shadow-2xl"
            style={{
              background: 'linear-gradient(145deg,rgba(12,8,28,0.92),rgba(22,12,44,0.95))',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(244,114,182,0.25)',
              boxShadow:
                '0 30px 80px rgba(0,0,0,0.45), 0 0 40px rgba(167,139,250,0.08), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 180, damping: 16 }}
          >
            {/* Header bar */}
            <div
              className="flex items-center justify-between px-5 pt-4 pb-2"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🎧</span>
                <span className="text-white/60 text-xs font-nunito font-bold tracking-widest uppercase">
                  Now Playing
                </span>
              </div>
              <button
                onClick={() => setCollapsed(true)}
                className="text-white/30 hover:text-white/70 transition-colors text-sm leading-none"
              >
                ✕
              </button>
            </div>

            <div className="px-5 py-4 flex flex-col gap-4">
              {/* Album art + info */}
              <div className="flex items-center gap-3">
                <motion.div
                  className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-lg"
                  style={{ background: 'linear-gradient(135deg,#f472b6,#a78bfa,#818cf8)' }}
                  animate={playing ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-2xl">🎵</div>
                  {playing && (
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center gap-0.5">
                      {[0, 0.1, 0.2].map((d) => (
                        <motion.div
                          key={d}
                          className="w-1 bg-white rounded-full"
                          animate={{ height: ['25%', '80%', '45%', '90%', '25%'] }}
                          transition={{ repeat: Infinity, duration: 0.7, delay: d }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-nunito font-black text-sm truncate">
                    Birthday Vibes ✨
                  </p>
                  <p className="text-white/50 font-nunito text-xs truncate mt-0.5">
                    Celebration Mix · Diloş Edition
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div
                  className="w-full h-1.5 rounded-full bg-white/10 cursor-pointer overflow-hidden"
                  onClick={seekTo}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg,#f472b6,#a78bfa)',
                      transition: 'width 0.5s linear',
                    }}
                  />
                </div>
                <div className="flex justify-between text-white/30 text-xs font-nunito mt-1">
                  <span>
                    {Math.floor((progress / 100) * 180 / 60)}:
                    {String(Math.floor(((progress / 100) * 180) % 60)).padStart(2, '0')}
                  </span>
                  <span>3:00</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-5">
                <button className="text-white/35 hover:text-white/70 transition-colors text-lg">⏮</button>
                <motion.button
                  onClick={toggle}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white shadow-lg text-base"
                  style={{
                    background: 'linear-gradient(135deg,#f472b6,#a78bfa)',
                    boxShadow: '0 6px 20px rgba(244,114,182,0.45)',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {playing ? '⏸' : '▶'}
                </motion.button>
                <button className="text-white/35 hover:text-white/70 transition-colors text-lg">⏭</button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2">
                <span className="text-white/35 text-sm">🔈</span>
                <input
                  type="range" min="0" max="1" step="0.05"
                  value={volume}
                  onChange={(e) => changeVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1 rounded-full appearance-none"
                  style={{
                    background: `linear-gradient(to right, #f472b6 ${volume * 100}%, rgba(255,255,255,0.12) ${volume * 100}%)`,
                  }}
                />
                <span className="text-white/35 text-sm">🔊</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
