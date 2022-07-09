import React, { useState } from 'react'
import api from "../api"

const User = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user._id !== userId))
    }
    const renderPhrase = (number) => {
        const word = number >= 2 && number <= 4 ? 'человека' : 'человек'
        const phrase = number > 0 ? `${number} ${word} тусанёт сегодня с тобой` : 'Никто с тобой не тусанёт'
        const classNames = `badge bg-${number > 0 ? 'primary':'danger'}`
        return <h1><span className={classNames}>{ phrase }</span></h1>
    }
    const Badge = ({ props }) => {
        const { name, color } = props
        const classNames = `badge bg-${color}`
        return <span className={classNames}>{name}</span>
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
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => <TableRow key={user._id} user={user}/>)}
            </tbody>
        </table>
    }
    const TableRow = ({ user }) => {
        const {_id: id, name, qualities, profession, completedMeetings, rate} = user
        return (
            <tr>
                <td>{name}</td>
                <td>{qualities.map(quality => <Badge key={quality._id} props={quality} />)}</td>
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate}/5</td>
                <td><button onClick={() => handleDelete(id)} className="btn btn-danger">Delete</button></td>
            </tr>
        )
    }

    return (
        <>
            {renderPhrase(users.length)}
            {users.length > 0 && <Table/>}
        </>
    )
}

export default User
