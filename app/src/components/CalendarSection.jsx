import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import logic from '../logic/calendar'

function CalendarSection({ user }) {
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
        // <section className='w-full px-4 py-8 bg-gray-100 rounded-xl shadow-sm'>
        <section className='w-full md:w-1/2 p-2 bg-gray-100 rounded-xl shadow-sm'>
         
            <div className='justify-center items-center'>
                {/* Calendario */}
                <div className='bg-white p-1 rounded-lg shadow-md w-full'>
                    <Calendar
                        value={selectedDate}
                        onChange={setSelectedDate}
                        className='w-full text-sm font-bold'
                        tileClassName={({ date }) =>
                            events.some(event => {
                                const eventDate = new Date(event.start.dateTime || event.start.date)
                                return eventDate.toDateString() === date.toDateString()
                            }) ? 'bg-cyan-100 text-cyan-800 rounded-md' : null
                        }
                    />
                </div>

            </div>
            <h3 className='text-md text-center pt-2'>Este es un portotypo de academia online, si deseas ver mas entra con:</h3>
            <p className='text-sm text-center' >email: "xxxxxxxx@gmail.com" password: "xxxxxxy@" </p>
        </section>
    )
}
export default CalendarSection


                // {/* Eventos del día */}
                // <div className='bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 flex flex-col'>
                //     <h3 className='text-xl font-semibold text-gray-700 mb-3'>
                //         {selectedDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                //     </h3>

                //     {eventsByDate.length === 0 ? (
                //         <p className='text-gray-500 italic'>No hay eventos para este día.</p>
                //     ) : (
                //         <ul className='list-disc list-inside text-gray-700 space-y-2'>
                //             {eventsByDate.map((event, i) => (
                //                 <li key={i} className='pl-2 border-l-4 border-cyan-500'>
                //                     <strong>{event.summary}</strong><br />
                //                     <span className='text-xs text-gray-500'>
                //                         {new Date(event.start.dateTime || event.start.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                //                     </span>
                //                 </li>
                //             ))}
                //         </ul>
                //     )}

                //     <button
                //         onClick={() => window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`}
                //         className='mt-auto self-start bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all duration-200 mt-6'
                //     >
                //         🔗 Vincular con Google Calendar
                //     </button>
                // </div>