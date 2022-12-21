import React from 'react'
import PropTypes from 'prop-types'

const Bookmark = ({ status, onClick }) => {
    const getClasses = () => {
        return `bi bi-bookmark${status ? '-star-fill' : ''}`
    }

    return (
        <button onClick={onClick}>
            <i className={getClasses()}></i>
        </button>
    )
}

Bookmark.propTypes = {
    status: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Bookmark
