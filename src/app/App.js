import React, { useState, useEffect } from 'react'
import api from './api'
import Users from './components/users'

const App = () => {
    const [users, setUsers] = useState([])
    const [isFetching, setFetching] = useState(false)

    useEffect(() => {
        setFetching(true)
        api.users
            .fetchAll()
            .then((data) => setUsers(data))
            .finally(() => setFetching(false))
    }, [])

    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== userId))
    }
    const handleChangeBookmark = (id) => {
        setUsers((prevState) =>
            prevState.map(({ bookmark, ...state }) => ({
                ...state,
                bookmark: state._id === id ? !bookmark : bookmark
            }))
        )
    }

    return (
        <>
            {users.length > 0 && (
                <Users
                    onDeleteUser={handleDelete}
                    onChangeBookmark={handleChangeBookmark}
                    users={users}
                />
            )}
            {isFetching && <h1 className="text-center mt-5">Загрузка...</h1>}
        </>
    )
}

export default App
