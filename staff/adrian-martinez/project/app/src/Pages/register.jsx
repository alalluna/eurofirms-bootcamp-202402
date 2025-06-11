import { useState } from "react";
//import Form from "../components/Form"
import logic from "../logic"
import { errors, validate } from "com"

const { ContentError, DuplicityError, RangeError, TypeError } = errors

function Register(props) {

    //Construimos un objecto para guardar el estado de los diferente tipor de errores que recojamos
    // en el formulario para poder ponerlos en el html al lado de su input
    const [error, setError] = useState(null);

    const handleSubmitStudent = event => {

        event.preventDefault();

        const form = event.target;

        const name = form.name.value;
        const surnames = form.surnames.value;
        const age = parseInt(form.age.value);

        const email = form.email.value;
        const password = form.password.value;

        try{
            logic.registerStudent(name, surnames, age, email, password)
                .then(() => props.onClickLogin())
                .catch(error => {
                    errorHandler(error)
                })

        }
        catch(error){
            errorHandler(error)
        }
    }

    //TODO
    const handleSubmitCompany = event => {

        event.preventDefault();

        const form = event.target;

        const name = form.name.value;
        const address = form.address.value;
        const activity = form.activity.value;
        const email = form.email.value;
        const password = form.password.value;

        try{
            logic.registerCompany(name, address, activity, email, password)
                .then(() => props.onClickLogin())
                .catch(error => {
                    errorHandler(error)
                })
        }
        catch(error){
            errorHandler(error)
        }
    }

    //Esta función nos va guardar los tipos de error de cada campo del formulario como propiedad del objeto Error
    const errorHandler = (error) => {
        console.error(error.message)

        let feedback = error.message;

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`;

        else if (error instanceof DuplicityError)
            feedback = `${feedback}, please verify credentials`;

        else
            feedback = "Sorry, there was an error, please try again later";

        const isNameError = error.message.includes('name')
        const isSurnamesError = error.message.includes('surnames')
        const isAgeError = error.message.includes("age")
        const isEmailError = error.message.includes("email")
        const isPasswordError = error.message.includes("password")
        const isActivityError = error.message.includes("activity")
        const isAddressError = error.message.includes("address")

        setError({ message: feedback, isNameError, isSurnamesError, isAgeError, isEmailError, isPasswordError, isActivityError, isAddressError });
    }


    return (
    <>
        <header className="header">
            <div id="app">FormativeLife</div>
            <div className="titular"><i>Crea ya tu perfil profesional !!</i></div>
            
        </header>
        <main>
            <container id="container">
                <section className="flex-auto">
                    <form className="float-right" onSubmit={ handleSubmitStudent }>
                        <label htmlFor="name">Nombre: </label>
                        <input type="text" id="name" placeholder="" required /><br/><br/>
                        {/* {error?.isNameError && <span className="text-red-500">{error.message}</span>}<br/> */}

                        <label htmlFor="surnames">Apellidos: </label>
                        <input type="text" id="surnames" placeholder="" required /><br/><br/>
                        {/* {error?.isSurnamesError && <span className="text-red-500">{error.message}</span>}<br/> */}

                        <label htmlFor="age">Edad: </label>
                        <input type="text" id="age" placeholder="Debe ser mayor de 16" required /><br/><br/>{error?.isAgeError && <span className="text-red-500">{error.message}</span>}<br/>

                        <label htmlFor="email">Correo electrónico: </label>
                        <input type="text" id="email" placeholder="" required /><br/>
                        {/* {error?.isEmailError && <span className="text-red-500">{error.message}</span>}<br/> */}

                        <label htmlFor="password">Contraseña: </label>
                        <input type="password" id="password" placeholder="Entre 8 y 16 caracteres" required /><br/><br/>
                        {/* {error?.isPasswordError && <span className="text-red-500">{error.message}</span>}<br/> */}

                        <button type="submit">Registrarse como estudiante</button>
                    </form>

                    <form className="float-left mt-30" onSubmit={ handleSubmitCompany }>
                        <label htmlFor="name">Nombre: </label>
                        <input type="text" id="name" placeholder="" required /><br/>
                        {/* {error?.isNameError && <span className="text-red-500">{error.message}</span>}<br/> */}

                        <label htmlFor="address">Ubicación: </label>
                        <input type="text" id="address" placeholder="Calle Real, N20 - Coruña" required /><br/>
                        {error?.isAddressError && <span className="text-red-500">{error.message}</span>}<br/>

                        <label htmlFor="activity">Actividad: </label>
                        <input type="text" id="activity" placeholder="Diseño Web" required /><br/>
                        {/* {error?.isActivityError && <span className="text-red-500">{error.message}</span>}<br/> */}

                        <label htmlFor="email">Correo electrónico: </label>
                        <input type="text" id="email" placeholder="" required /><br/>
                        {/* {error?.isEmailError && <span className="text-red-500">{error.message}</span>}<br/> */}

                        <label htmlFor="password">Contraseña: </label>
                        <input type="password" id="password" placeholder="Entre 8 y 16 caracteres" required /><br/><br/>
                        {/* {error?.isPasswordError && <span className="text-red-500">{error.message}</span>}<br/> */}

                        <button type="submit">Registrarse como empresa</button>
                    </form>

                </section>
                    {/* <button onClick={ FormStudent() }>Registrarse como Estudiante</button> */}
                    {/* <button onClick={ FormCompany() }>Registrarse como Empresa</button> */}
                <section className="absolute mt-96 m-2">
                    <button className="volver" onClick={props.onClickInicio}>Volver</button>
                </section>
                
            </container>
            
        </main>
        <footer>
       
        </footer>
    </>
    )
}

export default Register;