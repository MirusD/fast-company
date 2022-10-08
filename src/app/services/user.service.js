import httpServices from './http.services'

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
    }
}

export default userService
