import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditStudentPage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/students/${id}`);
        
        if (response.data && response.data.student) {
          const student = response.data.student;
          setName(student.name || '');
          setAge(student.age || '');
          setEmail(student.email || '');
        } else {
          console.error('No student data found');
        }
      } catch (error) {
        console.error('Error fetching student data', error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedStudent = { name, age, email };
      const response = await axios.put(`http://localhost:5000/api/students/${id}`, updatedStudent);
      
      if (response.data) {
        alert('Student updated successfully');
        navigate('/');
      } else {
        console.error('Failed to update student');
      }
    } catch (error) {
      console.error('Error updating student', error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between bg-light p-1 mb-2">
        <h2 className='m-2'>Edit Student</h2>
        <Link to="/" className="btn btn-primary m-2">Go Back</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age || ''}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Student</button>
        <Link to="/" className="btn btn-danger m-2">Cancel</Link>
      </form>
    </div>
  );
};

export default EditStudentPage;
