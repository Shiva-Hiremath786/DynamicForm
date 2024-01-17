import React, { useState } from 'react';
import './App.css';

const DynamicFormGenerator = () => {
  const [formFields, setFormFields] = useState([]);

  const addFormField = (type) => {
    setFormFields((prevFields) => [
      ...prevFields,
      { id: Date.now(), type, value: '' },
    ]);
  };

  const removeFormField = (id) => {
    setFormFields((prevFields) =>
      prevFields.filter((field) => field.id !== id)
    );
  };

  const handleInputChange = (id, value) => {
    setFormFields((prevFields) =>
      prevFields.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };

  const handleFileChange = (id, files) => {
    const file = files[0];

    if (file && isImageOrPdf(file)) {
      handleInputChange(id, file);
    }
  };

  const validateForm = () => {
    // If there are no form fields, return false (invalid)
    if (formFields.length === 0) {
      alert('Please add at least one field before submitting.');
      return false;
    }
  
    // Creating an array of validations for each form field
    const validations = formFields.map((field) => {
      switch (field.type) {
        case 'text':
          // For text, check if the value is not empty
          return field.value.trim() !== '';
        case 'email':
          // For email, use a regular expression to check if it's a valid email address
          return /\S+@\S+\.\S+/.test(field.value);
        case 'phone':
          // For phone, use a regular expression to check if it's a valid 10-digit number
          return /^[0-9]{10}$/.test(field.value);
        case 'dropdown':
          // For dropdown, check if the value is not empty
          return field.value.trim() !== '';
        case 'file':
          // For file, check if the value is not undefined or empty
          return field.value !== undefined && field.value !== '';
        case 'checkbox':
          // Checkbox is always considered valid
          return true;
        case 'radio':
          // For radio, check if the value is not undefined or empty
          return field.value !== undefined && field.value !== '';
        default:
          return false; // Unknown field type
      }
    });
  
    // Check if all validations are true
    return validations.every((isValid) => isValid);
  };
  

  const handleSubmit = () => {
    // Basic form validation
    if (validateForm()) {
      // Display submitted data in JSON format
      const formData = {
        formFields,
      };
      console.log('Submitted Data:', formData);
      alert('Successfully submitted!');
    } else {
      alert('Please Fill the form completely');
    }
  };

  const renderFormField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            placeholder={`Enter name`}
            value={field.value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );
      case 'email':
        return (
          <input
            type="email"
            placeholder={`Enter ${field.type}...`}
            value={field.value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );
      case 'phone':
        return (
          <input
            type="tel"
            placeholder={`Enter ${field.type}...`}
            value={field.value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );
      case 'file':
        return (
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange(field.id, e.target.files)}
          />
        );
      case 'checkbox':
        return (
          <>
            <label>
              <input
                type="checkbox"
                checked={field.value}
                onChange={() => handleInputChange(field.id, !field.value)}
              />
              {field.label || 'Checkbox'}
            </label>
          </>
        );
      case 'radio':
        return (
          <>
            <label>
              <input
                type="radio"
                name={`radio_${field.id}`}
                value="Male"
                checked={field.value === 'Male'}
                onChange={() => handleInputChange(field.id, 'Male')}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name={`radio_${field.id}`}
                value="Female"
                checked={field.value === 'Female'}
                onChange={() => handleInputChange(field.id, 'Female')}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name={`radio_${field.id}`}
                value="Others"
                checked={field.value === 'Others'}
                onChange={() => handleInputChange(field.id, 'Others')}
              />
              Others
            </label>
          </>
        );
      case 'dropdown':
        return (
          <select
            value={field.value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          >
            <option value="">Select Courses</option>
            <option value="HSC">HSC</option>
            <option value="Diploma">Diploma</option>
            <option value="UG">UG</option>
            <option value="PG">PG</option>
          </select>
        );
      default:
        return null;
    }
  };

  const isImageOrPdf = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    return allowedTypes.includes(file.type);
  };

  return (
    <div className="dynamic-form-container">
      <h1>Dynamic Form Generator</h1>
      <div className="form-buttons">
        <button onClick={() => addFormField('text')}>Add name</button>
        <button onClick={() => addFormField('email')}>Add Email</button>
        <button onClick={() => addFormField('phone')}>Add Phone Number</button>
        <button onClick={() => addFormField('checkbox')}>Add Checkbox</button>
        <button onClick={() => addFormField('radio')}>Add Radio Buttons</button>
        <button onClick={() => addFormField('dropdown')}>Add Dropdown</button>
        <button onClick={() => addFormField('file')}>Add File Upload</button>
      </div>

      {formFields.map((field) => (
        <div key={field.id} className="form-field">
          {renderFormField(field)}
          <button onClick={() => removeFormField(field.id)}>Remove</button>
        </div>
      ))}

      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default DynamicFormGenerator;
