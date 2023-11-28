import React from 'react'
import ReactDOM from 'react-dom/client'
import Application from './components/Application'
import Injection from 'remote/Injection'

import './styles/style.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Injection />
    <Application />
  </React.StrictMode>,
)
