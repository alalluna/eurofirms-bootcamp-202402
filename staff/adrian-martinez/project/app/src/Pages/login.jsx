import { useState } from "react"
import logic from "../logic"
import { errors, validate} from "com"

const { SystemError, MatchError, ContentError} = errors;

function Login({onUserLoggedIn, onClickResetPassword, onClickInicio}) {

    const [error, setError] = useState(null);

    const handleSubmit = event => {

        event.preventDefault();
        const form = event.target;

        const email = form.user.value;
        const password = form.password.value;
       
        try{
            logic.loginUser(email, password)
                .then(() => onUserLoggedIn())
                .catch(error => {
                    errorHandler(error);
                })
        }
        catch(error){
            errorHandler(error);
        }
    }

    const errorHandler = (error) => {
        console.error(error.message)

        let feedback = error.message;

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, por favor corrige eso.`;

        else if (error instanceof MatchError)
            feedback = `${feedback}, pon unas credenciales válidas.`;

        else{
            feedback = "Lo sentimos, ha habido un error, inténtalo de nuevo más tarde.";
            alert(feedback)
        }
            

        const isUserError = error.message.includes("email");
        const isPasswordError = error.message.includes("password");

        setError({ message: feedback, isUserError, isPasswordError })
    }

    return (
    <>
        <header className="header">
            <div id="app">FormativeLife</div>
            <div className="titular"><i>Tu red de contactos haciendo Match</i></div>
        </header>
        <main>
            <container id="container">
                <section>
                    <form className="form" onSubmit={handleSubmit}>
                        <label htmlFor="user">Usuario</label>
                        <input type="text" id="user" placeholder="Tu email"/><br/>
                        {error?.isUserError && <span className="text-red-500">{error.message}</span>}<br/>

                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" placeholder="Contraseña"/><br/>
                        {error?.isPasswordError && <span className="text-red-500">{error.message}</span>}<br/><br/>

                        <button type="submit">Iniciar Sesion</button><br/><br/>
                    </form>

                    <button onClick={onClickInicio}>Volver</button>
                </section>
            </container>
        </main>
        <footer>
            
        </footer>
    </>
    )
}

export default Login;