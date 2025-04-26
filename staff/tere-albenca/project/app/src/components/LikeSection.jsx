import { useState, useEffect } from 'react'
import logic from '../logic'
import GiveLikeWorkButton from './GiveLikeWorkButton'

export default function LikeSection({ work, user, onLikeUpdated }) {
    const [isLiked, setIsLiked] = useState(false)
    const [likers, setLikers] = useState(work.likes || [])
    const [likersDetails, setLikersDetails] = useState([])
    const [isHovered, setIsHovered] = useState(false)

    // Actualiza likers cuando cambie work
    useEffect(() => {
        setLikers(work.likes || [])
    }, [work])

    // Verifica si el usuario ha dado like
    useEffect(() => {
        if (user?.id && Array.isArray(likers)) {
            const liked = likers.some(liker => liker.id === user.id)
            setIsLiked(liked)
        }
    }, [user?.id, likers])

    // Carga detalles de los usuarios que dieron like
    useEffect(() => {
        const fetchLikerDetails = async () => {
            if (!likers || likers.length === 0) {
                setLikersDetails([])
                return
            }

            try {
                const results = await Promise.all(
                    likers.map(liker =>
                        fetch(`${import.meta.env.VITE_API_URL}/users/${liker.id}`, {
                            headers: {
                                'Authorization': `Bearer ${sessionStorage.token}`
                            }
                        }).then(res => res.json())
                    )
                )

                setLikersDetails(results)
            } catch (error) {
                console.error('Error al cargar usuarios que dieron like:', error)
            }
        }

        fetchLikerDetails()
    }, [likers])

    const handleToggleLike = async () => {
        try {
            await logic.giveLikeWork(work.id)

            const newIsLiked = !isLiked
            const updatedLikers = newIsLiked
                ? [...likers, { id: user.id, name: user.name }]
                : likers.filter(liker => liker.id !== user.id)

            setIsLiked(newIsLiked)
            setLikers(updatedLikers)

            if (onLikeUpdated) {
                onLikeUpdated({
                    ...work,
                    likes: updatedLikers
                })
            }
        } catch (error) {
            console.error('Error al dar/quitar like:', error)
        }
    }

    if (!work || !user) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ display: 'inline-block', position: 'relative' }}
            >
                <GiveLikeWorkButton isLiked={isLiked} onClick={handleToggleLike} />
                <span>{likers.length} likes</span>

                {isHovered && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        padding: '10px',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                        zIndex: 10
                    }}>
                        {likersDetails.map(liker => (
                            <div key={liker.id}> {liker.name} </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
