import React from 'react';

const clients = [
  { name: "Tom Cruise", job: "Software Engineer", email: "tom@email.com" },
  { name: "Denzel Washington", job: "Oracle DBA", email: "denzel@email.com" },
  { name: "Stephen Curry", job: "Cyber Security", email: "chef@email.com" }
];

export const Tablelist = () => {
  return (
    <div className="overflow-x-auto mt-10">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job Title</th>
            <th>Email</th>
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
              <td className="group-hover:italic">{client.job}</td>
              <td>
                <a 
                  href={`mailto:${client.email}`} 
                  className="text-gray-600 group-hover:text-blue-500 group-hover:underline"
                >
                  {client.email}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};