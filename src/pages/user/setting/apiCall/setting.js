import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;


export const updatePassword = async (data) => {
    return await axios.post(`${apiURL}/api/user/change-password`, data);
}