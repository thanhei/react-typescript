import { useState } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import { RiArrowDownSFill } from "react-icons/ri";
import { ToDoList } from "./components/toDoList";
import { Axios } from "axios";
import { toDo } from "./models/toDo";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchData(filter: string): Promise<toDo[]> {

  let url = "https://jsonplaceholder.typicode.com/todos";

  if (filter === "active") {
    url += "?completed=false";
  } else if (filter === "completed") {
    url += "?completed=true";
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: toDo[] = await response.json();
  return data;
}


function App() {
  const [filter, setFilter] = useState("all");

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };




  const { data } = useQuery({
    queryKey: ["todo", filter],
    queryFn: () => fetchData(filter),
  });

  return (
    <>
      <div className="h-screen overflow-y-scroll bg-gradient-to-r from-[#f6d365] to-[#fda085]">
        <div className=" container mx-auto ">
          <div className="text-center items-center relative top-14">
            <h1 className="text-[100px] font-bold text-white">Todos list</h1>

            <div className="flex justify-center mt-36">
              <div className="flex">
                <input
                  type="text"
                  className="p-1 text-5xl focus: outline-none"
                />
                <AiFillPlusSquare className="h-full w-[50px] text-[#ff6f47] bg-white hover:text-white hover:bg-[#ff6f47] cursor-pointer " />
              </div>
              <div className="flex relative ml-6">
                <select
                  className="h-full text-2xl cursor-pointer focus:outline-none"
                  value={filter}
                  onChange={handleChange}
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
                <RiArrowDownSFill className="h-[63px] w-[50px] text-white bg-[#ff6f47]  absolute right-0 p-2 pointer-events-none " />
              </div>
            </div>
            {data && <ToDoList toDos={data} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
