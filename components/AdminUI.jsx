import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import ActionButtons from "./ActionButtons";

const AdminUI = ({ users }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelection = (rowId) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const handleAllRowsSelection = (event) => {
    if(event.target.checked) {
        const allRowIds = users.map((row) => row.id);
        setSelectedRows(allRowIds);
    } else {
        setSelectedRows([]);
    }
  }

  return (
    <div className="container">
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
          {users.map((row) => (
            <tr key={row.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleRowSelection(row.id)}
                  className="rounded text-blue-500"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{row.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-500">Edit</button>
                <button className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUI;
