import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api/vitals'
})

// Production
// const api = axios.create({
//     baseURL: 'http://<herokuurl>/api/vitals'
// })

const getAllVitals= () => api.get(`/`, {
    headers: {
    Authorization: "Bearer " + localStorage.getItem("id_token"),
  }})
const getAllVitalsByPatient = (patientId) => api.get(`/patient/${patientId}`, {
    headers: {
    Authorization: "Bearer " + localStorage.getItem("id_token"),
  }})
const deleteVitals = (vitalsId) => api.delete(`/delete/${vitalsId}`, {
    headers: {
    Authorization: "Bearer " + localStorage.getItem("id_token"),
  }})

const addVitals = (vitals) => api.post(`/add`, vitals, {
    headers: {
    Authorization: "Bearer " + localStorage.getItem("id_token"),
  }})
const updateVitals = (vitals) => api.put(`/update/${vitals._id}`, vitals, {
    headers: {
    Authorization: "Bearer " + localStorage.getItem("id_token"),
  }})

const apis = {
    getAllVitals,
    getAllVitalsByPatient,
    deleteVitals,
    addVitals,
    updateVitals

}
export default apis;