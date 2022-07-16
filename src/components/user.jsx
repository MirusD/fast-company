import React, { useState } from 'react'
import api from "../api"

const User = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user._id !== userId))
    }
    const Badge = ({ name, color }) => {
        const classNames = `badge bg-${color}`
        return <span className={classNames}>{name}</span>
    }
    const renderPhrase = (number) => {
        const word = number >= 2 && number <= 4 ? 'человека' : 'человек'
        const phrase = number > 0 ? `${number} ${word} Tусанёт сегодня с тобой` : 'Никто с тобой не тусанёт'
        const color = number > 0 ? 'primary':'danger'
        return <h2><Badge name={phrase} color={color}/></h2>
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
                {users.map(user => <TableRow key={user._id} {...user}/>)}
            </tbody>
        </table>
    }
    const TableRow = ({_id: id, name, qualities, profession, completedMeetings, rate}) => {
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
