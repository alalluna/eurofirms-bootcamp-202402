
function Tutorial(props) {

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
                    <h2 className="font-bold text-xl">Tutorial de uso</h2><br/>
                    <p>Si eres nuevo y no sabes como utilizar este sitio, aquí está pequeña guía:</p>
                    <br/><br/>
                    <ul>
                        <li>1. Navega por las distintas páginas para tener una idea del objetivo del sitio web.
                        </li><br/>
                        <li>
                            2. Si quieres empezar a utilizarlo y ver que ventajas tiene registrate con uno de los 2 tipos de usuario que tenemos.
                        </li><br/>
                        <li>
                            3. Inicia sesión y controla tu perfil de usuario en todo momento.
                        </li><br/>
                        <li>
                            4. Cuanto más actualizado tengas tu perfil, más se van fijar las empresas o estudiantes en tí.
                        </li><br/>
                        <li>
                            5. Para cualquier duda o sugerencia sobre el sitio web tienes el correo y teléfono del administrador del sitio en la página de Contacto.
                        </li><br/>
                        <h3>Suerte con tu perfil y empieza a sacarle rendimiento!</h3>
                    </ul>                    
                </section>
            </container>
        </main>
        <footer>
            
        </footer>
    </>
    )
}

export default Tutorial;