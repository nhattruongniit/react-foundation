import { Component } from 'react';
import withDetectionTab from '../hoc/withDetectionTab';

class DetectionTabClass extends Component {
  constructor() {
    super()
  }

  render() {
    const { TAB_STATES, tabState, messageCount, keepAliveCount } = this.props;      

    return (
      <>
          <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Tab Activity Monitor
            </h2>
            
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
            </div>

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
                  Sent every 10 seconds when inactive
                </p>
              </div>
            </div>
          </div>
      </>
    );
  }
}

export default withDetectionTab(DetectionTabClass);