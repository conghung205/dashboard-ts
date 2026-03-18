import React from "react";
import { useTask } from "../context/TaskContext";
import { string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Task } from "../types";

const schema = z.object({
  title: z.string().min(2, "Title to short"),
  assignedTo: z.number(),
});

type FormData = z.infer<typeof schema>;

function TaskForm() {
  const {
    state: { users },
    dispatch,
  } = useTask();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const newTask: Task = {
      id: Date.now(),
      title: data.title,
      done: false,
      assignedTo: data.assignedTo,
    };

    dispatch({
      type: "add",
      payload: newTask,
    });

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-2 p-4 mb-4 bg-gray-700 rounded"
    >
      <input
        {...register("title")}
        className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded outline-none"
        type="text"
        placeholder="Task title"
      />

      <select
        {...register("assignedTo", { valueAsNumber: true })}
        className="p-2 bg-gray-800 border border-gray-700 rounded outline-none"
      >
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        ADD
      </button>

      {errors.title && (
        <span className="text-sm text-red-500">{errors.title.message}</span>
      )}
    </form>
  );
}

export default TaskForm;
