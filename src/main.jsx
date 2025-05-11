import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import  MovieProvider  from './Context/Context.jsx'
import  ThemeProvider  from './Theme/ThemeProvider.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <MovieProvider>
    <ThemeProvider>
    <App /></ThemeProvider>
    </MovieProvider>
  </BrowserRouter>,
)
