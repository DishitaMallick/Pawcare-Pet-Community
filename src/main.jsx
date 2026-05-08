import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log('--- main.jsx: Execution Started ---');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('--- main.jsx: FAILED to find #root element! ---');
} else {
  console.log('--- main.jsx: Found #root, rendering App... ---');
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
