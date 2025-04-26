function HeaderButton({ onClick, imgSrc, alt }) {
    return (
        <button onClick={onClick} className='w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:h-10 xl:w-10 mr-1 rounded-sm shadow cursor-pointer hover:bg-blue-300 flex items-center justify-center'>
            <img src={imgSrc} alt={alt} className='h-[80%] object-contain' />
        </button>
    )
}

export default HeaderButton