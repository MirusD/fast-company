import React from 'react'
import PropTypes from 'prop-types'

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === 'asc' ? 'desc' : 'asc'
            })
        } else {
            onSort({ path: item, order: 'asc' })
        }
    }

    const getCaretFill = ({ order, path }, columnPath) => {
        const classes = `bi bi-caret-${order === 'asc' ? 'up' : 'down'}-fill`
        return path === columnPath ? <i className={classes}></i> : null
    }

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        scope="col"
                        {...{ role: columns[column].path && 'button' }}
                    >
                        {columns[column].name}
                        {getCaretFill(selectedSort, columns[column].path)}
                    </th>
                ))}
                <th scope="col"></th>
            </tr>
        </thead>
    )
}

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
}

export default TableHeader
