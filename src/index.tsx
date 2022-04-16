import './index.css'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ReduxDevTools } from './redux/ReduxDevTools'
import { store } from './redux/_store'

ReactDOM.render(
  <>
    <Provider store={store}>
      <ReduxDevTools />
      <App />
    </Provider>
  </>,
  document.getElementById('root')
)
