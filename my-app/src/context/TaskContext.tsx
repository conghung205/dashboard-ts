import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { TaskAction, TaskState } from "../types";
import { useLocalStorade } from "../hooks/useLocalStorade";

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "add":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "toggle":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload ? { ...t, done: !t.done } : t,
        ),
      };
    case "remove":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    default:
      return state;
  }
}

export const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
} | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [persistedState, setPersistedState] = useLocalStorade<TaskState>(
    "dashboard-state",
    {
      tasks: [
        {
          id: 1,
          title: "learn TS",
          done: false,
          assignedTo: 1,
        },
      ],
      users: [
        {
          id: 1,
          name: "congHung",
          email: "nongconghungcba@gmail.com",
          role: "admin",
        },
      ],
    },
  );

  const [state, dispatch] = useReducer(taskReducer, persistedState);

  useEffect(() => {
    setPersistedState(state);
  }, [state, setPersistedState]);

  return (
    <TaskContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTask must be used inside TaskProvider");

  return context;
}
