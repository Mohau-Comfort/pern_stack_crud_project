import { useState } from 'react';

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="fixed top-0 w-full z-30">
      {/* Drawer sidebar */}
      <div className="drawer drawer-start z-40">
        <input 
          id="my-drawer" 
          type="checkbox" 
          className="drawer-toggle" 
          checked={isDrawerOpen}
          onChange={toggleDrawer}
        />
        
        <div className="drawer-side">
          <label 
            htmlFor="my-drawer" 
            aria-label="close sidebar" 
            className="drawer-overlay"
            onClick={toggleDrawer}
          ></label>
          
          <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
            {/* Sidebar header with close button */}
            <li className="mb-2 flex justify-between items-center">
              <span className="text-lg font-semibold">PERN Stack App</span>
              <button 
                onClick={toggleDrawer}
                className="btn btn-info btn-sm text-white hover:bg-sky-600"
                aria-label="Close sidebar"
              >
                Close
              </button>
            </li>
            <li><a onClick={toggleDrawer}>Dashboard</a></li>
            <li><a onClick={toggleDrawer}>Profile</a></li>
            <li><a onClick={toggleDrawer}>Settings</a></li>
            <li className="mt-4"><a onClick={toggleDrawer}>Logout</a></li>
          </ul>
        </div>
      </div>

      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-sm">
        {/* Left side - Menu button */}
        <div className="flex-none">
          <label 
            htmlFor="my-drawer" 
            className="btn btn-square btn-ghost drawer-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        
        {/* Title - Using smaller flex to give more space to the search */}
        <div className="flex-1 md:flex-none">
          <a className="btn btn-ghost text-xl">PERN Stack App</a>
        </div>
        
        {/* Center section - Search bar */}
        <div className="flex-1 flex justify-center">
          <div className="form-control w-auto">
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Search..." 
                className="input input-bordered w-48 sm:w-64" 
              />
              <button className="btn btn-square">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Right side button */}
        <div className="flex-none">
          <button className="btn btn-info btn-sm text-white hover:bg-sky-600">
            Button
          </button>
        </div>
      </div>
    </div>
  );
}