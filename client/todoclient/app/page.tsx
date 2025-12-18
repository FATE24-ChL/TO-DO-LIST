"use client";
import link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  // const worklist = ["Homework", "Food", "Sleep"];

  const [worklist, setworklist] = useState<string[]>([]);
  const [ActiveTask, setActiveTask] = useState<string>("");

  const handeDelete = () => {
    console.log(ActiveTask);
    const templist = worklist;
    templist.splice(templist.indexOf(ActiveTask), 1);
    setworklist(templist);
    console.log(worklist);
  }

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
              const taskInput = document.getElementById("taskInput") as HTMLInputElement;
              setworklist([...worklist, taskInput.value]);
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
