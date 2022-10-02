import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import api from '../../../api'

import UserCard from '../../ui/userCard'
import QualitiesCard from '../../ui/qualitiesCard'
import MeetingsCard from '../../ui/meetingsCard'
import Comments from '../../ui/comments'

const UserPage = ({ userId }) => {
    const [user, setUser] = useState()
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        setFetching(true)
        api.users
            .getById(userId)
            .then((data) => setUser(data))
            .finally(() => setFetching(false))
    }, [])

    if (fetching || !user) return <h1>Loading</h1>
    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <UserCard user={user} />
                    <QualitiesCard data={user.qualities} />
                    <MeetingsCard value={user.completedMeetings} />
                </div>
                <div className="col-md-8">
                    <Comments />
                </div>
            </div>
        </div>
    )
}

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
}

export default UserPage