function HeaderButton({ onClick, imgSrc, alt }) {
    return (
        <button onClick={onClick}
            className=' 
               
                // aspectos generales
                            mr-1 rounded-sm shadow flex items-center justify-center
                // escala responsive
                            w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:h-10 xl:w-10 

                // interaccion del usuario
                            active:bg-cyan-600 active:scale-95 
                            focus-visible:ring focus-visible:ring-cyan-300 
                            transition duration-300 ease-in-out 
                            hover:bg-cyan-300 '>

            <img src={imgSrc} alt={alt} className='h-[100%] object-contain' />
        </button>
    )
}

export default HeaderButton