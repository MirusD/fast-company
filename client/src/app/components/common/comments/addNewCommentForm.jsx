import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { validator } from '../../../utils/validator'
import TextAreaField from '../form/textAreaField'

const AddNewCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})
    // const isValid = Object.keys(errors).length === 0
    const validatorConfig = {
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
        setData({})
        setErrors({})
    }

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
        if (!validate()) return
        onSubmit(data)
        clearForm()
    }

    return (
        <div>
            <h2>Новый комментарии</h2>
            <form onSubmit={handleSubmit}>
                <TextAreaField
                    label="Сообщение"
                    value={data.content || ''}
                    onChange={handelChange}
                    name="content"
                    error={errors.content}
                    disabled={false}
                />
                <div className="d-flex justify-content-end">
                    <button
                        type="submit"
                        disabled={false}
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
