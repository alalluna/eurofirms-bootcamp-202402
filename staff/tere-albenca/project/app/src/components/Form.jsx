function Form({ children, className, onSubmit }) {

  return (
    <form onSubmit={onSubmit} className={"m-6 flex-col item-left gap-1" + className}>
      {children}

    </form>
  )
}

export default Form