import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { errors } from 'com'

import logic from '../logic'

const { ContentError, MatchError } = errors

function Events() {
    const [events, setEvents] = useState(null)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const errorHandler = error => {
        console.error(error)

        let feedback = error.message

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`
        else if (error instanceof MatchError)
            feedback = 'sorry there was an error, please try again later'



        setError({ message: feedback })
    }

    useEffect(() => {
        try {
            logic.retrieveEvents()
                .then(events => setEvents(events))
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }, [])

    const handleEventClick = eventId => {
        navigate(`/events/${eventId}`)
    }
    return <>

        <h2 className=' text-xl'>Upcoming Events</h2>
        {error && <span className='text-red-500'>{error.message}</span>}

        {events ? events.map(event => {
            return <section key={event.id} className={`border-black border-2 ${event.status === 'open' ? 'bg-cyan-100' : 'bg-rose-200'}`}>
                <h3><a onClick={() => handleEventClick(event.id)} className=' underline cursor-pointer text-lg'>{event.name}</a></h3>
                <p>{event.description}</p>
                <p>Status:  {event.status}</p>

            </section>

        }
        ) : <span>Loading</span>}
    </>

}

export default Events
