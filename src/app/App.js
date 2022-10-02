import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './layouts/login'
import Main from './layouts/main'
import Users from './layouts/users'
import Navbar from './components/ui/navbar'
import { ProfessionProvider } from './hooks/useProfession'
import { QualitiesProvider } from './hooks/useQualities'
import PropTypes from 'prop-types'

const Providers = ({ children }) => {
    return (
        <ProfessionProvider>
            <QualitiesProvider>{children}</QualitiesProvider>
        </ProfessionProvider>
    )
}

Providers.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

const App = () => {
    return (
        <>
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
            <ToastContainer />
        </>
    )
}

export default App
