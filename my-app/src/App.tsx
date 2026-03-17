import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import UserTable from "./components/UserTable";
import { TaskProvider } from "./context/TaskContext";

function App() {
  const [userQuery, setUserQuery] = useState("");

  return (
    <TaskProvider>
      <div className="flex text-gray-100 bg-gray-900">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />

          <main className="flex-1 p-4 overflow-y-auto">
            <SearchBar
              onDebounceChange={setUserQuery}
              placeholder="Search user by name..."
            />
            <UserTable search={userQuery} />
          </main>
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
