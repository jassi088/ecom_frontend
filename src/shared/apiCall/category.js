import axios from "axios";
import Headers from "../helpers/requestHeaders";

const apiURL = process.env.REACT_APP_API_URL;

export const createCategory = async ({ cName, cDescription, cImage, cStatus }) => {
    const formData = new FormData();
    formData.append('cImage', cImage);
    formData.append('cName', cName);
    formData.append('cDescription', cDescription);
    formData.append('cStatus', cStatus);
    return await axios.post(`${apiURL}/api/category/add-category`, formData, Headers());
};



export const getAllCategory = async () => {
    return await axios.get(`${apiURL}/api/category/all-category`, Headers());
}


export const deleteCategory = async (cId) => {
    return await axios.post(`${apiURL}/api/category/delete-category`, { cId }, Headers());
};


export const editCategoryCall = async (cId, des, status) => {

    let data = {
        cId: cId,
        cDescription: des,
        cStatus: status,
    }

    return await axios.post(`${apiURL}/api/category/edit-category`, data, Headers());
}