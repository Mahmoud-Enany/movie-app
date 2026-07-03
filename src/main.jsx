import 'bootstrap/dist/css/bootstrap.min.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './styles/style-parameters.css'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import { store } from './store'
import ThemeSync from './components/ThemeSync'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <LanguageProvider>
          <BrowserRouter>
            <ThemeSync />
            <App />
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>,
)