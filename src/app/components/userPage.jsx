import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import api from '../api'

import QualitiesList from './qualitiesList'

const UserPage = ({ userId }) => {
    const [userData, setUserData] = useState([])
    const [fetching, setFetching] = useState(true)
    const history = useHistory()

    useEffect(() => {
        api.users
            .getById(userId)
            .then((data) => setUserData(data))
            .finally(() => setFetching(false))
    }, [])

    if (fetching || !userData) return <h1>Loading</h1>
    return (
        <>
            <h1>{userData.name}</h1>
            <h2>Профессия: {userData.profession.name}</h2>
            <QualitiesList qualities={userData.qualities} />
            <p>completedMeetings: {userData.completedMeetings}</p>
            <h2>Rate: {userData.rate}</h2>
            <button onClick={() => history.replace('/users')}>
                Все Пользователи
            </button>
        </>
    )
}

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
}

export default UserPage
