import Cookies from "js-cookie"
import axios from "axios"

export const apiAuth = axios.create({
  baseURL: "http://localhost:4000/librarians",
})

export const apiUsers = axios.create({
  baseURL: "http://localhost:4000/users",
})

export const apiLibrarians = axios.create({
  baseURL: "http://localhost:4000/librarians",
})

export const apiBooks = axios.create({
  baseURL: "http://localhost:4000/books",
})

const apis = [apiAuth, apiUsers, apiLibrarians, apiBooks]

apis.forEach((api)=> {
  api.interceptors.request.use((config)=> {
    const token = Cookies.get("token")

    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })
})