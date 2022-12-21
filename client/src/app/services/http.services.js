import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'
import localStorageService, { accessTokenIsExpired } from './localStorage.service'
import authService from './auth.service'

const http = axios.create({
    baseURL: configFile.apiEndpoint
})

http.interceptors.request.use(
    async function (config) {
        const isExpired = accessTokenIsExpired()

        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url)
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + '.json'
            if (isExpired) {
                const data = authService.refresh()
                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                })
            }
            const accessToken = localStorageService.getAccessToken()
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken }
            }
        } else {
            console.log('accessTokenIsExpired: ', isExpired)
            if (isExpired) {
                const data = await authService.refresh()
                localStorageService.setTokens(data)
            }
            const accessToken = localStorageService.getAccessToken()
            if (accessToken) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${accessToken}`
                }
            }
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

function transformData(data) {
    return data && !data._id
        ? Object.keys(data).map((key) => ({
              ...data[key]
          }))
        : data
}

http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = { content: transformData(res.data) }
        }
        res.data = { content: res.data }
        return res
    },
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
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch
}

export default httpServices