import { useState, useRef, useEffect, useCallback } from 'react';

import { useDate } from '../hooks/useDate.js';

// Constants for better maintainability
const INTERVALS = {
  ACTIVE_MESSAGE: 1000,    // 1 second
  KEEP_ALIVE: 9000,       // 10 seconds
};

const TAB_STATES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

function DetectionTab() {
  // State management
  const { date} = useDate();
   
  const [tabState, setTabState] = useState(TAB_STATES.ACTIVE);
  const [messageCount, setMessageCount] = useState(0);
  const [keepAliveCount, setKeepAliveCount] = useState(0);
  const [lastActivity, setLastActivity] = useState(new Date());
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [triggerPlayGame, setTriggerPlayGame] = useState(0);

  // Refs for interval management
  const activeIntervalRef = useRef(null);
  const keepAliveIntervalRef = useRef(null);

  // Cleanup function to clear all intervals
  const clearAllIntervals = useCallback(() => {
    if (activeIntervalRef.current) {
      clearInterval(activeIntervalRef.current);
      activeIntervalRef.current = null;
    }
    if (keepAliveIntervalRef.current) {
      clearInterval(keepAliveIntervalRef.current);
      keepAliveIntervalRef.current = null;
    }
  }, []);

  // Start active message counting
  const startActiveMode = useCallback(() => {
    clearAllIntervals();
    setTabState(TAB_STATES.ACTIVE);
    setLastActivity(new Date());
    
    activeIntervalRef.current = setInterval(() => {
      setMessageCount(prev => prev + 1);
    }, INTERVALS.ACTIVE_MESSAGE);
  }, [clearAllIntervals]);

  // Start keep-alive mode
  const startInactiveMode = useCallback(() => {
    clearAllIntervals();
    setTabState(TAB_STATES.INACTIVE);
    setLastActivity(new Date());
    
    keepAliveIntervalRef.current = setInterval(() => {
      async function sendKeepAliveSignal() {
        try {
          const bodyData = {
            data: {
              "refresh_token": window.localStorage.getItem('refresh_token'),
            }
          }
          const res = await fetch('http://localhost:3005/api/user/refresh-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
          });
          const data = await res.json();
          if (!data.isSuccess) {
            window.localStorage.setItem('access_token', data.data.access_token);
          }
        } catch (error) {
          console.error('Error sending keep-alive:', error);
        }
      }
      sendKeepAliveSignal();
      setKeepAliveCount(prev => prev + 1);
    }, INTERVALS.KEEP_ALIVE);
  }, [clearAllIntervals]);

  // Event handlers
  const handleTabBlur = useCallback(() => {
    startInactiveMode();
  }, [startInactiveMode]);

  const handleTabFocus = useCallback(() => {
    startActiveMode();
  }, [startActiveMode]);

  // Format time display
  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };

  // Setup event listeners and initial state
  useEffect(() => {
    if (!isLogin) return;
    
    window.addEventListener('blur', handleTabBlur);
    window.addEventListener('focus', handleTabFocus);
    
    // Start in active mode
    startActiveMode();

    return () => {
      window.removeEventListener('blur', handleTabBlur);
      window.removeEventListener('focus', handleTabFocus);
      clearAllIntervals();
    };
  }, [handleTabBlur, handleTabFocus, startActiveMode, clearAllIntervals, isLogin]);

  async function onLogin() {
    const bodyData = {
      data: {
        email: document.getElementById('email').value,
        password: '123456'
      }
    }
    const res = await fetch('http://localhost:3005/api/user/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });
    const data = await res.json();
    if (data.isSucess) {
      setIsLogin(true);
      setUser(document.getElementById('email').value);
      window.localStorage.setItem('access_token', data.data.access_token);
      window.localStorage.setItem('refresh_token', data.data.refresh_token);
      console.log(data);
    } else {
      alert('Login failed: ' + data.message);
    }
  }

  async function playGame() {
    const res = await fetch('http://localhost:3005/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': window.localStorage.getItem('access_token'),
      },
    });
    const data = await res.json();
    if (data.isSuccess) {
      setTriggerPlayGame(prev => prev + 1);
    } else {
      alert('Session exprired');
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Tab Activity Monitor
      </h2>
      <div>Show time: {date}</div>
      <br />
      
      {/* Status Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Tab Status
          </h3>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              tabState === TAB_STATES.ACTIVE 
                ? 'bg-green-500 animate-pulse' 
                : 'bg-red-500'
            }`}></div>
            <span className={`font-medium ${
              tabState === TAB_STATES.ACTIVE 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {tabState === TAB_STATES.ACTIVE ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Last Activity
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formatTime(lastActivity)}
          </p>
        </div>
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
          User {isLogin ? "Logged in" : "Login"}
        </h3>
        <div className="flex items-center space-x-2">
          {isLogin ? (
            <div>
              User: {user} <br />
              Trigger Play Game: {triggerPlayGame} times <br /><br />
              <button 
                type="button"
                className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                onClick={playGame}
              >
                Play game
              </button>
            </div>
          ) : (
            <>
              <input 
                type="text" 
                placeholder="Email" 
                id="email"
                className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
              
              <button 
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={onLogin}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
      
      <br />

      {/* Counters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 border-2 border-blue-200 dark:border-blue-600 rounded-lg">
          <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
            Active Messages
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {messageCount}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Updates every second when active
          </p>
        </div>

        <div className="p-4 border-2 border-orange-200 dark:border-orange-600 rounded-lg">
          <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
            Keep-Alive Signals
          </h3>
          <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {keepAliveCount}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sent every 10 second when inactive
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetectionTab;