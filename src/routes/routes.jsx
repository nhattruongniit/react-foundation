import { createBrowserRouter } from 'react-router-dom';

// pages
import App from '../App';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import RefHook from '../pages/RefHook.jsx';

// setting router
export const router = createBrowserRouter([
  { 
    path: '/', 
    element: <App />,
    children: [
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        loader: ({ request }) => {
          return fetch('https://dummyjson.com/carts', {
            signal: request.signal
          })
        }
      },
      {
        path: 'ref-hook',
        element: <RefHook />
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'register',
            element: <Register />
          },
          {
            path: "logout",
            action: logoutUser
          },
        ]
      }
    ]
   
  },
  // { path: '/about', element: <About /> },
  // { path: '/contact', element: <Contact /> },
]);


function logoutUser() {
  // logout user
  // redirect to login page
  // return <Navigate to="/login" />
  console.log("logout")
}