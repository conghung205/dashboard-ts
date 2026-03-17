import React from "react";
import { FaTasks } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="p-4 space-y-4 text-white bg-gray-900 w-60 h-[100vh]">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <nav className="flex flex-col gap-2">
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700">
          <FaTasks /> Task
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700">
          <FaUser /> Users
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
