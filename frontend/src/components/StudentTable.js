import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';

const StudentTable = ({ students }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      alert('Student deleted successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting student', error);
    }
  };
  return (
    <table className="table table-striped table-bordered border-dark text-center">
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
    {students.length === 0 ? (
      <tr>
        <td colSpan="5">No data available</td>
      </tr>
    ) : (
      students.map((student) => (
        <tr key={student.id}>
          <td>{student.id}</td>
          <td>{student.name}</td>
          <td>{student.age}</td>
          <td>{student.email}</td>
          <td>
            <Link to={`/view-student/${student.id}`} className="btn btn-info btn-sm me-2"><FontAwesomeIcon icon={faEye} /> View</Link>
            <Link to={`/edit-student/${student.id}`} className="btn btn-warning btn-sm me-2"><FontAwesomeIcon icon={faEdit} /> Edit</Link>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student.id)}><FontAwesomeIcon icon={faTrashAlt} /> Delete</button>
          </td>
        </tr>
      ))
    )}
  </tbody>
    </table>
  );
};

export default StudentTable;
