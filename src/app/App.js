import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Login from './layouts/login'
import Main from './layouts/main'
import Users from './layouts/users'
import Navbar from './components/navbar'

const App = () => {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/users/:userId?" component={Users} />
                <Route path="/login" component={Login} />
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
        </>
    )
}

export default App
