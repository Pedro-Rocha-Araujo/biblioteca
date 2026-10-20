import Cookies from "js-cookie"
import axios from "axios"

export const apiAuth = axios.create({
  baseURL: "http://localhost:4000/librarians",
})

export const apiUsers = axios.create({
  baseURL: "http://localhost:4000/users",
})

const apis = [apiAuth, apiUsers]

apis.forEach((api)=> {
  api.interceptors.request.use((config)=> {
    const token = Cookies.get("token")

    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })
})