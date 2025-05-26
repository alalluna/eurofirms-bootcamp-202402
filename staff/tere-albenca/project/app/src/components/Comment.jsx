import React, { useState } from 'react'

function Comment({ comment, user, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(comment.text)

    const handleSave = () => {
        onEdit(comment.id, editText)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setEditText(comment.text)
    }

    return (
        <div className='comment p-2 flex justify-between items-center bg-[whitesmoke] rounded-md mb-2'>
            {isEditing ? (
                <input
                    type='text'
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    className='flex-1 mr-2 px-2 py-1 border rounded-md'
                />
            ) : (
                <p className='flex-1 mr-2 font-normal'>{comment.text}</p>
            )}
            {user && user.role === 'teacher' && ( 
                <div className='flex space-x-2'>
                    {isEditing ? (
                        <>
                            <button className='px-2 py-1 bg-green-500 text-white rounded-md' onClick={handleSave}>Save</button>
                            <button className='px-2 py-1 bg-gray-500 text-white rounded-md' onClick={handleCancel}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button className='px-2 py-1 bg-yellow-500 text-white rounded-md' onClick={() => setIsEditing(true)}>Edit</button>
                            <button className='px-2 py-1 bg-red-500 text-white rounded-md' onClick={() => onDelete(comment.id)}>Delete</button>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default Comment
