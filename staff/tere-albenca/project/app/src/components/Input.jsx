function Input({ className, type = 'text', placeholder, id }) {
    return (
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            className={`w-full p-2 rounded-md border-gray-300 mb-1 box-border hover:bg-[whitesmoke] text-xs sm:text-sm md:text-base lg:text:lg xl:text-xl${className}`}
        />
    )

}

export default Input