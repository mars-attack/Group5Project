import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api/user'
})

// Production
// const api = axios.create({
//     baseURL: 'http://<herokuurl>/api/user'
// })

const registerUser = (user) => api.post(`/register`, user)
const login = (email, password) => api.post(`/login`, {email: email, password: password})
const updateUser = (user) => api.put(`/update`, user, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("id_token"),
    },
  })

const getUser = (id) => api.get(`/${id}`,{
    headers: {
        Authorization: "Bearer " + localStorage.getItem("id_token"),
    },
    });

const getAllUsers = () =>
  api.get(`/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("id_token"),
    },
  });
const getAllNurses = () =>
  api.get(`/nurses`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("id_token"),
    },
  });
const getAllPatients = () =>
  api.get(`/patients`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("id_token"),
    },
  });
const apis = {
    getAllUsers,
    getAllNurses,
    getAllPatients,
    registerUser,
    login,
    updateUser,
    getUser

}
export default apis;