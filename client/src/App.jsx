// src/App.jsx
import { useState } from 'react';
import ModalForm from "./components/ModalForm";
import Navbar from "./components/Navbar";
import { TableList } from "./components/TableList";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentClient, setCurrentClient] = useState(null);
  const [clients, setClients] = useState([
    { id: 1, name: "Tom Cruise", email: "tom@email.com", job: "Software Engineer", rate: "$150/hr", status: "Active" },
    { id: 2, name: "Denzel Washington", email: "denzel@email.com", job: "Oracle DBA", rate: "$175/hr", status: "Inactive" },
    { id: 3, name: "Stephen Curry", email: "chef@email.com", job: "Cyber Security", rate: "$200/hr", status: "Available" }
  ]);

  const handleOpen = (mode, client = null) => {
    setModalMode(mode);
    setCurrentClient(client);
    setIsOpen(true);
  };

  const handleSubmit = (formData) => {
    if (modalMode === "add") {
      // Generate a new unique ID (in a real app, this would come from the backend)
      const newId = Math.max(...clients.map(client => client.id), 0) + 1;
      
      // Add the new client to the list
      setClients([...clients, { id: newId, ...formData }]);
      console.log("Added new client:", formData);
    } else {
      // Update the existing client
      setClients(clients.map(client => 
        client.id === currentClient.id ? { ...client, ...formData } : client
      ));
      console.log("Updated client:", formData);
    }
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    // Remove the client from the list
    setClients(clients.filter(client => client.id !== id));
    console.log("Deleted client with ID:", id);
  };

  return (
    <>
      <Navbar onOpen={() => handleOpen("add")} />
      <div className="pt-16">
        <TableList 
          clients={clients} 
          onEditClient={(client) => handleOpen("edit", client)} 
          onDeleteClient={handleDelete}
        />
        <ModalForm
          isOpen={isOpen}
          mode={modalMode}
          client={currentClient}
          onSubmit={handleSubmit}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </>
  );
}

export default App;