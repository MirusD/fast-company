import React from 'react'
import PropTypes from 'prop-types'
import UserCard from '../../ui/userCard'
import QualitiesCard from '../../ui/qualitiesCard'
import MeetingsCard from '../../ui/meetingsCard'
import Comments from '../../ui/comments'
import { CommentsProvider } from '../../../hooks/useComments'
import { useSelector } from 'react-redux'
import { getUsersLoadingStatus, getUserById } from '../../../store/users'

const UserPage = ({ userId }) => {
    const isLoading = useSelector(getUsersLoadingStatus())
    const user = useSelector(getUserById(userId))
    if (isLoading || !user) return <h1>Loading</h1>
    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <UserCard user={user} />
                    <QualitiesCard data={user.qualities} />
                    <MeetingsCard value={user.competedMeetings} />
                </div>
                <div className="col-md-8">
                    <CommentsProvider>
                        <Comments />
                    </CommentsProvider>
                </div>
            </div>
        </div>
    )
}

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
}

export default UserPage
