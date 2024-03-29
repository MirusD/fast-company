import React from 'react'

const textAreaField = ({
    label,
    name,
    value,
    onChange,
    error,
    placeholder,
    disabled
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value })
    }

    const getInputClasses = () => {
        return 'form-control' + (error ? ' is-invalid' : '')
    }

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>{' '}
            <div className="input-group has-validation">
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    )
}

export default textAreaField
