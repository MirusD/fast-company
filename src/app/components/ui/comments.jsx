import React, { useEffect } from 'react'
import AddNewCommentForm from '../common/comments/addNewCommentForm'
import CommentsList from '../common/comments/commentsList'
import { useComments } from '../../hooks/useComments'
import { useDispatch, useSelector } from 'react-redux'
import {
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList
} from '../../store/comments'
import { useParams } from 'react-router-dom'

const Comments = () => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadCommentsList(userId))
    }, [userId])
    const isLoading = useSelector(getCommentsLoadingStatus())
    const { createComment, removeComment } = useComments()
    const comments = useSelector(getComments())

    const handleSubmit = (newComments) => {
        createComment(newComments)
    }

    const handleRemoveComment = (id) => {
        removeComment(id)
    }

    return (
        <>
            <div className="card mb-2">
                {' '}
                <div className="card-body ">
                    <AddNewCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {!isLoading && comments.length !== 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={comments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            'Loading...'
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Comments
