import React from 'react'
import PropTypes from 'prop-types'
import { ProfessionProvider } from '../../hooks/useProfession'

const Providers = ({ children }) => {
    return <ProfessionProvider>{children}</ProfessionProvider>
}

Providers.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default Providers
