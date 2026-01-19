"use client";
import link from "next/link";
import { use, useEffect, useState } from "react";
export default function Home() {

  // const worklist = ["Homework", "Food", "Sleep"];

  const [worklist, setworklist] = useState<string[]>([]);
  const [ActiveTask, setActiveTask] = useState<string>("");
  // const [templist, settemplist] = useState<string[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:8000/api/database/get-tasks");
      const data = await response.json();
      setworklist(data.tasks);
    };
    fetchTasks();
  }, []);

  const handeDelete =() => {
    console.log(ActiveTask);
    const templist = worklist;

    templist.splice(templist.indexOf(ActiveTask), 1);
    console.log(templist);
    // setworklist(templist);
    setworklist([...templist]);
  }

  const addTask = async () => {
    const taskInput = document.getElementById("taskInput") as HTMLInputElement;
    if (taskInput.value == "") {
      alert("Please enter a task");
    }
    else {

      setworklist([...worklist, taskInput.value]);
      const response = await fetch("http://localhost:8000/api/database/add-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: taskInput.value }),
      })
      console.log(response.body);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-3 text-center">Task Lists</h2>
        <div className="space-y-1 mb-4 text-sm text-gray-700">
          {
            worklist.map((e) => (
              <p onClick={() => {
                setActiveTask(e);
              }}>{e}</p>
            ))
          }
        </div>
        <input id="taskInput" type="text" placeholder="Enter something..." className="w-full border px-3 py-2 rounded-lg mb-4 text-black" />
        <div className="flex gap-3">
          <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg"

            onClick={() => {
              addTask();
            }}>Add</button>
          <button
            onClick={() => {
              handeDelete();
            }}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg">Delete</button>
        </div>


      </div>
    </main>
  );
}
