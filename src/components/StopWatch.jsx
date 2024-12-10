import React from 'react'
import Button from './Button';

function StopWatch() {
  const [startTime, setStartTime] = React.useState(null);
  const [now, setNow] = React.useState(null);
  const intervalRef = React.useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }
  
  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;

  if(startTime !== null  && now !== null) {
    secondsPassed = (now - startTime) / 1000;
  }
  
  return (
    <div>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <br />
      <Button text="Start" onClick={handleStart} />
      <Button text="Stop" onClick={handleStop} />
    </div>
  )
}

export default StopWatch