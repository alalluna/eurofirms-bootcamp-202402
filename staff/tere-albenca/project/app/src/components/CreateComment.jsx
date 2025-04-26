import React, { useState } from 'react'
import logic from '../logic'

function CreateComment({ workId, onCommentCreated }) {
    const [commentText, setCommentText] = useState('')

    const handleCreateComment = async () => {
        try {
            await logic.createComment(workId, commentText)
            setCommentText('')
            onCommentCreated() // Llama a la función de refresco
        } catch (error) {
            console.error(error)
            let feedback = error.message || 'Sorry, there was an error. Please try again later.'
            alert(feedback)
        }
    }

    return (
        <div className="w-full flex flex-col mt-2 space-y-2">
            <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment"
                className="px-2 py-1 border rounded-md"
            />
            <button onClick={handleCreateComment} className="px-2 py-1 bg-blue-500 text-white rounded-md">Add Comment</button>
        </div>
    )
}

export default CreateComment

