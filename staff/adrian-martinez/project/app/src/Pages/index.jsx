import logic from "../logic";
import { errors, validate } from "com"

const { SystemError } = errors;

function Inicio({ onClickLogin , onClickRegister, onClickParaQuienEs, onClickTutorial, onClickContacto, onClickListarUsers}) {

    const handleClickUserLogin = () => {
      
        onClickLogin();
    } 

    const handleClickUserRegister = () => {

        onClickRegister();
    }

    const handleClickParaQuienEs = () => {

        onClickParaQuienEs();
    }

    const handleClickTutorial = () => {

        onClickTutorial();
    }

    const handleClickContacto = () => {

        onClickContacto();
    }

    const handleClickListarUsers = () => {

        onClickListarUsers();
    }
        
    return (
    <>
        <header className="header">
            <div id="app">FormativeLife</div>
            <div className="titular"><i>Busca o atrae talento</i></div>
            <div id="area-perfil">
                <button className="login" onClick={handleClickUserLogin}>Iniciar Sesión</button>
                <button className="register" onClick={handleClickUserRegister}>Crear cuenta</button>
                {/* {
                    !logic.isUserLoggedIn && 
                    <>
                    <button className="login" onClick={handleClickUserLogin}>Iniciar Sesión</button>
                    <button className="register" onClick={handleClickUserRegister}>Crear cuenta</button>
                    </>
                }
                {
                    logic.isUserLoggedIn && <button className="buscar" ><a href="/home">Volver a tu perfil</a></button>
                } */}
            </div><br/><br/>
            {/* <div id="area-perfil mt-10">
                Usuarios registrados: 
            </div> */}
        </header>
        <main>
            <aside id="aside-left">
                <nav>
                    <ul>
                        <li>Inicio</li>
                        <li onClick={handleClickParaQuienEs}>¿Para quien es?</li>
                        <li onClick={handleClickTutorial}>Tutorial de uso</li>
                        <li onClick={handleClickContacto}>Contacto</li>
                    </ul>
                </nav>
            </aside>
            <container id="container">
                <section>
                    <h2>Estudiante de último año contactando con su primera empresa.</h2><br/>
                    <img width="300px" height="300px" src="https://www.infoautonomos.com/wp-content/uploads/2016/11/man-875702_640-640x433.jpg"/>
                    <p className="p-3">Una primera toma de contacto del estudiante con la empresa es crucial para que tanto el estudiante y el empresario con los mismos valores puedan conocerse y ser productivos para llevar un negocio al éxito.</p>
                    <p className="p-3">Y eso se consigue de una forma más productiva cuando se tiene experiencia en el sector. ¿Pero que pasa cuando no tienes experiencia laboral?.<br/>En un mundo laboral en donde ya la experiencia que tengas en 
                    cualquier trabajo le gana por golada a los títulos y a la formación que puedas adquirir aprendiendo, ya sea de forma autodidacta o aprendiendo de los mejores, tener una primera oportunidad laboral es importantísimo para que los
                    que no paran de aprender vean que todo su esfuerzo da resultados y los motiven a aprender más para ser cada vez más útiles a las empresas.</p>                    
                    <img width="300px" height="300px" src="https://media.licdn.com/dms/image/sync/D4D27AQGEehvg26EfuA/articleshare-shrink_1280_800/0/1715364222739?e=1716832800&v=beta&t=eM5BRtHArcqTDcuR8AVinAKQpXv5P_f0g97L1eBYQco"/>
                    Este chiste que me encontré en Linkedin hay que tomárselo con humor, pero nada más lejos de la realidad. Es es día a día de los que tenemos formación y nadie quiere apostar por nosotros por no tener experiencia. Y es que si nadie
                    te da la oportunidad de demostrar lo que vales nunca puedes conseguir la experiencia que tanto se pide en las empresas.<p>En Linkedin es facil que una semana nos encontremos "has aparecido en x búsquedas esta semana!". El
                    algoritmo hace su trabajo, sí, pero ese dato no nos sirve de nada si luego solicitamos un puesto en esa empresa y siempre recibimos la respuesta predeterminada que se da para quienes destacan automáticamente ese perfil. Da igual que te 
                    digan "tu perfil se ajusta un 80% a ese puesto", que si no tienes experiencia demostrable nunca se van fijar en tí.<br/>Este sitio web pretende hacer visible a los perfiles "pre-junior" y decirles a las empresas que también existimos. No 
                    esperes más y regístrate!<br/>Buena suerte (;</p>
                </section>
            </container>
        </main>
        <footer>
            
        </footer>
    </>
    )
}

export default Inicio;