import { useState } from 'react'
import logic from '../logic/calendar'

function CreateEventForm({ onEventCreated }) {
    const [form, setForm] = useState({ title: '', start: '', end: '' })

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await logic.createEvent(form)
            alert('Evento creado correctamente')
            onEventCreated?.() // refresh
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-6 space-y-4'>
            <h3 className='text-xl font-semibold text-cyan-700'>Crear nuevo evento</h3>

            <div className='flex flex-col'>
                <label className='text-sm text-gray-600'>Título</label>
                <input
                    name='title'
                    type='text'
                    value={form.title}
                    onChange={handleChange}
                    className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400'
                    required
                />
            </div>

            <div className='flex flex-col'>
                <label className='text-sm text-gray-600'>Inicio</label>
                <input
                    name='start'
                    type='datetime-local'
                    value={form.start}
                    onChange={handleChange}
                    className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400'
                    required
                />
            </div>

            <div className='flex flex-col'>
                <label className='text-sm text-gray-600'>Fin</label>
                <input
                    name='end'
                    type='datetime-local'
                    value={form.end}
                    onChange={handleChange}
                    className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400'
                    required
                />
            </div>

            <button
                type='submit'
                className='bg-cyan-500 text-white font-semibold py-2 px-4 rounded hover:bg-cyan-600 transition'
            >
                ➕ Crear evento
            </button>
        </form>
    )
}
export default CreateEventForm