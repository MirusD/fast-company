import React from 'react'
import PropTypes from 'prop-types'
import Badge from '../../common/badge'
import { useQuality } from '../../../hooks/useQualities'

const Quality = ({ id }) => {
    const { getQuality } = useQuality()
    return <Badge {...getQuality(id)} />
}

Quality.propTypes = {
    id: PropTypes.string
}

export default Quality
