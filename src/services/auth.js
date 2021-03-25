import http from "./http";
import { toast } from "react-toastify";

class AuthService {
    login(payload) {
        return http.post("login/", payload).then((res) => {
            
            let user = res.data
            let token = res.data.access
            localStorage.setItem("user", JSON.stringify({...user, token}))
            
            toast("登录成功")
            return {...user, token}
        }).catch((error) => {
            toast.error(error)
        })
    }

    signup(payload) {
        return http.post("signup/", payload).then(() => {
            toast("注册成功，请登录")
        }).catch((error) => {
            toast.error(error)
        })
    }
}

export default new AuthService()