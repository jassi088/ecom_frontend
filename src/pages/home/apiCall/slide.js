import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;


export const getAllImages = async () => {
    return await axios.get(`${apiURL}/api/customize/get-slide-image`);
};