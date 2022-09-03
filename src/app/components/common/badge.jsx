import React from 'react'
import PropTypes from 'prop-types'

const Badge = ({ name, color }) => {
    const classNames = `badge bg-${color}`
    return <span className={classNames}>{name}</span>
}

Badge.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
}

export default Badge
