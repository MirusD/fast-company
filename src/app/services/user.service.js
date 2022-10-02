import httpServices from './http.services'

const userEndpoint = 'user/'

const userService = {
    get: async () => {
        const { data } = await httpServices.get(userEndpoint)
        return data
    }
}

export default userService
