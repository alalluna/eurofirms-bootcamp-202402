function logoutUser() {
    delete sessionStorage.token
}

export default logoutUser