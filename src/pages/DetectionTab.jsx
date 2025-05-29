import React from 'react';

function DetectionTab() {
  const [isActiveTab, setIsActiveTab] = React.useState(true);
  const [numberMessage, setNumberMessage] = React.useState(0);
  const [keepAlive, setKeepAlive] = React.useState(0);

  let intervalId = React.useRef(null);
  const timeoutRef = React.useRef(null);

  const startInactiveTimer = () => {
    timeoutRef.current = setInterval(() => {
      setKeepAlive(prevState => prevState + 1);
    }, 5000 * 2);
  }

  const callApi = () => {
    clearInterval(timeoutRef.current);
    setIsActiveTab(true);
    intervalId.current = setInterval(() => {
      setNumberMessage(prevState => prevState + 1);
    }, 1000);
  }

  React.useEffect(() => {
    const handleBlur = () => {
      clearInterval(intervalId.current);
      setIsActiveTab(false);
      startInactiveTimer();
    };

    const handleFocus = () => {
      callApi();
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    callApi();

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      clearInterval(intervalId.current);
      clearInterval(timeoutRef.current);
    };
  }, [])

  return (
    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <div>
          Tab Browser: <b>{isActiveTab ? 'Active' : 'Inactive'}</b> |  Message: {numberMessage}  <br />
          Inactive than 10s: {keepAlive} trigger api to keep alive<br />
        </div>
      </li>
    </ul>
  )
}

export default DetectionTab