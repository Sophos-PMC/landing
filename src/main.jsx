import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SophosLanding from './views/SophosLanding.jsx'
import DeleteAccount from './views/DeleteAccount.jsx'

const routes = {
  '/deleteaccount': DeleteAccount,
}

const CurrentView = routes[window.location.pathname] ?? SophosLanding

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrentView />
  </StrictMode>,
)
