import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useSelector } from 'react-redux'
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus
    // loadQualitiesList
} from '../../../store/qualities'

const QualitiesList = ({ qualities }) => {
    // const dispatch = useDispatch()
    const isLoading = useSelector(getQualitiesLoadingStatus())
    // useEffect(() => {
    //     dispatch(loadQualitiesList())
    // }, [])
    if (!isLoading) {
        const qualitiesList = useSelector(getQualitiesByIds(qualities))
        return (
            <>
                {qualitiesList.map((qual) => (
                    <Quality key={qual._id} {...qual} />
                ))}
            </>
        )
    } else return 'Loading...'
}

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
}

export default QualitiesList
