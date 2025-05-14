function FooterButton({ onClick, alt,  children  }) {
    return (
        <button 
            onClick={onClick} 
            className='bg-[white] hover:bg-[whitesmoke] text-{#333333} border-0 px-[10px] py-1 rounded-xl text-xs md:text-xs lg:text-sm xl:text-base'
            alt={alt}
        >
            
        {children}

        </button>
    )
}

export default FooterButton