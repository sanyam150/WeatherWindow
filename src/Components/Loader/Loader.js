import React, { useState, useEffect } from 'react';
import { LOADERCOLORINDEX } from '../../constants/constants';
import '../css/Loader.css';

export const Loader = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex < 4 ? prevIndex + 1 : 0));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='spinner_wrapper'>
      <div
        className={`spinner-border text-${LOADERCOLORINDEX[index]}`}
        role='status'
      >
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  );
};
