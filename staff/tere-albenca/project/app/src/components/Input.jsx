function Input({ className, type = 'text', placeholder, id }) {
    return (
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            className={`w-full p-2 rounded-md border-gray-200 mb-2 box-border hover:bg-gray-100 ${className}`}
        />
    )

}

export default Input