import React from 'react'
import PropTypes from 'prop-types'
import { ProfessionProvider } from '../../hooks/useProfession'
import { QualitiesProvider } from '../../hooks/useQualities'

const Providers = ({ children }) => {
    return (
        <ProfessionProvider>
            <QualitiesProvider>{children}</QualitiesProvider>
        </ProfessionProvider>
    )
}

Providers.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default Providers
