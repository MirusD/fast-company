import httpServices from './http.services'
const commentEndpoint = 'comment/'

const commentService = {
    createComment: async (payload) => {
        const { data } = await httpServices.post(commentEndpoint, payload)
        console.log(data)
        return data
    },
    getComments: async (pageId) => {
        const { data } = await httpServices.get(commentEndpoint, {
            params: {
                orderBy: 'pageId',
                equalTo: `${pageId}`
            }
        })
        return data
    },
    removeComment: async (commentId) => {
        const { data } = await httpServices.delete(commentEndpoint + commentId)
        return data
    }
}

export default commentService
