import httpServices from './http.services'

const professionEndpoint = 'profession/'

const professionService = {
    fetchAll: async () => {
        const { data } = await httpServices.get(professionEndpoint)
        return data
    }
}

export default professionService
