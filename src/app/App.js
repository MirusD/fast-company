import React, { useState } from 'react'
import api from './api'
import Users from './components/users'
import SearchStatus from './components/searchStatus'

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

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
            <SearchStatus number={users.length} />
            {users.length > 0 && (
                <Users
                    onDeleteUser={handleDelete}
                    onChangeBookmark={handleChangeBookmark}
                    users={users}
                />
            )}
        </>
    )
}

export default App
