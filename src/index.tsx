import '@/config/configureMobX'
import '@/index.scss'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
