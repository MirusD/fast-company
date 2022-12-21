import React from 'react'
import PropTypes from 'prop-types'

import _ from 'lodash'

const TableBody = ({ data, columns }) => {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component
            if (typeof component === 'function') {
                return component(item)
            }
            return component
        }

        const path = columns[column].path
        const text = _.get(item, path)

        return text
    }

    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((column) => (
                        <td key={column}>{renderContent(item, column)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    )
}

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
}

export default TableBody
