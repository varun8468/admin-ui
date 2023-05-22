import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import ActionButtons from "./ActionButtons";

const AdminUI = ({ users }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState(users);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter the user data based on the search query
    const filtered = users.filter((user) =>
      Object.values(user)
        .join(' ')
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleRowSelection = (rowId) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const handleAllRowsSelection = (event) => {
    if (event.target.checked) {
      const allRowIds = users.map((row) => row.id);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleDelete = (id) => {
    setFilteredData((prevUsers) => prevUsers.filter((user) => user.id !== id));
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="container">
      <div className="w-full">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by name, email or role"
        className="border w-full border-gray-300 px-10 py-2 rounded-md mb-4"
      />
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <span>
                <input
                  type="checkbox"
                  checked={selectedRows.length === users.length}
                  onChange={handleAllRowsSelection}
                  className="rounded text-blue-500"
                />
              </span>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(user.id)}
                  onChange={() => handleRowSelection(user.id)}
                  className="rounded text-blue-500"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-500 pr-4">Edit</button>
                <button onClick={() => handleDelete(user.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination usersPerPage={usersPerPage} totalUsers={users.length} />
    </div>
  );
};

export default AdminUI;
