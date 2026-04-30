import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import SophosLanding from './views/SophosLanding.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <SophosLanding/>
  </StrictMode>,
)
