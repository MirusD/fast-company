import { createSlice, createAction } from '@reduxjs/toolkit'
import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import history from '../utils/history'
import generateAuthError from '../utils/generateAuthError'

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      }

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true
        },
        usersReceved: (state, action) => {
            state.entities = action.payload
            state.dataLoaded = true
            state.isLoading = false
        },
        usersRequestFiled: (state, action) => {
            console.log(action)
            state.error = action.payload.message
            state.isLoading = false
        },
        authRequesteSuccess: (state, action) => {
            state.auth = action.payload
            state.isLoggedIn = true
        },
        authRequesteFaild: (state, action) => {
            state.error = action.payload
            state.isLoggedIn = false
            state.dataLoaded = false
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = []
            }
            state.entities.push(action.payload)
        },
        userLoggedOut: (state) => {
            state.entities = null
            state.auth = null
            state.isLoggedIn = false
            state.dataLoaded = false
        },
        userUpdated: (state, action) => {
            const updateUserIndex = state.entities.findIndex(
                (u) => u._id === action.payload._id
            )
            state.entities[updateUserIndex] = action.payload
        },
        userUpdateFailed: (state, action) => {
            state.error = action.payload
        },
        authRequested: (state) => {
            state.error = null
        }
    }
})

const { reducer: usersReducer, actions } = usersSlice
const {
    usersRequested,
    usersReceved,
    usersRequestFiled,
    authRequesteSuccess,
    authRequesteFaild,
    userLoggedOut,
    userUpdated,
    userUpdateFailed,
    authRequested
} = actions

const userUpdateRequested = createAction('users/userUpdate')

export const login =
    ({ payload, redirect }) =>
    async (dispatch) => {
        const { email, password } = payload
        dispatch(authRequested())
        try {
            const data = await authService.login({ email, password })
            localStorageService.setTokens(data)
            dispatch(authRequesteSuccess({ userId: data.userId }))
            history.push(redirect)
        } catch (error) {
            const { code, message } = error.response.data.error
            if (code === 400) {
                const errorMessage = generateAuthError(message)
                dispatch(authRequesteFaild(errorMessage))
            } else {
                dispatch(authRequesteFaild(error.message))
            }
        }
    }

export const signUp = (payload) =>
    async (dispatch) => {
        dispatch(authRequested)
        try {
            const data = await authService.register(payload)
            localStorageService.setTokens(data)
            dispatch(authRequesteSuccess({ userId: data.userId }))
            history.push('/users')
        } catch (error) {
            dispatch(authRequesteFaild(error.message))
        }
    }

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData()
    dispatch(userLoggedOut())
    history.push('/')
}

export const updateUser = (payload, redirect) => async (dispatch) => {
    dispatch(userUpdateRequested())
    try {
        const { content } = await userService.update(payload)
        dispatch(userUpdated(content))
        history.push(redirect)
    } catch (error) {
        dispatch(userUpdateFailed(error.message))
    }
}

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested())
    try {
        const { content } = await userService.get()
        dispatch(usersReceved(content))
    } catch (error) {
        // if (error.request.status === 401) {
        //     localStorageService.removeAuthData()
        //     dispatch(userLoggedOut())
        //     history.push('/')
        // }
        dispatch(usersRequestFiled(error.message))
    }
}

export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === userId)
    }
}

export const getCurrentUserData = () => (state) =>
    state.users.entities
        ? state.users.entities.find((u) => u._id === state.users.auth.userId)
        : null
export const getUsersList = () => (state) => state.users.entities
export const getDataStatus = () => (state) => state.users.dataLoaded
export const getUsersLoadingStatus = () => (state) =>
    state.professions.isLoading
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn
export const getCurrentUser = () => (state) => state.users.auth.userId
export const getAuthErrors = () => (state) => state.users.error

export default usersReducer
