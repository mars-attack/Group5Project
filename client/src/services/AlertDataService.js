import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api/alert'
    // baseURL: 'http://<herokuurl>/api/vitals'
})


const getAllAlerts= () => api.get(`/`, {
    headers: {
    Authorization: "Bearer " + localStorage.getItem("id_token"),
}})
const createAlert= (patientId) => api.post(`/add`, {patient: patientId}, {
    headers: {
    Authorization: "Bearer " + localStorage.getItem("id_token"),
}})
const checkPatient= (alertId, nurseId) => api.put(`/check/${alertId}`, {nurseId: nurseId}, {
    headers: {
    Authorization: "Bearer " + localStorage.getItem("id_token"),
}})
const deleteAlert= (alertId) => api.delete(`/delete/${alertId}`, {
    headers: {
    Authorization: "Bearer " + localStorage.getItem("id_token"),
}})

const apis = {
    getAllAlerts,
    createAlert,
    checkPatient,
    deleteAlert
}
export default apis;