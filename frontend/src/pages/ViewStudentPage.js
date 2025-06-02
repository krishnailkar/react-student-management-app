import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ViewStudentPage = () => {
  const [student, setStudent] = useState({});
  const [marks, setMarks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/students/${id}`);
        setStudent(response.data.student);
        setMarks(response.data.marks);
      } catch (error) {
        console.error('Error fetching student data', error);
      }
    };
    fetchStudentData();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/marks/${id}`);
      alert('Mark deleted successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting mark', error);
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-between bg-light p-1 mb-2">
        <h2 className='m-2'>Student Details</h2>
        <Link to="/" className="btn btn-primary m-2">Go Back</Link>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{student.name}</h5>
          <p className="card-text"><strong>Age:</strong> {student.age}</p>
          <p className="card-text"><strong>Email:</strong> {student.email}</p>
        </div>
      </div>
      <div className="d-flex justify-content-between bg-light p-1 mb-2">
        <h2 className='m-2'>Marks</h2>
      </div>
      <table className="table table-bordered border-dark text-center">
      <thead>
        <tr>
          <th>Subject</th>
          <th>Mark</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {marks.length === 0 ? (
          <tr>
            <td colSpan="3">No data available</td>
          </tr>
        ) : (
          marks.map((mark) => (
            <tr key={mark.id}>
              <td>{mark.subject}</td>
              <td>{mark.mark}</td>
              <td>
                <Link to={`/edit-mark/${mark.id}`} className="btn btn-warning btn-sm me-2"><FontAwesomeIcon icon={faEdit} /> Edit</Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(mark.id)}><FontAwesomeIcon icon={faTrashAlt} /> Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
      <div className="mt-4">
        <Link to={`/edit-student/${id}`} className="btn btn-warning me-2"><FontAwesomeIcon icon={faEdit} /> Edit Student</Link>
      </div>
    </div>
  );
};

export default ViewStudentPage;
