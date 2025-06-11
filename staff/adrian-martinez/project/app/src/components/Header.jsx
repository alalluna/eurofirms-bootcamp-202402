function Header ({className, role}){
    return (

            role === "student" ?
         
            <header className={className}>
                <div id="app" >FormativeLife</div>
                <div className="titular"><i>Perfil del estudiante</i></div>
            </header>
        
        :
        
            <header className={className}>
                <div id="app" >FormativeLife</div>
                <div className="titular"><i>Perfil de la empresa</i></div>
            </header>
        
    )
}

export default Header;