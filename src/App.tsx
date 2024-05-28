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
  const [list, setList] = useState<toDo[]>([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const [index, setIndex] = useState(-1);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };


  
  const handleAdd = () => {
    if (text.trim() === "") return;

    const newList =
      index === -1
        ? [...list, { id: list.length + 1, title: text, completed: false }]
        : list.map((todo) =>
            todo.id === index ? { ...todo, title: text } : todo
          );

    setList(newList);
    setText("");
    setIndex(-1);
  };

  const onCheck = (id: number) => {
    setList(
      list.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const onUpdate = (id: number) => {
    const todo: toDo | undefined = list.find((todo) => todo.id === id);
    if (todo) {
      setText(todo.title);
      setIndex(todo.id);
    }
  };

  const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onRemove = (id: number) => {
    setList(list.filter((todo) => todo.id !== id));
  };


  const filteredList = list.filter(todo => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
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
                  onChange={handleText}
                  className="p-1 text-5xl focus: outline-none"
                  value={text}
                />
                <AiFillPlusSquare
                  onClick={() => handleAdd()}
                  className="h-full w-[50px] text-[#ff6f47] bg-white hover:text-white hover:bg-[#ff6f47] cursor-pointer "
                />
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

            <ToDoList
              toDos={filteredList}
              onCheck={onCheck}
              onRemove={onRemove}
              onUpdate={onUpdate}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
