import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleChange}
      className="border pl-8 w-full border-gray-300 rounded px-3 py-2 mb-5"
      placeholder="Search by name, email or role"
    />
  );
};

export default SearchBar;