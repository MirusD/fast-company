import React from 'react'
import Quality from './qualities/quality'
import Bookmark from '../common/bookmark'
import PropTypes from 'prop-types'

const User = ({
    _id: id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmark,
    onDeleteUser,
    onChangeBookmark
}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map(({ _id, ...quality }) => (
                    <Quality key={_id} {...quality} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td>
                <Bookmark
                    status={bookmark}
                    onClick={() => onChangeBookmark(id)}
                />
            </td>
            <td>
                <button
                    onClick={() => onDeleteUser(id)}
                    className="btn btn-danger"
                >
                    Удалить
                </button>
            </td>
        </tr>
    )
}

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onDeleteUser: PropTypes.func.isRequired,
    onChangeBookmark: PropTypes.func.isRequired
}

export default User
