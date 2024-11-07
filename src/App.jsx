import { Link, Outlet, Routes } from 'react-router-dom';

import CounterClass from './pages/CounterClass';
import TreeSeletPure from './components/TreeSeletPure';

function App() {
  
  return (
    <>
      <ul>
        <li><Link to="/">App</Link></li>
        <li><Link to="about">About</Link></li>
        <li><Link to="contact">Contact</Link></li>   
        <li><Link to="dashboard">Dashboard</Link></li> 
      </ul>

      <CounterClass />


      <hr />
      <TreeSeletPure />


      {/* <RouterProvider router={router} /> */}

      {/* <Outlet /> */}
    </>
  )
}

export default App
