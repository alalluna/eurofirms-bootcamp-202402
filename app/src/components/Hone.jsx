function Hone({ children, className }) {
  return (
    <h1
      className={'mt-4 text-2xl text-cyan-900 font-bold mb-[15px] shadow-black-dark' + className}
    >
      {children}
    </h1>
  )
}
export default Hone
