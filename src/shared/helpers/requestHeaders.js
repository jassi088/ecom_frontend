const BearerToken = () => {
    return localStorage.getItem('jwt')
        ? JSON.parse(localStorage.getItem('jwt')).token
        : false;
};


const Headers = () => {
    return {
        headers: {
            token: `Bearer ${BearerToken()}`
        }
    }
}

export default Headers;