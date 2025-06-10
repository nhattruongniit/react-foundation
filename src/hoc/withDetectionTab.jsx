import React, { useEffect, useState, useRef } from "react";

export default function withDetectionTab(WrappedComponent) {
        
    const INTERVALS = {
        ACTIVE_MESSAGE: 1000,    // 1 second
        KEEP_ALIVE: 10000,       // 10 seconds
    };
    
    const TAB_STATES = {
        ACTIVE: 'active',
        INACTIVE: 'inactive',
    };
  
    return function DetectionTab() {
          // State management
        const [tabState, setTabState] = useState(TAB_STATES.ACTIVE);
        const [messageCount, setMessageCount] = useState(0);
        const [keepAliveCount, setKeepAliveCount] = useState(0);
        const [lastActivity, setLastActivity] = useState(new Date());

        // Refs for interval management
        const activeIntervalRef = useRef(null);
        const keepAliveIntervalRef = useRef(null);

        // Cleanup function to clear all intervals
        const clearAllIntervals = () => {
            if (activeIntervalRef.current) {
                clearInterval(activeIntervalRef.current);
                activeIntervalRef.current = null;
            }
            if (keepAliveIntervalRef.current) {
                clearInterval(keepAliveIntervalRef.current);
                keepAliveIntervalRef.current = null;
            }
        };

        // Start active message counting
        const startActiveMode = () => {
            clearAllIntervals();
            setTabState(TAB_STATES.ACTIVE);
            setLastActivity(new Date());
            
            activeIntervalRef.current = setInterval(() => {
                setMessageCount(prev => prev + 1);
            }, INTERVALS.ACTIVE_MESSAGE);
        }

        // Start keep-alive mode
        const startInactiveMode = () => {
            clearAllIntervals();
            setTabState(TAB_STATES.INACTIVE);
            setLastActivity(new Date());
            
            keepAliveIntervalRef.current = setInterval(() => {
            setKeepAliveCount(prev => prev + 1);
            }, INTERVALS.KEEP_ALIVE);
        }

        const handleVisibilityChange = () => {
            if (document.hidden) {
            startInactiveMode();
            } else {
            startActiveMode();
            }
        }

        const handlePageHide = () => {
            startInactiveMode();
        }

        const handlePageShow = () => {
            startActiveMode();
        }


        // Event handlers
        const handleTabBlur = () => {
            startInactiveMode();
        }

        const handleTabFocus = () => {
            startActiveMode();
        }

        // Reset counters
        const resetCounters = () => {
            setMessageCount(0);
            setKeepAliveCount(0);
            setLastActivity(new Date());
        }

        // Format time display
        const formatTime = (date) => {
            return date.toLocaleTimeString();
        };

        const handleUserInteraction = () => {
            if (document.hidden || tabState === TAB_STATES.INACTIVE) {
            startActiveMode();
            }
            setLastActivity(new Date());
        }

        // Setup event listeners and initial state
        useEffect(() => {
            document.addEventListener('visibilitychange', handleVisibilityChange);

            // Mobile-specific events
            window.addEventListener('pagehide', handlePageHide);
            window.addEventListener('pageshow', handlePageShow)

            // Add event listeners
            window.addEventListener('blur', handleTabBlur);
            window.addEventListener('focus', handleTabFocus);

            // Mobile interaction events to detect when user returns
            const interactionEvents = ['touchstart', 'touchend', 'click', 'scroll'];
            interactionEvents.forEach(event => {
            document.addEventListener(event, handleUserInteraction, { passive: true });
            });

            // Start in active mode if page is visible, inactive if hidden
            if (document.hidden) {
            startInactiveMode();
            } else {
            startActiveMode();
            }

            // Cleanup on unmount
            return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('pagehide', handlePageHide);
            window.removeEventListener('pageshow', handlePageShow);
            window.removeEventListener('blur', handleTabBlur);
            window.removeEventListener('focus', handleTabFocus);

            interactionEvents.forEach(event => {
                document.removeEventListener(event, handleUserInteraction);
            });
            
            clearAllIntervals();
            };
        }, []);

        return (
            <WrappedComponent 
                messageCount={messageCount}
                keepAliveCount={keepAliveCount}
                TAB_STATES={TAB_STATES}
                tabState={tabState}
            />
        );
    }
}