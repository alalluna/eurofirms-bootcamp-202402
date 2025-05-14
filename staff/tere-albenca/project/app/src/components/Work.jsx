import React, { useState, useEffect } from 'react'
import logic from '../logic'
import { errors } from 'com'
import { format } from 'date-fns'
import Htwo from './Htwo'
import LikeSection from './LikeSection'  // Importamos el componente LikeSection

const { MatchError, ContentError } = errors

function Work({ work, onWorkRemoved, onWorkEdit, user, onUserProfileClick }) {
    const [editWork, setEditWork] = useState(false)
    const [localWork, setLocalWork] = useState(work)

    useEffect(() => {
        setLocalWork(work) // si `work` cambia desde fuera
    }, [work])

    const handleProfileUserClick = () => {
        onUserProfileClick(work.author.id)
    }

    const handleRemoveWork = () => {
        try {
            if (confirm('Delete work?')) {
                logic.removeWork(work.id)
                    .then(() => onWorkRemoved())
                    .catch(handleError)
            }
        } catch (error) {
            handleError(error)
        }
    }

    const handleError = (error) => {
        let feedback = error.message;
        if (
            error instanceof TypeError ||
            error instanceof RangeError ||
            error instanceof ContentError
        )
            feedback = `${feedback}, please correct it`
        else if (error instanceof MatchError)
            feedback = `${feedback}, please verify credentials`
        else feedback = 'Sorry, there was an error, please try again later'
        alert(feedback)
    }


    const handleUpdateWork = event => {
        event.preventDefault()
        const form = event.target
        const title = form.title.value
        const text = form.text.value

        logic.updateWork(work.id, title, text)
            .then(() => {
                setEditWork(false)
                onWorkEdit()
            })
            .catch(handleError)
    }

    const handleShowForm = () =>  setEditWork(true)

    const handleCancelClick = () => setEditWork(false)

    if (!localWork  || !localWork.likes) {
        return <p>Loading...</p>
    }

    return (
        <article className="w-full bg-white rounded-lg shadow-md p-4 mb-4">
            <h1
                className="font-bold text-lg text-cyan-400 cursor-pointer hover:text-cyan-700"
                onClick={handleProfileUserClick}
            >
                {localWork.author.name}
            </h1>
            <div className="w-[90%] flex flex-row justify-between items-center mt-2">
                <Htwo className="text-cyan-900">{localWork.title}</Htwo>
                {(user?.role === 'teacher' || user?.id === localWork.author.id) && (
                    <div className="flex space-x-2">
                        <button
                            className="px-1.5 py-0.5 bg-gray-200 rounded-md text-sm shadow-md hover:bg-gray-300 hover:shadow-lg active:bg-gray-400 active:shadow-xl transition-all duration-200"
                            onClick={handleShowForm}
                        >
                            ✏️
                        </button>
                        <button
                            className="px-1.5 py-0.5 bg-gray-200 rounded-md text-white text-l font-bold shadow-md hover:bg-gray-300 hover:shadow-lg active:bg-gray-400 active:shadow-xl transition-all duration-200"
                            onClick={handleRemoveWork}
                        >
                            ❌
                        </button>
                    </div>
                )}
            </div>

            {editWork && (
                <div className="mt-2">
                    <form onSubmit={handleUpdateWork} className="flex flex-col space-y-2">
                        <input
                            id="title"
                            type="text"
                            placeholder="Edit title"
                            defaultValue={localWork.title}
                            className="px-2 py-1 border rounded-md"
                        />
                        <input
                            id="text"
                            type="text"
                            placeholder="Edit text"
                            defaultValue={localWork.text}
                            className="px-2 py-1 border rounded-md"
                        />
                        <div className="flex space-x-1">
                            <button
                                type="submit"
                                className="px-2 py-0.5 bg-gray-200 rounded-md text-white text-sm shadow-md hover:bg-gray-300 hover:shadow-lg active:bg-gray-400 active:shadow-xl transition-all duration-200"
                            >
                                ok
                            </button>
                            <button
                                type="button"
                                className="px-1.5 py-0.5 bg-gray-200 rounded-md text-l font-bold shadow-md hover:bg-gray-300 hover:shadow-lg active:bg-gray-400 active:shadow-xl transition-all duration-200"
                                onClick={handleCancelClick}
                            >
                                ✖️
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <img src={localWork.image} className="w-[90%] rounded-lg mt-4" alt={localWork.title} />
            <p className="mt-2 text-gray-700 text-sm font-light">{localWork.text}</p>
            <p className="block text-right text-xs text-gray-500 mt-2">
                {format(new Date(localWork.date), ' HH:mm dd/MM/yyyy')}
            </p>

            {/* Aquí integramos el componente LikeSection */}
            <LikeSection
                work={localWork}
                user={user}
                onUserProfileClick={handleProfileUserClick}
                onLikeUpdated={setLocalWork}
            />
        </article>
    )
}

export default Work
