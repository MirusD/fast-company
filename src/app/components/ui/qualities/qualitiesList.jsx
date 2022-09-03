import React from 'react'
import PropTypes from 'prop-types'

import Quality from './quality'

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map(({ _id, ...quality }) => (
                <Quality key={_id} {...quality} />
            ))}
        </>
    )
}

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
}

export default QualitiesList
