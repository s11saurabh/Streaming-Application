import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import './FilterPanel.css';

const FilterPanel = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    status: '',
    sensitivityStatus: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      status: '',
      sensitivityStatus: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <FiFilter />
        <h3>Filters</h3>
      </div>

      <div className="filter-group">
        <label>Status</label>
        <select name="status" value={filters.status} onChange={handleChange}>
          <option value="">All</option>
          <option value="uploading">Uploading</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Sensitivity</label>
        <select name="sensitivityStatus" value={filters.sensitivityStatus} onChange={handleChange}>
          <option value="">All</option>
          <option value="safe">Safe</option>
          <option value="flagged">Flagged</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Sort By</label>
        <select name="sortBy" value={filters.sortBy} onChange={handleChange}>
          <option value="createdAt">Upload Date</option>
          <option value="title">Title</option>
          <option value="size">File Size</option>
          <option value="duration">Duration</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Order</label>
        <select name="sortOrder" value={filters.sortOrder} onChange={handleChange}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <button className="btn btn-secondary filter-reset" onClick={resetFilters}>
        Reset Filters
      </button>
    </div>
  );
};

export default FilterPanel;