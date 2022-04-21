import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api/ml'
    // baseURL: 'http://<heroku>/api/vitals'
})

const predictHeartDisease= (vitals) => api.post(`/`, vitals, {
    headers: {
    Authorization: "Bearer " + localStorage.getItem("id_token"),
}})

const apis = {
    predictHeartDisease

}
export default apis;