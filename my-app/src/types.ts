export type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "member";
};

export type Task = {
  id: number;
  title: string;
  done: boolean;
  assignedTo: number;
};

export type TaskAction =
  | {
      type: "add";
      payload: Task;
    }
  | {
      type: "toggle";
      payload: number;
    }
  | {
      type: "remove";
      payload: number;
    };

export type TaskState = {
  tasks: Task[];
  users: User[];
};

export type TPage = "tasks" | "users";
