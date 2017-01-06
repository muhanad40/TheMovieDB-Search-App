import theMovieDb from './src/themoviedb'

require("babel-polyfill")

import App from './src/components/App'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import reducers from './src/reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('the-movie-db-app')
)
