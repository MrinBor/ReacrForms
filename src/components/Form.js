import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: '',
  });

  const [errors, setErrors] = useState({});
  const [passwordShown, setPasswordShown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const validate = () => {
    const errors = {};
    const namePattern = /^[A-Za-z\s]+$/;
    const usernamePattern = /^[A-Za-z0-9_]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const phonePattern = /^\d{10}$/; // Phone number should be exactly 10 digits
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const aadharPattern = /^\d{12}$/;

    if (!formData.firstName) {
      errors.firstName = 'First Name is required';
    } else if (!namePattern.test(formData.firstName)) {
      errors.firstName = 'First Name is invalid';
    }

    if (!formData.lastName) {
      errors.lastName = 'Last Name is required';
    } else if (!namePattern.test(formData.lastName)) {
      errors.lastName = 'Last Name is invalid';
    }

    if (!formData.username) {
      errors.username = 'Username is required';
    } else if (!usernamePattern.test(formData.username)) {
      errors.username = 'Username is invalid';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!passwordPattern.test(formData.password)) {
      errors.password = 'Password must be at least 8 characters long and include at least one letter and one number';
    }

    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!phonePattern.test(formData.phone)) {
      errors.phone = 'Phone number must be exactly 10 digits';
    }

    if (!formData.country) {
      errors.country = 'Country is required';
    }

    if (!formData.city) {
      errors.city = 'City is required';
    }

    if (!formData.panNo) {
      errors.panNo = 'Pan No. is required';
    } else if (!panPattern.test(formData.panNo)) {
      errors.panNo = 'Pan No. is invalid';
    }

    if (!formData.aadharNo) {
      errors.aadharNo = 'Aadhar No. is required';
    } else if (!aadharPattern.test(formData.aadharNo)) {
      errors.aadharNo = 'Aadhar No. is invalid';
    }

    return errors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      localStorage.removeItem('formData');
      navigate('/success', { state: formData });
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>First Name</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        {errors.firstName && <p className="error">{errors.firstName}</p>}
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        {errors.lastName && <p className="error">{errors.lastName}</p>}
      </div>
      <div className="form-group">
        <label>Username</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
        {errors.username && <p className="error">{errors.username}</p>}
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type={passwordShown ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} />
        <button type="button" onClick={() => setPasswordShown(!passwordShown)}>Show/Hide Password</button>
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <div className="form-group">
        <label>Phone No.</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        {errors.phone && <p className="error">{errors.phone}</p>}
      </div>
      <div className="form-group">
        <label>Country</label>
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
        </select>
        {errors.country && <p className="error">{errors.country}</p>}
      </div>
      <div className="form-group">
        <label>City</label>
        <select name="city" value={formData.city} onChange={handleChange}>
          <option value="">Select City</option>
          <option value="Mumbai">Mumbai</option>
          <option value="New York">New York</option>
        </select>
        {errors.city && <p className="error">{errors.city}</p>}
      </div>
      <div className="form-group">
        <label>Pan No.</label>
        <input type="text" name="panNo" value={formData.panNo} onChange={handleChange} />
        {errors.panNo && <p className="error">{errors.panNo}</p>}
      </div>
      <div className="form-group">
        <label>Aadhar No.</label>
        <input type="text" name="aadharNo" value={formData.aadharNo} onChange={handleChange} />
        {errors.aadharNo && <p className="error">{errors.aadharNo}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
