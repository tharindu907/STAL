import React, { useState } from 'react';
import './MembersList.css';

const MembersList = () => {
  const defaultMembers = [
    { id: '123456', name: 'Pathuni Lakshani', role: 'Admin' },
    { id: '654321', name: 'Dion', role: 'Teacher' },
    { id: '789012', name: 'Sandamal', role: 'Accountant' },
    { id: '345678', name: 'Chathuni', role: 'Teacher' },
    { id: '901234', name: 'Dehemi', role: 'Admin' },
    { id: '567890', name: 'Sahan', role: 'Accountant' },
    { id: '234567', name: 'Tishan', role: 'Admin' },
    { id: '890123', name: 'Lakmini', role: 'Teacher' },
    { id: '678901', name: 'Wikum', role: 'Accountant' },
    { id: '456789', name: 'Oshadi', role: 'Admin' },
    { id: '123457', name: 'Chathuri', role: 'Admin' },
    { id: '234568', name: 'Sadakalum', role: 'Teacher' },
    { id: '345679', name: 'Roshan', role: 'Accountant' },
    { id: '456780', name: 'Malshi', role: 'Teacher' },
    { id: '567891', name: 'Tharidu', role: 'Admin' },
    { id: '678902', name: 'Yuwani', role: 'Accountant' },
    { id: '789013', name: 'Bimal', role: 'Admin' },
    { id: '890124', name: 'Chathuni', role: 'Teacher' },
    { id: '901235', name: 'Bimsara', role: 'Accountant' },
    { id: '012345', name: 'Shehana', role: 'Admin' },
  ];

  // State to hold all members, filtered members, and pagination
  const [members, setMembers] = useState([...defaultMembers].reverse()); // Latest member first
  const [filteredMembers, setFilteredMembers] = useState([...defaultMembers].reverse());

  const [selectedName, setSelectedName] = useState('');
  const [selectedID, setSelectedID] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [filters, setFilters] = useState({ name: '', id: '', role: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Handle filtering logic
  const handleFilterChange = () => {
    const filtered = members.filter((member) =>
      (filters.name === '' || member.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.id === '' || member.id.includes(filters.id)) &&
      (filters.role === '' || member.role === filters.role)
    );
    setFilteredMembers(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Handle input changes
  const handleNameChange = (e) => {
    setSelectedName(e.target.value);
  };

  const handleIDChange = (e) => {
    setSelectedID(e.target.value);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleViewClick = () => {
    setFilters({
      name: selectedName,
      id: selectedID,
      role: selectedRole,
    });
    handleFilterChange();
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredMembers.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredMembers.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="members-list-container">
      <h2 className="table-title">Members List</h2>
      <div className="filter-box">
        <div className="filter-item">
          <label htmlFor="name">Member Name</label>
          <input
            type="text"
            id="name"
            value={selectedName}
            onChange={handleNameChange}
            placeholder="Type to filter"
          />
        </div>

        <div className="filter-item">
          <label htmlFor="id">Member ID</label>
          <input
            type="text"
            id="id"
            value={selectedID}
            onChange={handleIDChange}
            placeholder="Type to filter"
          />
        </div>

        <div className="filter-item">
          <label htmlFor="role">Current Role</label>
          <select id="role" value={selectedRole} onChange={handleRoleChange}>
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Teacher">Teacher</option>
            <option value="Accountant">Accountant</option>
          </select>
        </div>

        <button className="view-btn" onClick={handleViewClick}>View</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Member Name</th>
            <th>Member ID</th>
            <th>Current Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((member, index) => (
            <tr key={member.id}>
              <td>{indexOfFirstRow + index + 1}</td>
              <td>{member.name}</td>
              <td>{member.id}</td>
              <td>{member.role}</td>
              <td className="action-buttons">
                <button className="edit-btn">Refresh Password</button>
                <button className="remove-btn">Remove Access</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="prev-btn">
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="next-btn">
          Next
        </button>
      </div>
    </div>
  );
};

export default MembersList;