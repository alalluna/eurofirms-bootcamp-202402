function Contacto(props) {

    return (
    <>
        <header className="header">
            <div id="app" onClick={props.onClickInicio}>FormativeLife</div>
            <div className="titular"><i>Busca o atrae talento</i></div>
            <div id="area-perfil">
                <button className="login" onClick={props.onClickLogin}>Iniciar Sesión</button>
                <button className="register" onClick={props.onClickRegister}>Crear cuenta</button>
            </div>
        </header>
        <main>
            <aside id="aside-left">
                <nav>
                    <ul>
                        <li onClick={props.onClickInicio}>Inicio</li>
                        <li onClick={props.onClickParaQuienEs}>¿Para quien es?</li>
                        <li onClick={props.onClickTutorial}>Tutorial de uso</li>
                        <li onClick={props.onClickContacto}>Contacto</li>
                    </ul>
                </nav>
            </aside>
            <container id="container">
                <section>
                    <h2 className="font-bold text-xl">Contacto</h2><br/>
                    <h2 className="font-bold text-lf">Correo:</h2><span className="text-lf">adrianmi.info@gmail.com</span>
                    <h2 className="font-bold text-lf">Teléfono:</h2><span className="text-lf">608501323</span>
                    
                </section>
            </container>
        </main>
        <footer>
            
        </footer>
    </>
    )
}

export default Contacto;