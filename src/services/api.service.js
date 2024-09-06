import axios from "./axios.custommine";
const creatApi = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    return axios.post(URL_BACKEND, data);
}
const uppDateapi = (_id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName: fullName,
        _id: _id,
        phone: phone
    }
    return axios.put(URL_BACKEND, data);
}
const fecthAlluserapi = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}
const Deleteapi = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`;
    return axios.delete(URL_BACKEND)
}

const Updateuserimage = (avatar, _id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        avatar: avatar,
        _id: _id,
        fullName: fullName,
        phone: phone
    }
    return axios.put(URL_BACKEND, data);
}
const handleupdatefile = (file, folder) => {
    const URL_BACKEND = `/api/v1/file/upload`;
    let config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data"
        }
    }
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file)
    return axios.post(URL_BACKEND, bodyFormData, config)
}
const registeruserApi = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user/register";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    return axios.post(URL_BACKEND, data);
}
const loginAPI = (email, password) => {
    const URL_BACKEND = "/api/v1/auth/login";
    const data = {
        username: email,
        password: password,
        delay: 2000
    }
    return axios.post(URL_BACKEND, data);
}
const F5APIinfo = () => {
    const URL_BACKEND = "/api/v1/auth/account";
    return axios.get(URL_BACKEND);
}
const LogoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout";
    return axios.post(URL_BACKEND);
}
const DatabookAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}
const creatbookApi = (thumbnail, author, mainText, price, quantity, category) => {
    const URL_BACKEND = "/api/v1/book";
    const data = {
        thumbnail: thumbnail,
        author: author,
        mainText: mainText,
        price: price,
        quantity: quantity,
        category: category
    }
    return axios.post(URL_BACKEND, data);
}
const UppdateBookAPI = (_id, thumbnail, author, mainText, price, quantity, category) => {
    const URL_BACKEND = "/api/v1/book";
    const data = {
        _id: _id,
        thumbnail: thumbnail,
        author: author,
        mainText: mainText,
        price: price,
        quantity: quantity,
        category: category
    }
    return axios.put(URL_BACKEND, data);
}
const DeleteBook = (id) => {
    const URL_BACKEND = `/api/v1/book/${id}`;
    return axios.delete(URL_BACKEND)
}

export {
    creatApi, uppDateapi, fecthAlluserapi, Deleteapi, handleupdatefile, Updateuserimage, registeruserApi, loginAPI, F5APIinfo, LogoutAPI, DatabookAPI, creatbookApi, UppdateBookAPI, DeleteBook
}
