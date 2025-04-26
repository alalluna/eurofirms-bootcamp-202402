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
        className='max-h-[38px] w-auto transition-transform duration-300 ease-in-out hover:scale-110' 
      />
    </a>
  )
}

export default Links
