import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { AuthProvider } from './auth/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <HashRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HashRouter>
    </BrowserRouter>
  </React.StrictMode>
)
