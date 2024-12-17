import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import { AuthProvider } from './context/AuthContext.jsx'
import { AppRouter } from './router/AppRouter.jsx';
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>

      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>

    </AuthProvider>
  </StrictMode>
)
