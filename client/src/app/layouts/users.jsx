import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import UsersListPage from '../components/page/usersListPage'
import UserPage from '../components/page/userPage'
import UserEditPage from '../components/page/userEditPage'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../store/users'
import UsersLoader from '../components/ui/hoc/usersLoader'

const Users = () => {
    const params = useParams()
    const { userId, userEdit } = params
    const currentUserId = useSelector(getCurrentUser())

    return (
        <UsersLoader>
            {userId ? (
                userEdit ? (
                    userId === currentUserId ? (
                        <UserEditPage userId={userId} />
                    ) : (
                        <Redirect to={`/users/${currentUserId}/edit`} />
                    )
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </UsersLoader>
    )
}

export default Users
