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
import { useQualities } from '../../../hooks/useQualities'
import { useProfession } from '../../../hooks/useProfession'
import { useAuth } from '../../../hooks/useAuth'

const UserEditPage = ({ userId }) => {
    const history = useHistory()
    const [data, setData] = useState({
        name: '',
        email: '',
        profession: '',
        sex: 'male',
        qualities: []
    })
    const {
        qualities,
        isLoading: isLoadingQualities,
        getQuality
    } = useQualities()
    const { professions, isLoading: isLoadingProfessions } = useProfession()
    const { currentUser, updateUser } = useAuth()
    const [errors, setErrors] = useState({})
    const isValid = Object.keys(errors).length === 0
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    useEffect(() => {
        setData((prevState) => ({
            ...prevState,
            name: currentUser.name,
            email: currentUser.email,
            profession: currentUser.profession,
            sex: currentUser.sex,
            qualities: currentUser.qualities
        }))
    }, [])

    useEffect(() => {
        !(isLoadingQualities && isLoadingProfessions) && validate()
    }, [data])

    const handelChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        updateUser(data).then((data) => history.push(`/users/${data._id}`))
    }

    const getQualitiesWithForma = () => {
        return qualities.map((q) => ({ value: q._id, label: q.name }))
    }

    const getFormatQualitiesForValue = (value) => {
        return value.map((v) => {
            const quality = getQuality(v)
            return {
                value: quality._id,
                label: quality.name
            }
        })
    }

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.name}
                            onChange={handelChange}
                            error={errors.name}
                            disabled={
                                isLoadingQualities || isLoadingProfessions
                            }
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handelChange}
                            error={errors.email}
                            disabled={
                                isLoadingQualities || isLoadingProfessions
                            }
                        />
                        <SelectField
                            label="Выбери свою профессию"
                            defaultOption="Choose..."
                            options={professions}
                            onChange={handelChange}
                            value={data.profession}
                            error={errors.profession}
                            name="profession"
                            disabled={
                                isLoadingQualities || isLoadingProfessions
                            }
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
                            disabled={
                                isLoadingQualities || isLoadingProfessions
                            }
                        />
                        <MultiSelectField
                            options={getQualitiesWithForma()}
                            onChange={handelChange}
                            name="qualities"
                            label="Выберите ваши качества"
                            value={getFormatQualitiesForValue(data.qualities)}
                            defaultValue={data.qualities}
                            disabled={
                                isLoadingQualities || isLoadingProfessions
                            }
                        />
                        <button
                            type="submit"
                            disabled={
                                !isValid ||
                                isLoadingQualities ||
                                isLoadingProfessions
                            }
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Обновить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

UserEditPage.propTypes = {
    userId: PropTypes.string
}

export default UserEditPage
