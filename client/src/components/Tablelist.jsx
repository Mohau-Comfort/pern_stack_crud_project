//src/components/Tablelist.jsx

import React from 'react';

const clients = [
  { name: "Tom Cruise", email: "tom@email.com", job: "Software Engineer", rate: "$150/hr", status: "Active" },
  { name: "Denzel Washington", email: "denzel@email.com", job: "Oracle DBA", rate: "$175/hr", status: "Inactive" },
  { name: "Stephen Curry", email: "chef@email.com", job: "Cyber Security", rate: "$200/hr", status: "Available" }
];

export const TableList = () => {
  const handleEdit = (id) => {
    console.log("Edit client with ID:", id);
    // Add your edit logic here
  };

  const handleDelete = (id) => {
    console.log("Delete client with ID:", id);
    // Add your delete logic here
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
          {clients.map((client, index) => (
            <tr 
              key={index}
              className="hover:bg-blue-50 hover:shadow-md group transition-all duration-300"
            >
              <td className="group-hover:font-bold">{index + 1}</td>
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
                  onClick={() => handleEdit(index + 1)}
                  className="btn btn-info btn-sm text-white hover:bg-sky-600"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(index + 1)}
                  className="btn btn-error btn-sm text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};