import { HiSun } from 'react-icons/hi';
import { IoRainySharp } from 'react-icons/io5';
import { FaCloud } from 'react-icons/fa';

export const handleFormData = (e, setFormData) => {
  const { name, value } = e.target;
  setFormData((previousData) => ({
    ...previousData,
    [name]: value,
  }));
};

export const isFormFieldsEmpty = (formData) => {
  let fields = { emptyFields: '', nonEmptyFields: '' };
  for (let key in formData) {
    if (!formData[key].trim()) {
      fields.emptyFields += ' ' + key[0].toUpperCase() + key.slice(1);
    } else {
      fields.nonEmptyFields += ' ' + key[0].toUpperCase() + key.slice(1);
    }
  }
  return fields;
};

export const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }
  return true;
};

export const sleep = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay * 1000);
  });
};

export const resetFields = (stateSetter, fields) => {
  stateSetter((prevState) => {
    const newState = { ...prevState };
    fields.forEach((field) => {
      if (newState.hasOwnProperty(field)) {
        newState[field] = '';
      }
    });
    return newState;
  });
};

const getCSSVariable = (variableName) => {
  return getComputedStyle(document.documentElement).getPropertyValue(
    variableName
  );
};

export const setCardColorTheme = (weather_type) => {
  weather_type = weather_type.toLowerCase();
  switch (weather_type) {
    case 'rain':
      return getCSSVariable('--colorCard_Rain');
    case 'clouds':
      return getCSSVariable('--colorNavbarBackgroundLight_1');
    default:
      return getCSSVariable('--colorToggleButton');
  }
};

export const weatherImage = (weatherType, colorTheme) => {
  const weatherUpdated = weatherType.toLowerCase();
  switch (weatherUpdated) {
    case 'rain':
      return (
        <IoRainySharp
          style={{
            boxShadow: `0px 0px 7px -1px ${colorTheme}`,
            color: colorTheme,
            padding: '5px',
            borderRadius: '8px',
          }}
        />
      );
    case 'clouds':
      return (
        <FaCloud
          style={{
            boxShadow: `0px 0px 7px -1px ${colorTheme}`,
            color: colorTheme,
            padding: '5px',
            borderRadius: '8px',
          }}
        />
      );
    case 'clear':
      return (
        <HiSun
          style={{
            boxShadow: `0px 0px 7px -1px ${colorTheme}`,
            color: colorTheme,
            padding: '5px',
            borderRadius: '8px',
          }}
        />
      );
    default:
      return (
        <HiSun
          style={{
            boxShadow: `0px 0px 7px -1px ${colorTheme}`,
            color: colorTheme,
            padding: '5px',
            borderRadius: '8px',
          }}
        />
      );
  }
};

export const timeData = (timeStamp) => {
  const date = new Date(timeStamp * 1000);
  const day = date.toLocaleString('en-US', { weekday: 'long' });
  const dayOfMonth = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();

  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return { day, dayOfMonth, month, year, time };
};
