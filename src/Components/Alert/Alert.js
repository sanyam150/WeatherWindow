import React, { useEffect } from 'react';
import '../css/Alert.css';

const Alert = ({ message, setError, backGroundColor }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setError({
          isError: false,
          message: '',
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, setError]);

  return (
    <>
      <div
        className={`Alert_wrapper ${message && backGroundColor} fw-bold`}
        role='alert'
      >
        {message}
      </div>
    </>
  );
};

export default Alert;
