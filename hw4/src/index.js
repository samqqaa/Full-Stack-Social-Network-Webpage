import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import Reducer from './reducers'
import App from './components/App'

//Create store and render the store with reducer function
//change the view of 'app'
//also known as SPA
const store = createStore(Reducer)
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
