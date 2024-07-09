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
