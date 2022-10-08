import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import qualityService from '../services/quality.service'
import { toast } from 'react-toastify'

const QualitiesContext = React.createContext()

export const useQualities = () => {
    return useContext(QualitiesContext)
}

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getQualitiesList()
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    })

    async function getQualitiesList() {
        try {
            const { content } = await qualityService.fetchAll()
            setQualities(content)
            setIsLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }

    function getQuality(id) {
        return qualities.find((q) => q._id === id)
    }

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }

    return (
        <QualitiesContext.Provider value={{ qualities, isLoading, getQuality }}>
            {children}
        </QualitiesContext.Provider>
    )
}

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
