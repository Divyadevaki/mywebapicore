import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './Crud.jsx'
import Crud from './Crud.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Crud />
  </StrictMode>
)