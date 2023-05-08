import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTask,
  getAllTask,
  deleteTask,
  updateTask,
} from "../services/Api";

const Tasks = () => {
  const queryClient = useQueryClient();
  const [task, setTask] = useState("");
  const { isLoading, error, data } = useQuery({
    queryKey: ["getAllTask"],
    queryFn: () => getAllTask(),
    select: (data) => {
      return data.data.data;
    },
  });

  const mutationAdd = useMutation({
    mutationFn: (data) => {
      return createTask(data);
    },
    onSuccess: (response) => {
      if (response.status != 201)
        return alert("Something went wrong, Try again!");
      else {
        queryClient.invalidateQueries(["getAllTask"]);
      }
    },
  });

  const mutationDelete = useMutation({
    mutationFn: (id) => {
      return deleteTask(id.id);
    },
    onSuccess: (response) => {
      if (response.status != 200)
        return alert("Something went wrong, Try again!!");
      else {
        queryClient.invalidateQueries(["getAllTask"]);
      }
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: (data) => {
      console.log(data);
      return updateTask(data.data, data.id);
    },
    onSuccess: (response) => {
      if (response.status != 200) {
        return alert("Something went wrong, Try again!!");
      } else {
        queryClient.invalidateQueries(["getAllTask"]);
      }
    },
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    mutationAdd.mutate({ name: task });
    setTask("");
  };

  const handleUpdate = async (id, completed) => {
    const data = {
      completed: !completed,
    };
    console.log(data);

    mutationUpdate.mutate({ data: data, id: id });
  };

  const handleDelete = async (index) => {
    mutationDelete.mutate({ id: index });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-8">Todo List</h1>
        <div className="w-80 rounded-lg bg-white shadow-lg p-4">
          <div className="flex items-center mb-4 justify-center">
            <input
              type="text"
              name="name"
              className="flex-1 mr-4 py-2 px-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>

          <ul className="list-disc">
            {isLoading
              ? "loading..."
              : error
              ? "Something went wrong"
              : data.map((todo, index) => {
                  return (
                    <li
                      key={index}
                      className={`flex items-center py-2 ${
                        todo.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      <span
                        className="flex-1 cursor-pointer hover:bg-gray-100 pl-4 py-2 mx-2"
                        onClick={() => handleUpdate(todo._id, todo.completed)}
                      >
                        {todo.name}
                      </span>
                      <button
                        onClick={() => handleDelete(todo._id)}
                        className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Tasks;
