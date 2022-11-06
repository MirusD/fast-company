import React, { useState, useEffect } from 'react'
import _ from 'lodash'

import { paginate } from '../../../utils/pagination'
import Pagination from '../../common/pagination'
import GroupList from '../../common/groupList'
import SearchStatus from '../../ui/searchStatus'
import UsersTable from '../../ui/usersTable'
import TextField from '../../common/form/textField'
import { useUser } from '../../../hooks/useUsers'
import { useAuth } from '../../../hooks/useAuth'
import { useSelector } from 'react-redux'
import {
    getProfessions,
    getProfessionsLoadingStatus
} from '../../../store/professions'

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
    const [searchQuery, setSearchQuery] = useState('')
    const pageSize = 8

    const { users } = useUser()
    const { currentUser } = useAuth()
    const professions = useSelector(getProfessions())
    const professionsLoading = useSelector(getProfessionsLoadingStatus())

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf, searchQuery])

    const handleDelete = (userId) => {
        console.log(userId)
    }
    const handleChangeBookmark = (id) => {
        console.log(id)
    }
    const handleProfessionsSelect = (item) => {
        setSelectedProf(item)
        searchQuery && setSearchQuery('')
    }
    const handlePageChange = (pageIndex) => setCurrentPage(pageIndex)
    const handleSort = (item) => setSortBy(item)
    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value)
        selectedProf && setSelectedProf(undefined)
    }
    const clearFilter = () => setSelectedProf()

    function filterUsers(data) {
        const filteredUsers = searchQuery
            ? data.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
              )
            : selectedProf
            ? data.filter((user) => _.isEqual(user.profession, selectedProf))
            : data
        return filteredUsers.filter((u) => u._id !== currentUser._id)
    }
    const filteredUsers = filterUsers(users)
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    return (
        <>
            {users && (
                <div className="d-flex">
                    {professions && !professionsLoading && (
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
                        <TextField
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchQuery}
                        />
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
}

export default UsersListPage
