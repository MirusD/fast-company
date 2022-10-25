import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import UsersListPage from '../components/page/usersListPage'
import UserPage from '../components/page/userPage'
import UserEditPage from '../components/page/userEditPage'
import UserProvider from '../hooks/useUsers'
import { useAuth } from '../hooks/useAuth'

const Users = () => {
    const params = useParams()
    const { userId, userEdit } = params
    const { currentUser } = useAuth()
    return (
        <UserProvider>
            {userId ? (
                userEdit ? (
                    userId === currentUser._id ? (
                        <UserEditPage userId={userId} />
                    ) : (
                        <Redirect to={`/users/${currentUser._id}/edit`} />
                    )
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </UserProvider>
    )
}

export default Users
