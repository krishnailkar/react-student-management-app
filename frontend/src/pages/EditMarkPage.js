import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditMarkPage = () => {
  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState('');
  const [mark, setMark] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarkData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/marks/${id}`);
        if (response.data && response.data.mark) {
          const mark = response.data.mark;
          setStudentId(mark.student_id || '');
          setSubject(mark.subject || '');
          setMark(mark.mark || '');
        } else {
          console.error('No mark data found');
        }
      } catch (error) {
        console.error('Error fetching mark data', error);
      }
    };
    fetchMarkData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedMark = { studentId, subject, mark };
      const response = await axios.put(`http://localhost:5000/api/marks/${id}`, updatedMark);
      
      if (response.data) {
        alert('Mark updated successfully');
        navigate('/marks');
      } else {
        console.error('Failed to update mark');
      }
    } catch (error) {
      console.error('Error updating mark', error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between bg-light p-1 mb-2">
        <h2 className='m-2'>Edit Marks</h2>
        <Link to="/marks" className="btn btn-primary m-2">Go Back</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Student ID</label>
          <input
            type="text"
            className="form-control"
            value={studentId || ''}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            type="text"
            className="form-control"
            value={subject || ''}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mark</label>
          <input
            type="number"
            className="form-control"
            value={mark || ''}
            onChange={(e) => setMark(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Mark</button>
        <Link to="/marks" className="btn btn-danger m-2">Cancel</Link>
      </form>
    </div>
  );
};

export default EditMarkPage;

