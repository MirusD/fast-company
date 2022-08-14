import React, { useState, useEffect } from 'react'
import _ from 'lodash'

import { paginate } from '../utils/pagination'
import api from '../api'

import Pagination from '../components/pagination'
import GroupList from '../components/groupList'
import SearchStatus from '../components/searchStatus'
import UsersTable from '../components/usersTable'

const Users = () => {
    const [users, setUsers] = useState([])
    const [professions, setProfessions] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
    const [isFetching, setFetching] = useState(false)
    const pageSize = 8

    useEffect(() => {
        setFetching(true)
        api.users
            .fetchAll()
            .then((data) => setUsers(data))
            .finally(() => setFetching(false))
    }, [])

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])

    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== userId))
    }
    const handleChangeBookmark = (id) => {
        setUsers((prevState) =>
            prevState.map(({ bookmark, ...state }) => ({
                ...state,
                bookmark: state._id === id ? !bookmark : bookmark
            }))
        )
    }
    const handleProfessionsSelect = (item) => setSelectedProf(item)
    const handlePageChange = (pageIndex) => setCurrentPage(pageIndex)
    const handleSort = (item) => setSortBy(item)
    const clearFilter = () => setSelectedProf()

    if (!isFetching) {
        const filteredUsers = selectedProf
            ? users.filter((user) => _.isEqual(user.profession, selectedProf))
            : users
        const count = filteredUsers.length
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        )
        const userCrop = paginate(sortedUsers, currentPage, pageSize)

        return (
            <>
                {users && (
                    <div className="d-flex">
                        {professions && (
                            <div className="d-flex flex-column flex-shrink-0 p-3">
                                <GroupList
                                    items={professions}
                                    selectedItem={selectedProf}
                                    onItemSelect={handleProfessionsSelect}
                                />
                                <button
                                    className="btn btn-secondary mt-2"
                                    onClick={clearFilter}
                                >
                                    Очистить
                                </button>
                            </div>
                        )}
                        <div className="d-flex flex-column">
                            <SearchStatus number={count} />
                            {count > 0 && (
                                <UsersTable
                                    users={userCrop}
                                    onSort={handleSort}
                                    selectedSort={sortBy}
                                    onDeleteUser={handleDelete}
                                    onChangeBookmark={handleChangeBookmark}
                                />
                            )}
                            <div className="d-flex justify-content-center">
                                <Pagination
                                    itemsCount={count}
                                    pageSize={pageSize}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    } else return <h1 className="text-center mt-5">Загрузка...</h1>
}

export default Users
