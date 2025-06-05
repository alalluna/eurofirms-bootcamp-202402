function Input({ className, type = 'text', placeholder, id }) {
    return (
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            className={`w-full p-1 rounded-md border-gray-300 mb-1 box-border hover:bg-gray-300 text-xs sm:text-sm md:text-base ${className}`}
        />
    )

}

export default Input