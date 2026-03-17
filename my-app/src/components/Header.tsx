import React from "react";

function Header() {
  return (
    <header className="flex items-center justify-between w-full px-6 py-3 bg-gray-800 shadow">
      <h1 className="text-xl font-bold text-white">Dashboard App</h1>

      <div className="flex items-center gap-3">
        <img
          className="w-8 h-8 rounded-full"
          src="https://i.pravatar.cc/40"
          alt="avatar"
        />
        <button className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
