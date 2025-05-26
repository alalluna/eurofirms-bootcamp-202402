import React from 'react'
import CreateComment from './CreateComment'
import Comment from './Comment'
import logic from '../logic'
import Htwo from './Htwo'

function Comments({ workId, comments, user, onCommentCreated, onCommentsChanged }) {
    const handleCommentCreated = () => {
        onCommentCreated()
    }

    const handleUpdateComment = async (commentId, newText) => {
        try {
            await logic.updateComment(workId, commentId, newText)
            onCommentsChanged() // Refresca comments
        } catch (error) {
            console.error(error)
            let feedback = error.message || 'Sorry, there was an error. Please try again later.'
            alert(feedback)
        }
    }

    const handleRemoveComment = async (commentId) => {
        try {
            if (confirm('Delete comment?')) {
                await logic.removeComment(workId, commentId)
                onCommentsChanged()
            }
        } catch (error) {
            console.error(error)
            let feedback = error.message || 'Sorry, there was an error. Please try again later.'
            alert(feedback)
        }
    }

    return (
        <div>
            {comments.length > 0 && <Htwo>Comments</Htwo>}
            {/* <h2>Comments</h2> */}
            {comments.map((comment) => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    user={user}
                    onEdit={handleUpdateComment}
                    onDelete={handleRemoveComment}
                />
            ))}
            {user && user.role === 'teacher' && (
                <CreateComment workId={workId} onCommentCreated={handleCommentCreated} />
            )}
        </div>
    )
}

export default Comments

