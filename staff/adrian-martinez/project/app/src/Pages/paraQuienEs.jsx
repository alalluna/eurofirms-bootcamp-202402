

function ParaQuienEs(props) {
  
    console.debug('App render')
    
    return (
    <>
        <header className="header">
            <div id="app" onClick={props.onClickInicio}>FormativeLife</div>
            <div className="titular"><i>Busca o atrae talento</i></div>
            <div id="area-perfil">
                <button className="register" onClick={props.onClickRegister}>Crear cuenta</button>
                <button className="buscar" onClick={props.onUserLoggedIn}>Volver a tu perfil</button>
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
                <section className="display-flex w-4/5">
                    <h2 className="font-bold text-xl">¿Para Quién es?</h2>
                    <p className="p-3">Este sitio web busca que tanto los estudiantes como las empresas tengan un primer contacto de 
                    una forma cómoda, rápida y sean selectivos sobre lo que buscan y den paso una posible entrevista ya contando con el perfil que 
                    se van encontrar. Una manera muy efectiva de filtrar sin tener que enfrentarse a varios procesos de selección.</p>
                    <p>Las ventajas de utilizar este sitio web son:</p><br/>
                    <div className="w-2/5 border-double border-4 border-blue-300 float-left">
                        <div className="text-center font-extrabold">Estudiante</div><br/>
                        <div className="text-center font-medium">- Perfil detallado</div>
                        <div className="text-center font-normal">- Poder actualizar el perfil en unos pocos clicks</div>
                        <div className="text-center font-normal">- Ser más selectivo al buscar ofertas al ser un sitio web solo para pre-juniors</div><br/>
                    </div>
                    <div className="w-2/5 border-double border-4 border-blue-300 float-right ms-10">
                        <div className="text-center font-extrabold">Empresa</div><br/>
                        <div className="text-center font-normal">- Perfil detallado</div>
                        <div className="text-center font-normal">- Poder poner ofertas en unos pocos clicks</div>
                        <div className="text-center font-normal">- Evitar procesos de seleción largos ya conociendo rápido a varios perfiles</div><br/>
                    </div>                    
                </section>
            </container>
        </main>
        <footer>
            
        </footer>
    </>
    )
}

export default ParaQuienEs;