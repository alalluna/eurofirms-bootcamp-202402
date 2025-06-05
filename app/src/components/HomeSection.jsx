import { useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css'
import logic from '../logic/calendar'
import CalendarSection from './CalendarSection'
import GallerySection from './GalerySection'

const HomeSection = ({ user }) => {
    const [events, setEvents] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date())

    useEffect(() => {
        logic.getEvents()
            .then(setEvents)
            .catch(error => alert(error.message))
    }, [])

    const eventsByDate = events.filter(event => {
        const eventDate = new Date(event.start.dateTime || event.start.date)
        return eventDate.toDateString() === selectedDate.toDateString()
    })

    return (
       <div className='relative w-full flex flex-col justify-between bg-[whitesmoke] overflow-hidden'>
            <h2 className='text-3xl font-bold text-center text-cyan-800 mb-6'>
                Next activities
            </h2>

            <div className='flex flex-col md:flex-row gap-4 px-4'>
                <GallerySection />
                <CalendarSection />
            </div>

            

        </div>
    )
}
export default HomeSection
