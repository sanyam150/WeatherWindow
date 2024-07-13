import React, { useState } from 'react';
import '../css/ToggleButton.css';

const ToggleButton = ({ parent_wrapper_width = '150' }) => {
  const [selectedValue, setSelectedValue] = useState('degree_Celcius');
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div
      className='toggle_button_parent_wrapper'
      style={{
        width: `${parent_wrapper_width}px`,
      }}
    >
      <div className='toggle_button_wrapper'>
        <div className='input_toggle_radio_wrapper'>
          <input
            type='radio'
            name='temperature'
            value='degree_Celcius'
            className='input_toggle_radio'
            checked={selectedValue === 'degree_Celcius'}
            onChange={handleChange}
          />
          <div>&deg;C</div>
        </div>
        <div className='toggle_button_slider_wrapper'>
          <div
            className={`toggle_button_slider ${
              selectedValue === 'degree_Celcius' ? '' : 'toggle'
            }`}
          ></div>
        </div>
        <div className='input_toggle_radio_wrapper'>
          <input
            type='radio'
            name='temperature'
            value='degree_fahrenheit'
            className='input_toggle_radio'
            checked={selectedValue === 'degree_fahrenheit'}
            onChange={handleChange}
          />
          <div>&deg;F</div>
        </div>
      </div>
    </div>
  );
};

export default ToggleButton;
