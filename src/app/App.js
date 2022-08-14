import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Login from './layouts/login'
import Main from './layouts/main'
import Users from './layouts/users'
import Navbar from './components/navbar'
import UserPage from './components/userPage'

const App = () => {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/users/:id" component={UserPage} />
                <Route path="/users" component={Users} />
                <Route path="/login" component={Login} />
                <Route path="/" component={Main} />
            </Switch>
        </>
    )
}

export default App
