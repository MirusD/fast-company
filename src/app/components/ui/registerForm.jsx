import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'
import { getQualities } from '../../store/qualities'
import { useSelector } from 'react-redux'
import { getProfessions } from '../../store/professions'

const RegisterForm = () => {
    const history = useHistory()
    const [data, setData] = useState({
        email: '',
        password: '',
        profession: '',
        sex: 'male',
        name: '',
        qualities: [],
        licence: false
    })
    const { signUp } = useAuth()
    const qualities = useSelector(getQualities())
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }))
    const professions = useSelector(getProfessions())
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }))
    const [errors, setErrors] = useState({})
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0
    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Email введен некорректно'
            }
        },
        name: {
            isRequired: {
                message: 'Имя обязательно для заполнения'
            },
            min: {
                message: 'Имя должно состоять минимум из 3 символов',
                value: 3
            }
        },
        password: {
            isRequired: {
                message: 'Пароль обязательна для заполнения'
            },
            isCapitalSymbol: {
                message: 'Пароль должен содержать хотя бы одну заглавную букву'
            },
            isContainDigit: {
                message: 'Пароль должен содержать хотя бы одно число'
            },
            min: {
                message: 'Пароль должен состоять минимум из 8 символов',
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: 'Обязательно выберите вашу профессию'
            }
        },
        licence: {
            isRequired: {
                message:
                    'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения'
            }
        }
    }
    useEffect(() => {
        validate()
    }, [data])
    const handelChange = (target) => {
        const { name, value } = target
        if (target) {
            setData((prevState) => ({
                ...prevState,
                [name]: value
            }))
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        }
        try {
            await signUp(newData)
            history.push('/')
        } catch (error) {
            setErrors(error)
        }
    }
    const { email, password, name } = data
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={email}
                onChange={handelChange}
                error={errors.email}
            />
            <TextField
                label="Имя"
                name="name"
                value={name}
                onChange={handelChange}
                error={errors.name}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={password}
                onChange={handelChange}
                error={errors.password}
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
            />
            <CheckBoxField
                value={data.licence}
                onChange={handelChange}
                defaultValue={data.qualities}
                name="licence"
                error={errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    )
}

export default RegisterForm
