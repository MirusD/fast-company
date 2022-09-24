import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { orderBy } from 'lodash'

import api from '../../api'

import AddNewCommentForm from '../common/comments/addNewCommentForm'
import CommentsList from '../common/comments/commentsList'

const Comments = () => {
    const { userId } = useParams()
    const [comments, setComments] = useState()
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => {
                const sortedComments = orderBy(data, ['create_at'], ['desc'])
                setComments(sortedComments)
            })
            .finally(() => setIsFetching(false))
    }, [])

    const handleSubmit = (newComments) => {
        api.comments
            .add({ ...newComments, pageId: userId })
            .then((data) => setComments([...comments, data]))
    }

    const handleRemoveComment = (id) => {
        api.comments
            .remove(id)
            .then((_id) =>
                setComments(comments.filter((comment) => comment._id !== _id))
            )
    }

    return (
        <>
            <div className="card mb-2">
                {' '}
                <div className="card-body ">
                    <AddNewCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {!isFetching && comments.length !== 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList
                            comments={comments}
                            onRemove={handleRemoveComment}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default Comments
