import { api } from "../../axios"

export const register=async(data)=>{
    return await api.post("auth/register", data)
}
export const login=async(data)=>{
    return await api.post("auth/login", data)
}