function Label({ className, htmlFor }) {
    return (
        <label htmlFor={htmlFor} className={'' + className} ></label>
    )
}

export default Label