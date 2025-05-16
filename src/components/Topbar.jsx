import React from 'react'

const awaitTime = (time = 3000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time)
  })
}

function Topbar() {
  const [numberMessage, setNumberMessage] = React.useState(2);

  React.useEffect(() => {
    // async function updateMessage() {
    //   await awaitTime();
    //   setNumberMessage(prevState => prevState + 1)
    // }
    // updateMessage();

    setInterval(() => {
      setNumberMessage(prevState => prevState + 1)
    }, 3000)
  }, [])

  console.log('message: ', numberMessage)

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
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <div>
                {numberMessage} unread message
              </div>
            </li>
          </ul>
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