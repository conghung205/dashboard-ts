import React, { useMemo } from "react";
import { useTask } from "../context/TaskContext";

type Props = {
  search?: string;
};

function UserTable({ search }: Props) {
  const {
    state: { users },
  } = useTask();

  const term = search?.toLocaleLowerCase();

  const filtered = useMemo(() => {
    if (!term) return users;

    return users.filter((u) => u.name.toLocaleLowerCase().includes(term));
  }, [users, search]);

  return (
    <div className="overflow-x-auto bg-gray-800 rounded shadow">
      <table className="min-w-full text-left">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((user) => (
            <tr key={user.id} className="border-t border-gray-700">
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
            </tr>
          ))}

          {filtered.length === 0 && (
            <tr>
              <td className="p-3 text-center text-gray-500">No User found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
