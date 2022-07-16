import React from 'react'
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = ({_id: id, name, qualities, profession, completedMeetings, rate, bookmark, onDeleteUser, onChangeBookmark}) => {
    return (
        <tr>
            <td>{name}</td>
            <td><Qualitie qualities={qualities}/></td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td><Bookmark bookmark={bookmark} onClick={() => onChangeBookmark(id)}/></td>
            <td><button onClick={() => onDeleteUser(id)} className="btn btn-danger">Удалить</button></td>
        </tr>
    )
}

export default User
