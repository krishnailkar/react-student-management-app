import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MarkTable from '../components/MarkTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AllMarksPage = () => {
  const [marks, setMarks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/marks?page=${page}&limit=10`);
        setMarks(response.data.marks);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching marks', error);
      }
    };
    fetchMarks();
  }, [page]);

  return (
    <div>
      <div className="d-flex justify-content-between bg-light p-1 mb-2">
        <h2 className='m-2'>Marks</h2>
        <Link to="/add-mark" className="btn btn-primary m-2"><FontAwesomeIcon icon={faPlus} /> Add Mark</Link>
      </div>
      <MarkTable marks={marks} />
      <div className="mt-4">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="btn btn-secondary">Previous</button>
        <span className="mx-3">Page {page} of {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="btn btn-secondary">Next</button>
      </div>
    </div>
  );
};

export default AllMarksPage;

