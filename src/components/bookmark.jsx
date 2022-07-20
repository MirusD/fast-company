import React from 'react'

const Bookmark = ({status, onClick}) => {
    const getClasses = () => {
        return `bi bi-bookmark${status ? '-star-fill':''}`
    }

    return <button onClick={onClick}><i className={getClasses()}></i></button>
}

export default Bookmark
