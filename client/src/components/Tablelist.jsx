//src/components/Tablelist.jsx

import React from 'react';

export const TableList = ({ clients, onEditClient, onDeleteClient }) => {
  const handleEdit = (client) => {
    if (onEditClient) {
      onEditClient(client);
    }
  };

  const handleDelete = (id) => {
    if (onDeleteClient) {
      onDeleteClient(id);
    }
  };

  return (
    <div className="overflow-x-auto mt-10">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Rate</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4">No clients found. Add a client to get started.</td>
            </tr>
          ) : (
            clients.map((client) => (
              <tr 
                key={client.id}
                className="hover:bg-blue-50 hover:shadow-md group transition-all duration-300"
              >
                <td className="group-hover:font-bold">{client.id}</td>
                <td className="group-hover:text-blue-600">{client.name}</td>
                <td>
                  <a 
                    href={`mailto:${client.email}`} 
                    className="text-gray-600 group-hover:text-blue-500 group-hover:underline"
                  >
                    {client.email}
                  </a>
                </td>
                <td className="group-hover:italic">{client.job}</td>
                <td className="group-hover:text-green-600">{client.rate}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    client.status === "Active" ? "bg-blue-100 text-blue-800 group-hover:bg-blue-200" :
                    client.status === "Inactive" ? "bg-red-100 text-red-800 group-hover:bg-red-200" :
                    "bg-green-100 text-green-800 group-hover:bg-green-200"
                  } transition-colors duration-300`}>
                    {client.status}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(client)}
                    className="btn btn-info btn-sm text-white hover:bg-sky-600"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(client.id)}
                    className="btn btn-error btn-sm text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};