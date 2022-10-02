import React from 'react'
import { useParams } from 'react-router-dom'
import UsersListPage from '../components/page/usersListPage'
import UserPage from '../components/page/userPage'
import UserEditPage from '../components/page/userEditPage'
import UserProvider from '../hooks/useUsers'

const Users = () => {
    const params = useParams()
    const { userId, userEdit } = params
    return (
        <UserProvider>
            {userId ? (
                <>
                    {userEdit === 'edit' ? (
                        <UserEditPage userId={userId} />
                    ) : (
                        <UserPage userId={userId} />
                    )}
                </>
            ) : (
                <UsersListPage />
            )}
        </UserProvider>
    )
}

export default Users
