import { useState } from 'react'
import galleryImages from '../logic/gallery'

const GalerySection = () => {
    const [index, setIndex] = useState(0)
    const image = galleryImages[index]

    const next = () => {
        setIndex((index + 1) % galleryImages.length)
    }

    const prev = () => {
        setIndex((index - 1 + galleryImages.length) % galleryImages.length)
    }

    return (

        <section className='w-full md:w-1/2 max-h-[calc(100vh-95px)] flex flex-col justify-center items-center p-2 rounded-xl shadow-lg overflow-hidden'>
         
            <div className='relative w-full h-auto  flex-1 overflow-hidden rounded-xl bg-white shadow-md flex flex-col'>
                <img
                    src={image.src}
                    alt={image.caption}
                    className='object-cover transition-opacity duration-500 ease-in-out'
                />
                <div className='text-center text-sm text-gray-600 py-2 italic'>
                    {image.caption}
                </div>


            </div>
            {/* <div className='flex flex-row justify-center'>
                <button
                    onClick={prev}
                    className=' bottom-0 md:bottom-2 lg:bottom-3 w-10 h-10 hover:scale-110 transition-transform duration-300'>
                    <img src='/images/previous-page.png' alt='Next Page' className='w-full h-full object-contain p-3' />

                </button>
                <button
                    onClick={next}
                    className=' bottom-0 md:bottom-2 lg:bottom-3 w-10 h-10 hover:scale-110 transition-transform duration-300'>
                    <img src='/images/next-page.png' alt='Next Page' className='w-full h-full object-contain p-3' />
                </button>
            </div> */}
            <div className='flex flex-row justify-center mt-2'>
                <button onClick={prev} className='w-10 h-10 hover:scale-110 transition-transform duration-300'>
                    <img src='/images/previous-page.png' alt='Prev Page' className='w-full h-full object-contain p-3' />
                </button>
                <button onClick={next} className='w-10 h-10 hover:scale-110 transition-transform duration-300'>
                    <img src='/images/next-page.png' alt='Next Page' className='w-full h-full object-contain p-3' />
                </button>
            </div>


        </section>
    )
}

export default GalerySection
