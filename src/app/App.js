import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './layouts/login'
import Main from './layouts/main'
import Users from './layouts/users'
import Navbar from './components/ui/navbar'
import AuthProvider from './hooks/useAuth'
import Providers from './components/hoc/withProviders'

const App = () => {
    return (
        <>
            <AuthProvider>
                <Navbar />
                <Providers>
                    <Switch>
                        <Route
                            path="/users/:userId?/:userEdit?"
                            component={Users}
                        />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/" exact component={Main} />
                        <Redirect to="/" />
                    </Switch>
                </Providers>
            </AuthProvider>
            <ToastContainer />
        </>
    )
}

export default App
