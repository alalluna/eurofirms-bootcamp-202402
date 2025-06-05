import React, { useState } from 'react'
import logic from '../logic'
import { errors } from 'com'
import { format } from 'date-fns'
import YouTube from 'react-youtube'

const { MatchError, ContentError } = errors

// Función para extraer el ID de YouTube desde una URL
function extractYouTubeID(url) {
    const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=|\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)

    if (match && match[2].length === 11) {
        return match[2]
    } else {
        return null
    }
}


function Lesson({ lesson, onLessonRemoved, onLessonEdit, user, onUserLessonClick }) {
    const [editLesson, setEditLesson] = useState(false)

    const handleLessonsUserClick = () => {
        onUserLessonClick(lesson.teacher.id)
    }

    const handleRemoveLesson = () => {
        try {
            if (confirm('Delete lesson?')) {
                logic.removeLesson(lesson.id)
                    .then(() => onLessonRemoved())
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

    const handleUpdateLesson = event => {
        try {
            event.preventDefault()
            const form = event.target
            const title = form.title.value
            const image = form.image.value
            const description = form.description.value
            const link = form.link.value
            const video = form.video.value

            logic.updateLesson(lesson.id, title, image, description, link, video)
                .then(() => {
                    setEditLesson(false)
                    onLessonEdit()
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
                })
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
        setEditLesson(true)
    }

    const handleCancelClick = () => {
        setEditLesson(false)
    }

    const youtubeId = extractYouTubeID(lesson.video)

    return (
        <article className='w-full bg-white rounded-lg shadow-md p-4 mb-4'>
            <h3 className='font-bold text-lg text-cyan-400 cursor-pointer hover:text-cyan-700' onClick={handleLessonsUserClick}>{lesson.teacher.name}</h3>
            <div className='w-[90%] flex flex-row justify-between items-center mt-2'>
                <h4 className='font-bold text-xl  text-cyan-900'>{lesson.title}</h4>
                {(user && user.role === 'teacher') ? (
                    <div className='flex space-x-2'>
                        <button className='px-1.5 py-0.5 bg-gray-200 rounded-md text-sm shadow-md hover:bg-gray-300 hover:shadow-lg active:bg-gray-400 active:shadow-xl transition-all duration-200' onClick={handleShowForm}>✏️</button>
                        <button className='px-1.5 py-0.5 bg-gray-200 rounded-md text-white text-l font-bold shadow-md hover:bg-gray-300 hover:shadow-lg active:bg-gray-400 active:shadow-xl transition-all duration-200' onClick={handleRemoveLesson}>❌</button>

                    </div>
                ) : null}
            </div>

            {editLesson && (
                <div className='mt-2'>
                    <form onSubmit={handleUpdateLesson} className='flex flex-col space-y-2'>
                        <Input id='title' type='text' placeholder='Edit title' defaultValue={lesson.title} className='px-2 py-1 border rounded-md' />
                        <Input type='text' placeholder='edit image' defaultValue={lesson.image} className='px-2 py-1 border rounded-md' />

                        <Input type='text' placeholder='edit description' defaultValue={lesson.description} className='px-2 py-1 border rounded-md' />
                        <Input type='text' placeholder='edit link' defaultValue={lesson.link} className='px-2 py-1 border rounded-md'/>
                        <Input type='text' placeholder='edit video' defaultValue={lesson.video} className='px-2 py-1 border rounded-md' />
                        <input id='text' type='text' placeholder='Edit text' defaultValue={work.text} className='px-2 py-1 border rounded-md'/>
                        <div className='flex space-x-1'>
                            <button type='submit' className='px-2 py-0.5 bg-gray-200 rounded-md  text-white text-sm shadow-md hover:bg-gray-300 hover:shadow-lg active:bg-gray-400 active:shadow-xl transition-all duration-200'> ok</button>
                            <button type='button' className='px-1.5 py-0.5 bg-gray-200 rounded-md text-l font-bold shadow-md hover:bg-gray-300 hover:shadow-lg active:bg-gray-400 active:shadow-xl transition-all duration-200' onClick={handleCancelClick}>✖️</button>
                        </div>
                    </form>
                </div>
            )}
            <img src={lesson.image} className='w-[90%] rounded-lg mt-4' alt={lesson.title} />
            <p className='mt-2 text-gray-700'>{lesson.description}</p>

            {lesson.link && (
                <div className='w-[90%] mt-4'>
                    <a href={lesson.link} target='_blank' rel='noopener noreferrer' className='text-blue-500 hover:underline'>
                        {lesson.link}
                    </a>
                </div>
            )}

            {youtubeId && (
                <div className='w-[90%] rounded-lg mt-4'>
                    <YouTube videoId={youtubeId} className='youtube' />
                </div>
            )}
            <p className='block text-right text-xs text-gray-500 mt-2'>{format(new Date(lesson.date), 'HH:mm dd/MM/yyyy')}</p>
        </article>
    )
}

export default Lesson