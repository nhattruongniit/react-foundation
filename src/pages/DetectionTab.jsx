import React from 'react'

function DetectionTab() {
  const [numberMessage, setNumberMessage] = React.useState(0);
  const [isActiveTab, setIsActiveTab] = React.useState(false);
  let intervalId = React.useRef(null);

  const callApi = () => {

    setIsActiveTab(true);
    intervalId.current = setInterval(() => {
      setNumberMessage(prevState => prevState + 1);
    }, 1000);
  }

  // visibility change event
  React.useEffect(() => {
    const handleVisibilityChange = () => {

      if (document.visibilityState === 'visible') {
        callApi();
      } else {
        clearInterval(intervalId.current);
        setIsActiveTab(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (document.visibilityState === 'visible') {
      callApi();
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // blur and focus event
  // React.useEffect(() => {
  //   const handleBlur = () => {
  //     clearInterval(intervalId.current);
  //     setIsActiveTab(false);
  //   };

  //   const handleFocus = () => {
  //     callApi();
  //   };

  //   window.addEventListener('blur', handleBlur);
  //   window.addEventListener('focus', handleFocus);

  //   callApi();

  //   return () => {
  //     window.removeEventListener('blur', handleBlur);
  //     window.removeEventListener('focus', handleFocus);
  //     clearInterval(intervalId.current);
  //   };
  // }, [])

  return (
    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <div>
          Tab Browser: <b>{isActiveTab ? 'Active' : 'Inactive'}</b> <br />
          Unread message: {numberMessage} 
        </div>
      </li>
    </ul>
  )
}

export default DetectionTab