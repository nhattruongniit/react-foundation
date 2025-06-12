export const createDetectionActivity = ({ 
    callbackKeepAlive = () => {},
    ACTIVE_TAB = 1000, // 1s
    KEEP_ALIVE = 10 * 1000, // 10s
} = {}) => {
    let activeInterval = null;
    let keepAliveInterval = null; 
    let isFirstMount = true;
    let isSubscribed = false;
    const listenersCallbackActiveTab = [];
    const listenersCallbackKeepAlive = [];

    const notifyListenersActiveTab = () => {
        listenersCallbackActiveTab.forEach((listener) => listener());
    };

    const onCallbackActiveTab = (listener) => {
        if (typeof listener === 'function') {
            listenersCallbackActiveTab.push(listener);
        }
    };

    const notifyListenersKeepAlive = () => {
        listenersCallbackKeepAlive.forEach((listener) => listener());
    };

    const onKeepAlive = (listener) => {
        if (typeof listener === 'function') {
            listenersCallbackKeepAlive.push(listener);
        }
    };

    const clearAllIntervals = () => {
        if (activeInterval) {
            clearInterval(activeInterval);
            activeInterval = null;
        }
        if (keepAliveInterval) {
            clearInterval(keepAliveInterval);
            keepAliveInterval = null;
        }
    };

    const startActiveMode = () => {
        clearAllIntervals();
        console.log('Starting ACTIVE mode...');

        if (isFirstMount) {
            notifyListenersActiveTab();
            isFirstMount = false;
        }

        activeInterval = setInterval(() => {
            notifyListenersActiveTab();
        }, ACTIVE_TAB);
    }

    // Start keep-alive mode
    const startInactiveMode = () => {
        clearAllIntervals();
        console.log('Starting INACTIVE mode...');
        keepAliveInterval = setInterval(() => {
            notifyListenersKeepAlive();
        }, KEEP_ALIVE);
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

    const handleTabBlur = () => {
        startInactiveMode();
    }

    const handleTabFocus = () => {
        startActiveMode();
    }

    const handleUserInteraction = () => {
        if (document.hidden) {
            startActiveMode();
        }
    }
    
    const subscribe = () => {
        if (isSubscribed) return;

        const interactionEvents = ['touchstart', 'touchend', 'click', 'scroll'];
        interactionEvents.forEach(event => {
            document.addEventListener(event, handleUserInteraction, { passive: true });
        });

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('pagehide', handlePageHide);
        window.addEventListener('pageshow', handlePageShow)
        window.addEventListener('blur', handleTabBlur);
        window.addEventListener('focus', handleTabFocus);

        // Start in active mode if page is visible, inactive if hidden
        if (document.hidden) {
            startInactiveMode();
        } else {
            startActiveMode();
        }

        isSubscribed = true;
    }

    const unsubscribe = () => {
        if (!isSubscribed) return;

        const interactionEvents = ['touchstart', 'touchend', 'click', 'scroll'];
        interactionEvents.forEach(event => {
            document.removeEventListener(event, handleUserInteraction);
        });

        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('pagehide', handlePageHide);
        window.removeEventListener('pageshow', handlePageShow);
        window.removeEventListener('blur', handleTabBlur);
        window.removeEventListener('focus', handleTabFocus);

        clearAllIntervals();
        isSubscribed = false;
    }

    return {
        subscribe,
        unsubscribe,
        onCallbackActiveTab,
        onKeepAlive
    };
}