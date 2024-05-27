import React from "react";
import { toDo } from "../models/toDo";
import { FaCheck } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
interface ToDoListProps {
    toDos: toDo[];
  }
export const ToDoList: React.FC<ToDoListProps> = ({ toDos }) => {
    const{mutate} =useMutation({
        mutationFn: () => 
         axios.delete(`https://jsonplaceholder.typicode.com/todos/1`)
      }
    
      );
    
    return (
      <div className="flex mt-36 justify-center">
        <ul className="list-none">
          {toDos && toDos.map((todo) => (
            <div key={todo.id} className={`flex justify-between bg-[#fff] text-black border-none cursor-pointer text-lg mt-2 ${todo.completed ? 'opacity-50 line-through' : ''}`}>
              <li className="min-w-[500px] text-left text-5xl p-2 list-none">
             {todo.title}
              </li>
              <div className="flex">
                  <FaCheck className="flex-grow-0 flex-shrink-0 h-auto w-[64px] text-white bg-[#0bd4a2] p-5" />
                  <FaEdit className="flex-grow-0 flex-shrink-0 h-auto w-[64px] text-white bg-[#4bb543] p-5" />
                  <FaTrash onClick={() => mutate()} className="flex-grow-0 flex-shrink-0 h-auto w-[64px] text-white bg-[#ff6f47] p-5" />
                  </div>
                  
            </div>
          ))}
        </ul>
      </div>
    );
  };