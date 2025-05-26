import React, { useState, useEffect } from 'react'
import logic from '../logic'
import Work from './Work'

function Works({ user, refreshStamp, searchQuery, onUserProfileClick }) {
    const [works, setWorks] = useState([])

    useEffect(() => {
        if (searchQuery) {
            searchWorks()
        } else {
            loadWorks()
        }
    }, [refreshStamp, searchQuery])

    const searchWorks = () => {
        try {
            logic.searchWorks(searchQuery)
                .then(works => setWorks(works))
                .catch(error => {
                    console.log(error)
                    alert(error.message)
                })
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    const loadWorks = () => {
        try {
            logic.retrieveWorks()
                .then(works => setWorks(works))
                .catch(error => {
                    console.log(error)
                    alert(error.message)
                });
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    const handleWorkRemoved = () => loadWorks()
    const handleWorkEdit = () => loadWorks()

    return (
        <section className='flex flex-col justify-center gap-6 px-2 py-4'>
            {works.map(work => (
                <Work
                    key={work.id}
                    work={work}
                    user={user}
                    onWorkRemoved={handleWorkRemoved}
                    onWorkEdit={handleWorkEdit}
                    onUserProfileClick={onUserProfileClick}
                />
            ))}
        </section>
    )
}

export default Works
