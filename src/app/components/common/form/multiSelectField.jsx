import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const MultiSelectField = ({
    options,
    onChange,
    name,
    label,
    defaultValue,
    value,
    disabled
}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === 'object'
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options

    const handelChange = (value) => {
        onChange({ name, value: value.map((v) => v.value) })
    }
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                defaultValue={defaultValue}
                value={value}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handelChange}
                name={name}
                isDisabled={disabled}
            />
        </div>
    )
}

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array,
    value: PropTypes.array,
    disabled: PropTypes.bool
}

export default MultiSelectField
