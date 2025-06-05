import React, { useState, useEffect } from 'react'
import logic from '../logic'
import Lesson from './Lesson'

function Lessons({ user, refreshStamp, onUserLessonClick }) {
    const [lessons, setLessons] = useState([])

    useEffect(() => {
        loadLessons()
    }, [refreshStamp])

    const loadLessons = () => {
        setLoading(true)
        setError(null)
        try {
            logic.retrieveLessons()
                .then(lessons => {
                    setLessons(lessons)
                    setLoading(false)
                })
                .catch(error => {
                    console.error(error)
                    setError(error.message)
                    setLoading(false)
                })
        } catch (error) {
            console.error(error)
            setError(error.message)
            setLoading(false)
        }
    }

    const handleLessonRemoved = () => loadLessons()
    const handleLessonEdit = () => loadLessons()

    return (
        <section className='flex flex-col justify-center gap-6 px-2 py-4'>
            {lessons.map(lesson => (
                <Lesson
                    key={lesson.id}
                    lesson={lesson}
                    user={user}
                    onLessonRemoved={handleLessonRemoved}
                    onLessonEdit={handleLessonEdit}
                    onUserLessonClick={onUserLessonClick}
                />
            ))}
        </section>
    )
}

export default Lessons
