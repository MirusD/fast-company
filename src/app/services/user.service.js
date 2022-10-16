import httpServices from './http.services'
import localStorageService from './localStorage.service'

const userEndpoint = 'user/'

const userService = {
    get: async () => {
        const { data } = await httpServices.get(userEndpoint)
        return data
    },
    create: async (payload) => {
        const { data } = await httpServices.put(
            userEndpoint + payload._id,
            payload
        )
        return data
    },
    getCurrentUser: async () => {
        const { data } = await httpServices.get(
            userEndpoint + localStorageService.getUserId()
        )
        return data
    },
    update: async (payload) => {
        const { data } = await httpServices.put(
            userEndpoint + payload._id,
            payload
        )
        return data
    }
}

export default userService
