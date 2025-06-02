import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AddStudentPage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/students', { name, age, email });
      alert('Student added successfully');
      navigate('/');
    } catch (error) {
      console.error('Error adding student', error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between bg-light p-1 mb-2">
        <h2 className='m-2'>Add Student</h2>
        <Link to="/" className="btn btn-primary m-2">Go Back</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Student</button>
        <Link to="/" className="btn btn-danger m-2">Cancel</Link>
      </form>
    </div>
  );
};

export default AddStudentPage;
