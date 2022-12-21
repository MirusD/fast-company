import httpServices from './http.services'

const qualityEndpoint = 'quality/'

const qualityService = {
    fetchAll: async () => {
        const { data } = await httpServices.get(qualityEndpoint)
        return data
    }
}

export default qualityService
