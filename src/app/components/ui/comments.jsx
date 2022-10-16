import React from 'react'
import AddNewCommentForm from '../common/comments/addNewCommentForm'
import CommentsList from '../common/comments/commentsList'
import { useComments } from '../../hooks/useComments'

const Comments = () => {
    const { createComment, comments, isLoading, removeComment } = useComments()

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
