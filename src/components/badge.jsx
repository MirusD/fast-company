import React from 'react'

const Badge = ({ name, color }) => {
    const classNames = `badge bg-${color}`
    return <span className={classNames}>{name}</span>
}

export default Badge
