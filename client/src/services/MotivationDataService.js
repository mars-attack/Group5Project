import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api/motivation'
    // baseURL: 'http://<heroku>/api/motivation'
})

const getAll= () => api.get(`/`, {
    headers: {
    Authorization: "Bearer " + localStorage.getItem("id_token"),
}})
const addTip= (tip) => api.post(`/add`, tip,  {
    headers: {
    Authorization: "Bearer " + localStorage.getItem("id_token"),
}})
const getTipById= (id) => api.get(`/${id}`, {
    headers: {
    Authorization: "Bearer " + localStorage.getItem("id_token"),
}})
const editTip= (tip) => api.put(`/update/${tip._id}`, tip, {
    headers: {
    Authorization: "Bearer " + localStorage.getItem("id_token"),
}})
const deleteMotivation = (id) => api.delete(`/delete/${id}`, {
    headers: {
    Authorization: "Bearer " + localStorage.getItem("id_token"),
}})

const apis = {
    getAll,
    deleteMotivation,
    getTipById,
    editTip,
    addTip
}
export default apis;