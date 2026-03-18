import React, { useMemo } from "react";
import { useTask } from "../context/TaskContext";

type Props = {
  search?: string;
};

function TaskList({ search }: Props) {
  const {
    state: { tasks, users },
    dispatch,
  } = useTask();

  const term = search?.toLocaleLowerCase();

  const filtered = useMemo(() => {
    if (!term) return tasks;

    return tasks.filter((t) => t.title.toLocaleLowerCase().includes(term));
  }, [tasks, search]);

  return (
    <div className="bg-gray-800 divide-gray-200 rounded shadow">
      {filtered.length === 0 && (
        <div className="p-4 text-gray-500">No task found</div>
      )}
      {filtered.map((t) => (
        <div key={t.id} className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <input
              className="cursor-pointer"
              type="checkbox"
              checked={t.done}
              aria-label="toggle check"
              onChange={() =>
                dispatch({
                  type: "toggle",
                  payload: t.id,
                })
              }
            />
            <span className={t.done ? "line-through" : ""}>{t.title}</span>
            <small className="text-gray-500">
              ({users.find((u) => u.id === t.assignedTo)?.name})
            </small>
          </div>

          <button
            onClick={() =>
              dispatch({
                type: "remove",
                payload: t.id,
              })
            }
            className="text-red-600 hover:underline hover:cursor-pointer"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
