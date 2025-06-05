import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from './HeroSection'
import HomeSection from './HomeSection'

const PageTurner = () => {
    const [showHero, setShowHero] = useState(true)
  const [showHome, setShowHome] = useState(false)

const handlePageTurn = () => {
    setShowHero(false)
    // esperar el tiempo exacto de la animación antes de mostrar el home
    setTimeout(() => setShowHome(true), 1000) // 1 segundo = duración de la animación
  }

 return (
    <div className='relative w-full min-h-[calc(100vh-55px)] perspective'>
      <AnimatePresence mode='wait'>
        {showHero && (
          <motion.div
            key='herosection'
            className='absolute inset-0'
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: -180 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <HeroSection onTurnPage={handlePageTurn} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* No usar motion.div para HomeSection */}
      {showHome && (
        <div className='absolute inset-0'>
          <HomeSection />
        </div>
      )}
    </div>
  )
}

export default PageTurner
