import React from 'react'
import PropTypes from 'prop-types'
import Badge from '../../common/badge'

const Quality = (props) => {
    return <Badge {...props} />
}

Quality.propTypes = {
    id: PropTypes.object
}

export default Quality
