async function getUserDetails(userId) {
    const response = await fetch(`/api/users/${userId}`)
    if (!response.ok) {
        throw new Error('Error fetching user details')
    }
    return await response.json()
}

export default getUserDetails

