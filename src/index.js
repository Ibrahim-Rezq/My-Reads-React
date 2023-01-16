import React from 'react'
import ReactDOM from 'react-dom/client'
import BooksApp from './BooksApp'
import './css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const rootElement = document.querySelector('#root')

rootElement && ReactDOM.createRoot(rootElement).render(<BooksApp />)
