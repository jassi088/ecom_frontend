import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;


export const getUserDetails = async (uId) => {
    return await axios.post(`${apiURL}/api/user/single-user`, { uId });
}

export const updateInformation = async (data) => {
    return await axios.post(`${apiURL}/api/user/edit-user`, data );
}