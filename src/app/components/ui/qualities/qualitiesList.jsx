import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useQualities } from '../../../hooks/useQualities'

const QualitiesList = ({ qualitiesId }) => {
    const { isLoading } = useQualities()
    if (!isLoading) {
        return (
            <>
                {qualitiesId.map((id) => (
                    <Quality key={id} id={id} />
                ))}
            </>
        )
    } else return 'Loading...'
}

QualitiesList.propTypes = {
    qualitiesId: PropTypes.array.isRequired
}

export default QualitiesList
