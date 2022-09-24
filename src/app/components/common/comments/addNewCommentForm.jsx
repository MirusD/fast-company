import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import api from '../../../api'

import { validator } from '../../../utils/validator'
import SelectField from '../form/selectField'
import TextAreaField from '../form/textAreaField'

const initialData = { userId: '', content: '' }

const AddNewCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData)
    const [users, setUsers] = useState({})
    const [errors, setErrors] = useState({})
    const [isFetching, setIsFetching] = useState(true)
    const isValid = Object.keys(errors).length === 0
    console.log(isValid)
    const validatorConfig = {
        userId: {
            isRequired: {
                message: 'Выберите пользователя'
            }
        },
        content: {
            isRequired: {
                message: 'Поле сообщения не должно быть пустым'
            }
        }
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const clearForm = () => {
        setData(initialData)
        setErrors({})
    }

    useEffect(() => {
        api.users
            .fetchAll()
            .then((data) => setUsers(data))
            .finally(() => setIsFetching(false))
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
        if (!validate()) return
        onSubmit(data)
        clearForm()
    }

    return (
        <div>
            <h2>Новый комментарии</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    defaultOption="Выберите пользователя"
                    options={users}
                    onChange={handelChange}
                    value={data.userId}
                    error={errors.userId}
                    name="userId"
                    disabled={isFetching}
                />
                <TextAreaField
                    label="Сообщение"
                    value={data.content}
                    onChange={handelChange}
                    name="content"
                    error={errors.content}
                    disabled={isFetching}
                />
                <div className="d-flex justify-content-end">
                    <button
                        type="submit"
                        disabled={!isValid || isFetching}
                        className="btn btn-primary"
                    >
                        Опубликовать
                    </button>
                </div>
            </form>
        </div>
    )
}

AddNewCommentForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default AddNewCommentForm
