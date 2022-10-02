import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import api from '../../../api'
import { validator } from '../../../utils/validator'

import validatorConfig from './validatorConfig'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import BackHistoryButton from '../../common/backButton'

const UserEditPage = ({ userId }) => {
    const history = useHistory()
    const [data, setData] = useState({
        name: '',
        email: '',
        profession: '',
        sex: 'male',
        qualities: []
    })
    const [qualities, setQualities] = useState({})
    const [professions, setProfessions] = useState({})
    const [errors, setErrors] = useState({})
    const [isFetching, setIsFetching] = useState(true)
    const isValid = Object.keys(errors).length === 0
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    useEffect(() => {
        Promise.all([
            api.users
                .getById(userId)
                .then(({ profession, qualities, ...data }) => {
                    setData((prevState) => ({
                        ...prevState,
                        ...data,
                        profession: profession._id,
                        qualities: qualities.map((quality) => ({
                            label: quality.name,
                            value: quality._id
                        }))
                    }))
                }),
            api.professions.fetchAll().then((data) => setProfessions(data)),
            api.qualities.fetchAll().then((data) => setQualities(data))
        ]).finally(() => {
            setIsFetching(false)
        })
    }, [])
    useEffect(() => {
        !isFetching && validate()
    }, [data])

    const handelChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const qualitiesArr = Object.values(qualities)
        const professionsArr = Object.values(professions)

        api.users
            .update(userId, {
                ...data,
                profession: professionsArr.find(
                    (profession) => profession._id === data.profession
                ),
                qualities: data.qualities.reduce(
                    (res, quality) => [
                        ...res,
                        qualitiesArr.find((item) => quality.value === item._id)
                    ],
                    []
                )
            })
            .then((data) => history.push(`/users/${data._id}`))
        console.log(data)
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
                            disabled={isFetching}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handelChange}
                            error={errors.email}
                            disabled={isFetching}
                        />
                        <SelectField
                            label="Выбери свою профессию"
                            defaultOption="Choose..."
                            options={professions}
                            onChange={handelChange}
                            value={data.profession}
                            error={errors.profession}
                            name="profession"
                            disabled={isFetching}
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
                            disabled={isFetching}
                        />
                        <MultiSelectField
                            options={qualities}
                            onChange={handelChange}
                            name="qualities"
                            label="Выберите ваши качества"
                            value={data.qualities}
                            defaultValue={data.qualities}
                            disabled={isFetching}
                        />
                        <button
                            type="submit"
                            disabled={!isValid || isFetching}
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