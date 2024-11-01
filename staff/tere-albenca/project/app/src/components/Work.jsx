import React, { useState, useEffect } from 'react'
import logic from '../logic'
import { errors } from 'com'
import { format } from 'date-fns'
import Htwo from './Htwo'
import GiveLikeWorkButton from './GiveLikeWorkButton'

const { MatchError, ContentError } = errors

function Work({ work, onWorkRemoved, onWorkEdit, user, onUserProfileClick }) {
    const [editWork, setEditWork] = useState(false)
    const [isLiked, setIsLiked] = useState(false) // Estado para controlar si está "likeado"
    const [likeCount, setLikeCount] = useState(0) // Contador de likes
    const [showLikesList, setShowLikesList] = useState(false) // Estado para manejar la visibilidad de la lista de likes
    const [likers, setLikers] = useState([])

    useEffect(() => {
        if (work && work.likes) { // Asegurarse de que work y likes existen antes de acceder a ellos
            setLikeCount(work.likes.length) // Actualiza el contador de likes con los datos que vengan del servidor

            // Verificar si el usuario ya ha dado "like" a esta obra
            if (user && work.likes.includes(user.id)) {
                setIsLiked(true)
            }
            setLikers(work.likes)
        }
    }, [user, work])

    const handleProfileUserClick = () => {
        onUserProfileClick(work.author.id)
    }

    const handleRemoveWork = () => {
        try {
            if (confirm('Delete work?')) {
                logic.removeWork(work.id)
                    .then(() => onWorkRemoved())
                    .catch(error => {
                        console.error(error)
                        let feedback = error.message
                        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                            feedback = `${feedback}, please correct it`
                        else if (error instanceof MatchError)
                            feedback = `${feedback}, please verify credentials`
                        else
                            feedback = 'Sorry, there was an error, please try again later'
                        alert(feedback)
                    })
            }
        } catch (error) {
            console.error(error)
            let feedback = error.message
            if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                feedback = `${feedback}, please correct it`
            else
                feedback = 'Sorry, there was an error, please try again later'
            alert(feedback)
        }
    }

    const handleUpdateWork = event => {
        try {
            event.preventDefault()
            const form = event.target
            const title = form.title.value
            const text = form.text.value

            logic.updateWork(work.id, title, text)
                .then(() => {
                    setEditWork(false)
                    onWorkEdit()
                })
                .catch(error => {
                    console.error(error)
                    let feedback = error.message
                    if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                        feedback = `${feedback}, please correct it`
                    else if (error instanceof MatchError)
                        feedback = `${feedback}, please verify credentials`
                    else
                        feedback = 'Sorry, there was an error, please try again later'
                    alert(feedback)
                });
        } catch (error) {
            console.error(error)
            let feedback = error.message
            if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                feedback = `${feedback}, please correct it`
            else
                feedback = 'Sorry, there was an error, please try again later'
            alert(feedback)
        }
    }

    const handleShowForm = () => {
        setEditWork(true)
    }

    const handleCancelClick = () => {
        setEditWork(false)
    }

    // Función para manejar el "like" o "unlike"
    const handleToggleLike = () => {
        try {
            logic.giveLikeWork(work.id)
                .then(() => {
                    setIsLiked(!isLiked) // Alternar el estado del "like"
                    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1) // Actualizar el contador
                })
                .catch(error => {
                    console.error('Error al dar o quitar like:', error)
                })
        } catch (error) {
            console.error('Error al intentar dar o quitar like:', error)
        }
    }

    const toggleLikesList = () => {
        setShowLikesList(prev => !prev)
    }

    if (!work || !work.likes) {
        return <p>Loading...</p>
    }


    return (
        <article className="w-full bg-white rounded-lg shadow-md p-4 mb-4">
            <h1 className="font-bold text-lg text-blue-400 cursor-pointer hover:text-blue-700" onClick={handleProfileUserClick}>{work.author.name}</h1>
            <div className="w-[90%] flex flex-row justify-between items-center mt-2">
                <Htwo className="text-blue-900">{work.title}</Htwo>
                {(user && user.role === 'teacher') || (user && user.id === work.author.id) ? (
                    <div className="flex space-x-2">
                        <button className="px-1.5 py-0.5 bg-gray-200 rounded-md text-sm shadow-md hover:bg-gray-300 hover:shadow-lg active:bg-gray-400 active:shadow-xl transition-all duration-200" onClick={handleShowForm}>✏️</button>
                        <button className="px-1.5 py-0.5 bg-gray-200 rounded-md text-white text-l font-bold shadow-md hover:bg-gray-300 hover:shadow-lg active:bg-gray-400 active:shadow-xl transition-all duration-200" onClick={handleRemoveWork}>❌</button>

                    </div>
                ) : null}
            </div>

            {editWork && (
                <div className="mt-2">
                    <form onSubmit={handleUpdateWork} className="flex flex-col space-y-2">
                        <input id="title" type="text" placeholder="Edit title" defaultValue={work.title} className="px-2 py-1 border rounded-md" />
                        <input id="text" type="text" placeholder="Edit text" defaultValue={work.text} className="px-2 py-1 border rounded-md" />
                        <div className="flex space-x-1">
                            <button type="submit" className="px-2 py-0.5 bg-gray-200 rounded-md  text-white text-sm shadow-md hover:bg-gray-300 hover:shadow-lg active:bg-gray-400 active:shadow-xl transition-all duration-200"> ok</button>
                            <button type="button" className="px-1.5 py-0.5 bg-gray-200 rounded-md text-l font-bold shadow-md hover:bg-gray-300 hover:shadow-lg active:bg-gray-400 active:shadow-xl transition-all duration-200" onClick={handleCancelClick}>✖️</button>
                        </div>
                    </form>
                </div>
            )}

            <img src={work.image} className="w-[90%] rounded-lg mt-4" alt={work.title} />
            <p className="mt-2 text-gray-700 text-sm font-light">{work.text}</p>
            <p className="block text-right text-xs text-gray-500 mt-2">{format(new Date(work.date), ' HH:mm dd/MM/yyyy')}</p>


            <div
                className="like flex items-center space-x-1 mt-2"
                onMouseEnter={toggleLikesList} // Muestra la lista al hacer hover
                onMouseLeave={toggleLikesList} // Oculta la lista al salir
                onClick={toggleLikesList} // Alternar visibilidad al hacer clic
            >
                <GiveLikeWorkButton isLiked={isLiked} onClick={handleToggleLike} />
                <p className="text-sm text-gray-600 align-text-bottom">{likeCount} likes</p>
                {showLikesList && (
                    <div className="absolute bg-white border rounded shadow-lg max-w-[300px] p-2 mt-2">
                        {likers.map((likerId, index) => (
                            <div key={index} className="text-center">{/* Ajusta aquí para usar el nombre y apellido del usuario */}
                                {/* Suponiendo que tienes un método para obtener el nombre del usuario por ID */}
                                {user.name + ' ' +
                                    user.surname} {/* Cambia esto por el nombre del usuario */}
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </article>
    )
}

export default Work