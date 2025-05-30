import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'

import { RouterProvider } from 'react-router-dom';

import { router } from './routes/routes';


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
