import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useQuality } from '../../../hooks/useQualities'

const QualitiesList = ({ qualitiesId }) => {
    const { isLoading } = useQuality()
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
