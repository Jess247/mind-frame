
import { FaPlus } from "react-icons/fa6"
import { useState } from "react"
import { MdDeleteForever } from "react-icons/md"

export default function Todo() {
    const [todoList, setTodoList] = useState([])
    const [todoItem, setTodoItem] = useState("")

    const  todoInput = document.getElementById('todoInput')
   

    function addTodo() {
        
        setTodoList(prevTodoList => [...prevTodoList, todoItem])
        todoInput.value = ''
        
    }

    function removeItem(index) {
        setTodoList(prevTodoList => prevTodoList.filter((_, i) => i !== index))
    }

    return (
        <div className={`absolute right-8 bottom-20 bg-slate-800/[.54] p-8 rounded-xl`}>
            <p className="underline">Todo</p>
            <ul id="todo" className="text-base font-thin">
              {todoList.map((todo,index) => (
                <li className="flex items-center justify-between mt-3"
                    key={index}
                    data-id={index}>
                    <div>
                        <input type="checkbox" 
                            className="mr-3"/> 
                        {todo}
                    </div> 
                    <MdDeleteForever size={20} 
                        onClick={() => removeItem(index)}/>
                </li>)
              )}
            </ul>
            <div className="flex justify-between items-center mt-4">
                <label htmlFor="todo" className="opacity-0 absolute
                ">
                    New todo: 
                </label>
                <input 
                    id="todoInput" 
                    className="bg-transparent border-b w-3/4"
                    placeholder="New todo"
                    type="text"
                    onChange={() => setTodoItem(todoInput.value)}/>
                <button 
                    className="hover:text-slate-400"    
                    onClick={addTodo}>
                        <FaPlus/>
                </button>
            </div>
          </div>
        )
}