import React from 'react'
import Badge from "./badge";

const SearchStatus = ({number}) => {
    const word = number >= 2 && number <= 4 ? 'человека' : 'человек'
    const phrase = number > 0 ? `${number} ${word} Tусанёт сегодня с тобой` : 'Никто с тобой не тусанёт'
    const color = number > 0 ? 'primary' : 'danger'

    return <h2><Badge name={phrase} color={color}/></h2>
}

export default SearchStatus
