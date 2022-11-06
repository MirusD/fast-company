import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { validator } from '../../../utils/validator'

import validatorConfig from './validatorConfig'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import BackHistoryButton from '../../common/backButton'
import { useAuth } from '../../../hooks/useAuth'
import { useSelector } from 'react-redux'
import {
    getQualities,
    getQualitiesLoadingStatus
} from '../../../store/qualities'
import {
    getProfessions,
    getProfessionsLoadingStatus
} from '../../../store/professions'

const UserEditPage = () => {
    const history = useHistory()
    const [data, setData] = useState()
    const qualities = useSelector(getQualities())
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
    const professions = useSelector(getProfessions())
    console.log(professions)
    const professionLoading = useSelector(getProfessionsLoadingStatus())
    const { currentUser, updateUser } = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const [errors, setErrors] = useState({})
    const isValid = Object.keys(errors).length === 0

    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }))
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }))

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    function getQualitiesListByIds(qualitiesIds) {
        const qualitiesArray = []
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality)
                    break
                }
            }
        }
        return qualitiesArray
    }

    const transformData = (data) =>
        getQualitiesListByIds(data).map((qual) => ({
            label: qual.name,
            value: qual._id
        }))

    useEffect(() => {
        if (!professionLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            })
        }
    }, [professionLoading, qualitiesLoading, currentUser, data])

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false)
        }
    }, [data])

    useEffect(() => {
        validate()
    }, [data])

    const handelChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        updateUser({
            ...data,
            qualities: data.qualities.map((q) => q.value)
        })
        history.push(`/users/${currentUser._id}`)
    }

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handelChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handelChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professionsList}
                                onChange={handelChange}
                                value={data.profession}
                                error={errors.profession}
                                name="profession"
                            />
                            <RadioField
                                options={[
                                    { name: 'Male', value: 'male' },
                                    { name: 'Female', value: 'female' },
                                    { name: 'Other', value: 'other' }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handelChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={qualitiesList}
                                onChange={handelChange}
                                name="qualities"
                                label="Выберите ваши качества"
                                defaultValue={data.qualities}
                            />
                            <button
                                type="submit"
                                disabled={!isValid || isLoading}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        'Loading...'
                    )}
                </div>
            </div>
        </div>
    )
}

UserEditPage.propTypes = {
    userId: PropTypes.string
}

export default UserEditPage
