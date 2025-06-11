import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { errors } from "com"
import logic from '../logic'
import Header from './Header'
import CareersStudent from './CareersStudent'
import OffersCompany from './OffersCompany'

const { ContentError, MatchError } = errors

function Profile() {
    const [user, setUser] = useState(null);
    const [refreshStamp, setRefreshStamp] = useState(null);

    const { targetUserId } = useParams()

    useEffect(() => {
        try {
            logic.retrieveUser(targetUserId)
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

    const role = user?.role;

    return (
        <>
        {
            role === "student" ?

            <>
            <Header className="header" role={role}></Header>
            <main>
                <container id="container">
                    <section>
                        {!user && <p>Loading...</p>}
                        {user && 
                        <>
                            <h1 className="text-3xl font-bold">{user.name} {user.surnames}</h1><br/>
                            <h1 className="text-xl"><span className="font-extrabold">Edad:</span> {user.age}</h1>
                            <h1 className="text-xl "><span className="font-extrabold">Correo:</span> {user.email}</h1>

                        </>
                        }
                        
                    </section>
                    <section>
                        
                        <CareersStudent targetUserId={targetUserId} refreshStamp={ refreshStamp }/>
                    </section>
                </container>
            </main>
            <footer className="footer">
                
            </footer>
        
        </>
        : 
        <>
            <Header className="header" role={role}></Header>
            <main>
                <container id="container">
                        <section>
                            {!user && <p>Loading...</p>}
                            {user && 
                            <>
                                <h1 className="text-3xl font-bold">{user.name}</h1><br/>
                                <h2 className="text-xl "><span className="font-extrabold">Actividad:</span> {user.activity}</h2>
                                <h2 className="text-xl "><span className="font-extrabold">Ubicación:</span> {user.address}</h2>
                                <h2 className="text-xl "><span className="font-extrabold">Correo:</span> <a href="https://www.gmail.com/mail/help/intl/es/about.html?iframe" target="_blank">{user.email}</a></h2>

                                <p className='p-4 float-right italic font-extrabold'>Para inscribirse a una oferta es necesario enviar tu CV al correo de la empresa. Mucha suerte! </p>
                            </>
                            }

                        </section>
                        <section>
                       
                        <OffersCompany targetUserId={targetUserId} refreshStamp={ refreshStamp }/>
                    </section>
                </container>
            </main>
            <footer className="footer">
                
            </footer>
        </>
        }
    </>
    )
}

export default Profile;