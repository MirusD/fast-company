import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import CheckBoxField from '../common/form/checkBoxField'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
    const [data, setData] = useState({ email: '', password: '', stayOn: false })
    const [errors, setErrors] = useState({})
    const isValid = Object.keys(errors).length === 0
    const { signIn } = useAuth()
    const history = useHistory()
    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Email введен некорректно'
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
        }
    }
    useEffect(() => {
        validate()
    }, [data])
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
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
        try {
            await signIn(data)
            history.push('/')
        } catch (error) {
            setErrors(error)
        }
    }
    const { email, password } = data
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
                label="Пароль"
                type="password"
                name="password"
                value={password}
                onChange={handelChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handelChange}
                name="stayOn"
            >
                Оставаться в системе
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

export default LoginForm
