import link from "next/link";

export default function Home() {
  const worklist = ["Homework", "Food", "Sleep"];

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-3 text-center">Task Lists</h2>
        <div className="space-y-1 mb-4 text-sm text-gray-700">
          {
            worklist.map((e)=>(
                <p>{e}</p>
            ))
          }
        </div>
        <input type="text" placeholder="Enter something..." className="w-full border px-3 py-2 rounded-lg mb-4"/>
        <div className="flex gap-3">
          <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg">Add</button>
          <button className="flex-1 bg-red-500 text-white py-2 rounded-lg">Delete</button>
        </div>


      </div>
    </main>
    );
}
