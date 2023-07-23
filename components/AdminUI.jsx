import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import AdminTable from "./AdminTable";

const AdminUI = ({ users }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentData, setCurrentData] = useState(users);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    setCurrentData(users);
  }, [users]);

  const handleSearch = (value) => {
    const filtered = users.filter((user) =>
      Object.values(user).join(" ").toLowerCase().includes(value.toLowerCase())
    );
    setCurrentData(filtered);
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
    setCurrentData((prevData) => prevData.filter((user) => user.id !== id));
  };

  const handleEditToggle = (userId) => {
    setCurrentData((prevData) =>
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
    setCurrentData((prevData) =>
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
    setCurrentData((prevData) =>
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
    const updatedData = currentData.filter(
      (row) => !selectedRows.includes(row.id)
    );
    setCurrentData(updatedData);
    setSelectedRows([]);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(Math.ceil(currentData.length / rowsPerPage));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = currentData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(currentData.length / rowsPerPage);

  return (
    <div className="container h-screen">
      <SearchBar onSearch={handleSearch} />

      <AdminTable
        currentRows={currentRows}
        selectedRows={selectedRows}
        handleRowSelection={handleRowSelection}
        handleDelete={handleDelete}
        handleEditToggle={handleEditToggle}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleAllRowsSelection={handleAllRowsSelection}
      />
      <div className="flex fixed bottom-1 justify-between w-4/6">
        <button
          onClick={deleteSectedUsers}
          className="p-4 text-white text-xl rounded-full bg-[#FE5071] transform transition-transform hover:scale-105"
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
