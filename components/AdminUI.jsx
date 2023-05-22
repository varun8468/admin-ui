import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

const AdminUI = ({ users }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredData, setFilteredData] = useState(users);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handleSearch = (value) => {
    const filtered = users.filter((user) =>
      Object.values(user).join(" ").toLowerCase().includes(value.toLowerCase())
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
      const allRowIds = currentRows.map((row) => row.id);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleDelete = (id) => {
    setFilteredData((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const handleEditToggle = (userId) => {
    setFilteredData((prevData) =>
      prevData.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            isEditing: !user.isEditing,
          };
        }
        return user;
      })
    );
  };

  const handleEdit = (userId, field, value) => {
    setFilteredData((prevData) =>
      prevData.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            [field]: value,
          };
        }
        return user;
      })
    );
  };

  const handleSave = (userId) => {
    setFilteredData((prevData) =>
      prevData.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            isEditing: false,
          };
        }
        return user;
      })
    );
  };

  const deleteSectedUsers = () => {
    const updatedData = users.filter((row) => !selectedRows.includes(row.id));
    setFilteredData(updatedData);
    setSelectedRows([]);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(Math.ceil(filteredData.length / rowsPerPage));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="container h-screen">
      <SearchBar onSearch={handleSearch} />

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
                  checked={selectedRows.length === currentRows.length}
                  onChange={handleAllRowsSelection}
                  className="rounded text-blue-500"
                />
              </span>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-2xl font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-2xl font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-2xl font-medium text-gray-500 uppercase tracking-wider"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-2xl font-medium text-gray-500 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentRows.map((user) => (
            <tr
              key={user.id}
              className={selectedRows.includes(user.id) ? "bg-gray-200" : ""}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(user.id)}
                  onChange={() => handleRowSelection(user.id)}
                  className="rounded text-blue-500"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.isEditing ? (
                  <input
                    type="text"
                    value={user.name}
                    className="block w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) =>
                      handleEdit(user.id, "name", e.target.value)
                    }
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.isEditing ? (
                  <input
                    type="text"
                    value={user.email}
                    className="block w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) =>
                      handleEdit(user.id, "email", e.target.value)
                    }
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.isEditing ? (
                  <input
                    type="text"
                    value={user.role}
                    className="block w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) =>
                      handleEdit(user.id, "role", e.target.value)
                    }
                  />
                ) : (
                  <span>{user.role}</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.isEditing ? (
                  <button
                    className="text-blue-500 pr-4"
                    onClick={() => handleSave(user.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="text-blue-500 pr-4"
                    onClick={() => handleEditToggle(user.id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="py-8 flex justify-between">
        <button
          onClick={deleteSectedUsers}
          className="p-8 text-white text-xl rounded-lg bg-red-800 transform transition-transform hover:scale-105"
        >
          Delete Selected
        </button>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
          goToFirstPage={goToFirstPage}
          goToLastPage={goToLastPage}
          goToPreviousPage={goToPreviousPage}
          goToNextPage={goToNextPage}
        />
      </div>
    </div>
  );
};

export default AdminUI;
