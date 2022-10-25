import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import userService from '../services/user.service'
import { useAuth } from './useAuth'

const UserContext = React.createContext()

export const useUser = () => {
    return useContext(UserContext)
}

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState()
    const { currentUser } = useAuth()
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    useEffect(() => {
        if (!isLoading) {
            const newUsers = [...users]
            const indexUser = newUsers.findIndex(
                (u) => u._id === currentUser._id
            )
            newUsers[indexUser] = currentUser
            setUsers(newUsers)
        }
    }, [currentUser])

    async function getUsers() {
        try {
            const { content } = await userService.get()
            setUsers(content)
            setLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }

    function getUserById(userId) {
        return users.find((u) => u._id === userId)
    }

    return (
        <UserContext.Provider value={{ users, getUserById, isLoading }}>
            {!isLoading ? children : 'loading...'}
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default UserProvider
