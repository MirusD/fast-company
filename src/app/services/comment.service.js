import httpServices from './http.services'
const commentEndpoint = 'comment/'

const commentService = {
    createComment: async (payload) => {
        const { data } = await httpServices.put(
            commentEndpoint + payload._id,
            payload
        )
        return data
    },
    getComments: async (pageId) => {
        const { data } = await httpServices.get(commentEndpoint, {
            params: {
                orderBy: '"pageId"',
                equalTo: `"${pageId}"`
            }
        })
        return data
    },
    removeComments: async (commentId) => {
        const { data } = await httpServices.delete(commentEndpoint + commentId)
        return data
    }
}

export default commentService
