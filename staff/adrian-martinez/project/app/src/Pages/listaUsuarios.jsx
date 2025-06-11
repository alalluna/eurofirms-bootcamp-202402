import logic from "../logic";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


function ListaUsuarios(props) {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const role = logic.getLoggedInUserRole();
    const id = logic.getLoggedInUserId();

    useEffect(() => {

        const listaUsuarios = async () => {
            try {

                const users = await logic.retrieveUsers();
                //Filtramos por role para que nos muestre los usuarión según lo que se quiera consultar.
                //En este caso como solo tenemos dos tipos de usuario nos llegaría con decir que el rol
                //tiene que ser distinto al nuestro.
                const tipoUsers = users.filter(user => user.role !== role);
                setUsers(tipoUsers);

            } catch (error) {
                console.error(error.message)

                let feedback = error.message

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    feedback = `${feedback}, please correct it`
                else
                    feedback = 'sorry, there was an error, please try again later'

                alert(feedback)
            }
            finally {
                setLoading(false);
            }
        }

        listaUsuarios();
    }, [])

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <header className="header">
                <div id="app" onClick={props.onClickInicio}>FormativeLife</div>
                <div className="titular"><i>Lista de Usuarios</i></div>

                <button className="buscar" onClick={props.onUserLoggedIn}>Volver a tu perfil</button>
            </header>
            <main>
                <container id="container">
                    <section>
                        {
                            role == "student" ?
                           
                                <>
                                    <h2 className="text-xl font-bold text-center">Lista de empresas tech</h2>
                                    <ul>

                                        {
                                            users.map(user => (

                                                    <li key={user.id} className="text-lg font-bold p-4">
                                                    <Link to={`/profile/${user.id}`}>{user.name}</Link>
                                                </li>
                                                
                                            ))   
                                        }
                                        
                                    </ul>
                                </>
                                :
                                <>
                                    <h2 className="text-xl font-bold text-center">Lista de estudiantes</h2>
                                    <ul>
                                        
                                        {
                                            users.map(user => (

                                                <li key={user.id} className="text-lg font-bold p-4">
                                                    <Link to={`/profile/${user.id}`}>{user.name} {user.surnames}</Link>
                                                </li>
                                            ))
                                        }

                                    </ul>
                                </>
                        }
                    </section>
                </container>
            </main>
            <footer>

            </footer>
        </>
    )
}

export default ListaUsuarios;
