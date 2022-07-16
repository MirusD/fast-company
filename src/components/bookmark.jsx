import React from 'react'

const Bookmark = ({bookmark, onClick}) => {
    const getClasses = () => {
        return `bi bi-bookmark${bookmark ? '-star-fill':''}`
    }

    return <button onClick={onClick}><i className={getClasses()}></i></button>
}

export default Bookmark
