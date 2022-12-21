import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import reportWebVitals from './reportWebVitals'
import App from './app/App'
import { createStore } from './app/store/createStore'
import { Provider } from 'react-redux'
import history from './app/utils/history'

const store = createStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <Router history={history}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Router>
    </Provider>
)

reportWebVitals()
