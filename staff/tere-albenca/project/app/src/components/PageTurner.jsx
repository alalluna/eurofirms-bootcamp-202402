import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from './HeroSection'
import HomeSection from './HomeSection'

const PageTurner = () => {
  const [showHero, setShowHero] = useState(true)

  const handlePageTurn = () => setShowHero((prev) => !prev)

  return (
  <div className='relative w-full min-h-[calc(100vh-55px)] perspective'>
      <AnimatePresence mode='wait'>
        {showHero ? (
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
        ) : (
          <motion.div
            key='homesection'
            className='absolute inset-0 rotate-back'
            initial={{ rotateY: 180 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 180 }}
            transition={{ duration: 1, ease: 'easeInOut'}}
          >
            <HomeSection onTurnPage={handlePageTurn} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PageTurner
