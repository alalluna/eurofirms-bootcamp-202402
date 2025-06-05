import React from 'react'

function Links({ href, imgSrc, alt }) {
  return (
    <a 
      href={href} 
      target='_blank' 
      rel='noopener noreferrer'
    >
      <img 
        src={imgSrc} 
        alt={alt} 
        className=' w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 transition-transform duration-300 ease-in-out hover:scale-110' 
      />
    </a>
  )
}

export default Links
