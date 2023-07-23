import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const AdminTable = ({
  currentRows,
  selectedRows,
  handleRowSelection,
  handleDelete,
  handleEditToggle,
  handleEdit,
  handleSave,
  handleAllRowsSelection,
}) => {
  return (
    <table className="min-w-full relative divide-y divide-gray-200">
      <thead>
        <tr>
          <th
            scope="col"
            className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
            className="px-6 py-1 text-left text-2xl font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-1 text-left text-2xl font-medium text-gray-500 uppercase tracking-wider"
          >
            Email
          </th>
          <th
            scope="col"
            className="px-6 py-1 text-left text-2xl font-medium text-gray-500 uppercase tracking-wider"
          >
            Role
          </th>
          <th
            scope="col"
            className="px-6 py-1 text-left text-2xl font-medium text-gray-500 uppercase tracking-wider"
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
                  className="block w-full px-4 py-1 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => handleEdit(user.id, "name", e.target.value)}
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
                  className="block w-full px-4 py-1 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => handleEdit(user.id, "email", e.target.value)}
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
                  className="block w-full px-4 py-1 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => handleEdit(user.id, "role", e.target.value)}
                />
              ) : (
                <span>{user.role}</span>
              )}
            </td>
            <td className="pl-6 whitespace-nowrap">
              {user.isEditing ? (
                <button
                  className="text-blue-500 mr-2"
                  onClick={() => handleSave(user.id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="text-blue-500 mr-8"
                  onClick={() => handleEditToggle(user.id)}
                >
                  <FaEdit color="black" size={25} />
                </button>
              )}
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-500"
              >
                <MdOutlineDelete size={25} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminTable;
