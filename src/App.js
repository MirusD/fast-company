import React, {useState} from 'react'
import api from "./api"
import Users from "./components/users"

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user._id !== userId))
    }
    const handleChangeBookmark = (id) => {
        setUsers(prevState => prevState.map(({ bookmark, ...state}) =>
            ({...state, bookmark: state._id === id ? !bookmark : bookmark})))
    }

    return <Users
        onDeleterUser={handleDelete}
        onChangeBookmark={handleChangeBookmark}
        users={users}
    />
}

export default App
