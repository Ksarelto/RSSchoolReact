import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './src/App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './src/redux/store/store'

const domNode = document.getElementById('root') as HTMLElement

ReactDOM.hydrateRoot(
  domNode,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  )
