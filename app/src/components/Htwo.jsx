function Htwo({ children, className = '', type, onClick }) {

  return (
    <h2
      type={type}
      onClick={onClick}
      className={'text-base text-cyan-600 font-bold mb-[12px] pl-2' + className}
    >
      {children}
    </h2>
  )
}

export default Htwo
