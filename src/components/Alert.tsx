import React, { useState } from 'react';
import classNames from 'classnames';

interface AlertProps {
  color: 'red' | 'green' | 'blue' | 'yellow';
  message: string;
}

const Alert: React.FC<AlertProps> = ({ color, message }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  const textColor = {
    red: 'text-red-800',
    green: 'text-green-800',
    blue: 'text-blue-800',
    yellow: 'text-yellow-800',
  };

  const bgColor = {
    red: 'bg-red-200',
    green: 'bg-green-50',
    blue: 'bg-blue-50',
    yellow: 'bg-yellow-50',
  };

  const ringColor = {
    red: 'focus:ring-red-400',
    green: 'focus:ring-green-400',
    blue: 'focus:ring-blue-400',
    yellow: 'focus:ring-yellow-400',
  };

  return (
    <div
      id="alert-2"
      className={classNames(
        'flex items-center p-4 mb-4 rounded-lg bg-opacity-90',
        textColor[color],
        bgColor[color]
      )}
      role="alert"
    >
      <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div className="ms-3 text-sm font-medium">
        {message}
      </div>
      <button
        type="button"
        className={classNames(
          'ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8',
          `text-${color}-500`,
          `hover:bg-${color}-200`,
          ringColor[color]
        )}
        onClick={handleClose}
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
      </button>
    </div>
  );
};

export default Alert;
