import React from 'react'
import Badge from "./badge";

const Qualitie = ({qualities}) => {
    return (qualities.map(quality => <Badge key={quality._id} {...quality}/>))
}

export default Qualitie
