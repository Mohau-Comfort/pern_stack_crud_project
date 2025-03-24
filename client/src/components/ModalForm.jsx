//src/components/ModalForm.jsx

import { useState, useEffect } from 'react';

export default function ModalForm({ isOpen, onClose, mode, onSubmit, client }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    job: '',
    rate: '',
    status: 'Active'
  });

  // Initialize form data when editing a client
  useEffect(() => {
    if (mode === 'edit' && client) {
      setFormData({
        name: client.name || '',
        email: client.email || '',
        job: client.job || '',
        rate: client.rate || '',
        status: client.status || 'Active'
      });
    } else if (mode === 'add') {
      // Reset form for adding a new client
      setFormData({
        name: '',
        email: '',
        job: '',
        rate: '',
        status: 'Active'
      });
    }
  }, [mode, client, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg py-4">{mode === 'edit' ? 'Edit Client' : 'Add New Client'}</h3>
        
        <form onSubmit={handleSubmit}>
          <button 
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
          
          <div className="form-control w-full max-w-xs mb-4">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe" 
              className="input input-bordered w-full" 
              required
            />
          </div>
          
          <div className="form-control w-full max-w-xs mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com" 
              className="input input-bordered w-full" 
              required
            />
          </div>
          
          <div className="form-control w-full max-w-xs mb-4">
            <label className="label">
              <span className="label-text">Job Title</span>
            </label>
            <input 
              type="text" 
              name="job"
              value={formData.job}
              onChange={handleChange}
              placeholder="Software Engineer" 
              className="input input-bordered w-full" 
              required
            />
          </div>
          
          <div className="form-control w-full max-w-xs mb-4">
            <label className="label">
              <span className="label-text">Hourly Rate</span>
            </label>
            <input 
              type="text" 
              name="rate"
              value={formData.rate}
              onChange={handleChange}
              placeholder="$150/hr" 
              className="input input-bordered w-full" 
              required
            />
          </div>
          
          <div className="form-control w-full max-w-xs mb-6">
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <select 
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Available">Available</option>
            </select>
          </div>
          
          <div className="modal-action">
            <button 
              type="button"
              className="btn btn-ghost" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="btn btn-info text-white hover:bg-sky-600"
            >
              {mode === 'edit' ? 'Save Changes' : 'Add Client'}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
