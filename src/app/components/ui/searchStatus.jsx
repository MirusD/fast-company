import React from 'react'
import Badge from '../common/badge'
import PropTypes from 'prop-types'

const SearchStatus = ({ number }) => {
    const word = number >= 2 && number <= 4 ? 'человека' : 'человек'
    const phrase =
        number > 0
            ? `${number} ${word} Tусанёт сегодня с тобой`
            : 'Никто с тобой не тусанёт'
    const color = number > 0 ? 'primary' : 'danger'

    return (
        <h2>
            <Badge name={phrase} color={color} />
        </h2>
    )
}

SearchStatus.propTypes = {
    number: PropTypes.number.isRequired
}

export default SearchStatus
