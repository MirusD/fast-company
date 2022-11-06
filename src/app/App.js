import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './layouts/login'
import Main from './layouts/main'
import Users from './layouts/users'
import Navbar from './components/ui/navbar'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import Logout from './layouts/logout'
import AppLoader from './components/ui/hoc/appLoader'

const App = () => {
    return (
        <>
            <AppLoader>
                <AuthProvider>
                    <Navbar />
                    <Switch>
                        <ProtectedRoute
                            path="/users/:userId?/:userEdit?"
                            component={Users}
                        />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/" exact component={Main} />
                        <Redirect to="/" />
                    </Switch>
                </AuthProvider>
            </AppLoader>
            <ToastContainer />
        </>
    )
}

export default App
