function Input({ className = '', type = 'text', id }) {
    return <input className={`border-b-2 border-black` + className} type={type} id={id} />

}

export default Input