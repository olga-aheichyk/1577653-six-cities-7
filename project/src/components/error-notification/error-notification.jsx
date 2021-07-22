import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ERROR_MESSAGE_SHOWING_TIME = 5000;

function ErrorNotification(props) {
  const {message} = props;

  const [isActive, setActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(false);
    }, ERROR_MESSAGE_SHOWING_TIME);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      {isActive && (
        <div style={{
          width: '600px',
          height: '150px',
          position: 'fixed',
          top: '10px',
          left: 'center',
          right: 'center',
          backgroundColor: 'red',
          textAlign: 'center',
          fontSize: '40px',
          padding: '20px 10px',
          zIndex: 2,
        }}
        >
          {message}
        </div>
      )}
    </div>);
}

ErrorNotification.defaultProps = {
  message: 'Something went wrong. Please retry later',
};

ErrorNotification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorNotification;
