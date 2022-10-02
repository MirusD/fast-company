import axios from 'axios'
import { toast } from 'react-toastify'
import config from '../config.json'

axios.defaults.baseURL = config.apiEndpoint
axios.interceptors.response.use(
    (res) => res,
    function (error) {
        if (
            !(
                error.response &&
                error.response.status >= 400 &&
                error.response.status < 500
            )
        ) {
            console.log(error)
            toast.error('Somthing was wrong. Try it later')
        }
        return Promise.reject(error)
    }
)

const httpServices = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}

export default httpServices
