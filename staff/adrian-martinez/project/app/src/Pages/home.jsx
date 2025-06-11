import { useState, useEffect } from 'react'
import { errors } from "com"
import logic from '../logic'
import CreateCareer from "../components/CreateCareer"
import CareersStudent from "../components/CareersStudent"
import Button from '../components/Button'

const { ContentError, MatchError } = errors

function Home(props) {

    const [view, setView] = useState(null);
    const [user, setUser] = useState(null);
    const [refreshStamp, setRefreshStamp] = useState(null);

    useEffect(() => {
        try {
            logic.retrieveUser()
                .then(user => setUser(user))
                .catch(error => {
                    console.error(error.message)

                    let feedback = error.message

                    if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                        feedback = `${feedback}, please correct it`
                    else if (error instanceof MatchError)
                        feedback = `${feedback}, please verify user`
                    else
                        feedback = 'sorry, there was an error, please try again later'

                    alert(feedback)
                })
        } catch (error) {
            console.error(error.message)

            let feedback = error.message

            if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                feedback = `${feedback}, please correct it`
            else
                feedback = 'sorry, there was an error, please try again later'

            alert(feedback)
        }
    }, [])

    const handleLogout = () => {
        logic.logoutUser()

        props.onClickInicio()
    }

    const handleCreateCareerClick = () => setView('create-career')

    const handleCreateCareerCancelClick = () => setView(null)

    const handleCareerCreated = () => {
        
        setRefreshStamp();
        setView(null)
    }

    const handleDeleteUser = () => {

        alert("Para eliminar tu cuenta de usuario borra todos tus estudios y luego envía un correo al administrador del sitio web desde el menú de Contacto solicitando la eliminar la cuenta.")
    }

    return (
    <>
        <header className="header">
            <div id="app" onClick={props.onClickInicio}>FormativeLife</div>
            <div className="titular"><i>Actualiza tu perfil</i></div>
            <div id="area-perfil">
                <button className="button m-4" onClick={props.onClickInicio}>Página principal 🏚️</button>
                <button className="login button" onClick={handleLogout}>Cerrar Sesión</button>
                <Button className="bg-red-500 text-white m-2 border-solid border-2 border-black" onClick={ handleDeleteUser }>Borrar cuenta</Button>
            </div>
            <div id="area-buscador">
                <form className="form">
                    {/* Hacer buscador por area profesional si da tiempo */}
                    <button className="buscar" onClick={props.onClickListarUsers}>Buscar empresas y ver ofertas</button>
                </form>
            </div>
        </header>
        <main>
            <container id="container">
                <section>
                    {!user && <p>Loading...</p>}
                    {user && 
                    <>
                        <h1 className="text-3xl font-bold">{user.name} {user.surnames}</h1><br/>
                        <h2 className="text-xl"><span className="font-extrabold">Edad:</span> {user.age}</h2>
                        <h2 className="text-xl"><span className="font-extrabold">Correo:</span> {user.email}</h2>
                    </>
                    }
                    
                </section>
                <section>
                    <div className="mr-40">
                        <button className="button m-4" onClick={ handleCreateCareerClick }>Añadir estudios ➕</button>
                    </div>
                    <CareersStudent targetUserId={logic.getLoggedInUserId()} refreshStamp={ refreshStamp }/>
                </section>

            {view === 'create-career' && <CreateCareer onCancelClick={handleCreateCareerCancelClick} onCreateCareer={handleCareerCreated}/>}
            </container>
        </main>
        <footer className="footer">
            
        </footer>
    </>
    )
}

export default Home;