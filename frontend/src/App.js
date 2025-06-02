import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AddStudentPage from './pages/AddStudentPage';
import EditStudentPage from './pages/EditStudentPage';
import ViewStudentPage from './pages/ViewStudentPage';
import AddMarkPage from './pages/AddMarkPage';
import EditMarkPage from './pages/EditMarkPage';
import AllMarksPage from './pages/AllMarksPage';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container my-4 py-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-student" element={<AddStudentPage />} />
          <Route path="/edit-student/:id" element={<EditStudentPage />} />
          <Route path="/view-student/:id" element={<ViewStudentPage />} />
          <Route path="/add-mark" element={<AddMarkPage />} />
          <Route path="/edit-mark/:id" element={<EditMarkPage />} />
          <Route path="/marks" element={<AllMarksPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;










