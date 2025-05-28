import React from 'react'
import DetectionTab from '../pages/DetectionTab.jsx';

const awaitTime = (time = 3000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time)
  })
}

function Topbar() {
 
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            React
          </span>
        </div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <DetectionTab />
          
        </div>
      </div>
    </nav>

  )
}

export default Topbar


/*
solution 1: socket
- server open socket
- fe receive socket and update latest data

solution 2: server sent event
- cons: just read server, not sent
- BE should be return event steam (listen end point BE)

solution 3: BE cache in x time


*/