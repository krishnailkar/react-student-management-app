import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

const MarkTable = ({ marks }) => {
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
    <table className="table table-striped table-bordered border-dark text-center">
  <thead>
    <tr>
      <th>Student ID</th>
      <th>Student Name</th>
      <th>Subject</th>
      <th>Mark</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {marks.length === 0 ? (
      <tr>
        <td colSpan="4">No data available</td>
      </tr>
    ) : (
      marks.map((mark) => (
        <tr key={mark.id}>
          <td>{mark.student_id}</td>
          <td>{mark.student_id}</td>
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
  );
};

export default MarkTable;
