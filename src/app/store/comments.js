import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.service'
import { nanoid } from 'nanoid'
import localStorageService from '../services/localStorage.service'

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            )
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload)
        }
    }
})

const { reducer: commentsReducer, actions } = commentsSlice
const {
    commentsRequested,
    commentsReceved,
    commentsRequestFiled,
    commentRemoved,
    commentCreated
} = actions

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested())
    try {
        const { content } = await commentService.getComments(userId)
        dispatch(commentsReceved(content))
    } catch (error) {
        dispatch(commentsRequestFiled(error.message))
    }
}

export const createComment = (data, userId) => async (dispatch) => {
    const comment = {
        ...data,
        _id: nanoid(),
        pageId: userId,
        create_at: Date.now(),
        userId: localStorageService.getUserId()
    }
    try {
        const { content } = await commentService.createComment(comment)
        dispatch(commentCreated(content))
    } catch (error) {
        dispatch(commentsRequestFiled(error.message))
    }
}

export const removeComment = (commentId) => async (dispatch) => {
    try {
        const { content } = await commentService.removeComments(commentId)
        if (content === null) {
            dispatch(commentRemoved(commentId))
        }
    } catch (error) {
        dispatch(commentsRequestFiled(error.message))
    }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading

export default commentsReducer
