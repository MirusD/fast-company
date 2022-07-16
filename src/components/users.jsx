import React from 'react'
import User from './user'
import SearchStatus from "./searchStatus"

const Users = ({users, onDeleterUser, onChangeBookmark}) => {
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
                            onDeleteUser={onDeleterUser}
                            onChangeBookmark={onChangeBookmark}
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
