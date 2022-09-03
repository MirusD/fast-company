import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Login from './layouts/login'
import Main from './layouts/main'
import Users from './layouts/users'
import Navbar from './components/ui/navbar'

const App = () => {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/users/:userId?/:userEdit?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
        </>
    )
}

export default App
