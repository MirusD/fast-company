import React, { useState } from 'react'
import api from '../api'
import User from './user'
import SearchStatus from "./searchStatus";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user._id !== userId))
    }
    const handleChangeBookmark = (id) => {
        setUsers(prevState => prevState.map(({ bookmark, ...state}) =>
                ({...state, bookmark: state._id === id ? !bookmark : bookmark})))
    }
    const Table = () => {
        return <table className="table">
            <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Избранное</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {users.map(user =>
                        <User
                            key={user._id}
                            onDeleteUser={handleDelete}
                            onChangeBookmark={handleChangeBookmark}
                            {...user}/>
                    )
                }
            </tbody>
        </table>
    }

    return (
        <>
            <SearchStatus number={users.length}/>
            {users.length > 0 && <Table/>}
        </>
    )
}

export default Users
