import React from 'react'
import PropTypes from 'prop-types'
import Badge from '../../common/badge'
import { useQualities } from '../../../hooks/useQualities'

const Quality = ({ id }) => {
    const { getQuality } = useQualities()
    return <Badge {...getQuality(id)} />
}

Quality.propTypes = {
    id: PropTypes.string
}

export default Quality
