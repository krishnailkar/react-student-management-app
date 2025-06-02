import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';

const AddMarkPage = () => {
  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState('');
  const [mark, setMark] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/marks', { studentId, subject, mark });
      alert('Mark added successfully');
      navigate('/marks');
    } catch (error) {
      console.error('Error adding mark', error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between bg-light p-1 mb-2">
        <h2 className='m-2'>Add Marks</h2>
        <Link to="/marks" className="btn btn-primary m-2">Go Back</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Student ID</label>
          <input
            type="text"
            className="form-control"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            type="text"
            className="form-control"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mark</label>
          <input
            type="number"
            className="form-control"
            value={mark}
            onChange={(e) => setMark(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Mark</button>
        <Link to="/marks" className="btn btn-danger m-2">Cancel</Link>
      </form>
    </div>
  );
};

export default AddMarkPage;

