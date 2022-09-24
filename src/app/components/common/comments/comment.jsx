import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import api from '../../../api'
import { formatDate } from '../../../utils/formatDate'

const Comment = ({
    _id: id,
    userId,
    content,
    created_at: created,
    onRemove
}) => {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        api.users.getById(userId).then((data) => {
            setUser(data)
            setIsLoading(false)
        })
    }, [])

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                {isLoading ? (
                    'Loading ...'
                ) : (
                    <div className="col">
                        <div className="d-flex flex-start ">
                            <img
                                src={`https://avatars.dicebear.com/api/avataaars/${(
                                    Math.random() + 1
                                )
                                    .toString(36)
                                    .substring(7)}.svg`}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1 ">
                                            {user.name} -{' '}
                                            <span className="small">
                                                {formatDate(created)}
                                            </span>
                                        </p>
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() => onRemove(id)}
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                    <p className="small mb-0">{content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

Comment.propTypes = {
    _id: PropTypes.string,
    userId: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.number,
    onRemove: PropTypes.func
}

export default Comment
