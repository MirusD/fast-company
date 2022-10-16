import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Bookmark from '../common/bookmark'
import Qualities from './qualities'
import Table from '../common/table/table'
import Profession from './profession'

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onChangeBookmark,
    ...rest
}) => {
    const columns = {
        name: {
            path: 'name',
            name: 'Имя',
            component: (user) => (
                <Link to={`users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: 'Качествa',
            component: (user) => <Qualities qualities={user.qualities} />
        },
        professions: {
            name: 'Профессия',
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: 'competedMeetings',
            name: 'Встретился, раз'
        },
        rate: { path: 'rate', name: 'Оценка' },
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: (user) => (
                <Bookmark
                    status={false}
                    onClick={() => onChangeBookmark(user._id)}
                />
            )
        }
    }
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    )
}

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onChangeBookmark: PropTypes.func.isRequired
}

export default UsersTable
