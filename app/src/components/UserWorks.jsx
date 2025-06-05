import { useState, useEffect } from 'react'
import logic from '../logic'
import Work from './Work'
import Comments from './Comments'
import { errors } from 'com'

const { MatchError, ContentError } = errors

function UserWorks({ targetUserId, refreshStamp, user, onProfileClick, isProfilePage }) {
    console.log('refreshStamp', refreshStamp)
    console.log('targetUserId', targetUserId)

    const [works, setWorks] = useState([])
    const [comments, setComments] = useState([])

    const handleProfileClick = (userTargetId) => {
        onProfileClick(userTargetId)
    }

    const refreshWorks = async () => {
        try {
            const works = await logic.retrieveUsersWorks(targetUserId)
            const commentsArray = await Promise.all(works.map(work => logic.retrieveComments(work.id)))
            setWorks(works)
            setComments(commentsArray)
        } catch (error) {
            console.error(error)

            let feedback = error.message

            if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                feedback = `${feedback}, please correct it`

            else if (error instanceof MatchError)
                feedback = `${feedback}, please verify credentials`

            else
                feedback = 'sorry, there was an error, please try again later'

            alert(feedback)
        }
    }

    useEffect(() => {
        refreshWorks()
    }, [refreshStamp, targetUserId])

    const handleWorkRemoved = () => refreshWorks()
    const handleWorkEdit = () => refreshWorks()

    const handleCommentsChanged = () => refreshWorks() // Función para refrescar comentarios

    return (
        <section className='flex flex-col gap-6 px-2 py-14'>
            {works.map((work, index) => (
                <div key={work.id}>
                    <Work
                        work={work}
                        user={user}
                        onWorkRemoved={handleWorkRemoved}
                        onWorkEdit={handleWorkEdit}
                        onProfileClick={() => handleProfileClick(work.author.id)}
                        userRole={user.role}
                        isProfilePage={isProfilePage}
                    />
                    <Comments
                        workId={work.id}
                        comments={comments[index]}
                        user={user}
                        onCommentCreated={refreshWorks} // Actualiza los trabajos 
                        onCommentsChanged={handleCommentsChanged} // Actualiza los comentarios
                    />
                </div>
            ))}
        </section>
    )
}

export default UserWorks
