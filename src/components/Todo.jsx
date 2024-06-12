
import { FaPlus } from "react-icons/fa6"
import { useState } from "react"
import { MdDeleteForever } from "react-icons/md"

export default function Todo({showTodo}) {
    const [todoList, setTodoList] = useState([])
    const [todoItem, setTodoItem] = useState()

    const  todoInput = document.getElementById('todoInput')

    function addTodo() {
        setTodoList(prevTodoList => [...prevTodoList, todoInput.value])
        todoInput.value = ''
    }

    function removeItem(e) {
        const id = e.target.parentElement.id
        
        setTodoList(prevTodoList => prevTodoList.splice(id,1))
    }

    return (
        <div className={`absolute right-8 bottom-20 bg-slate-800/[.54] p-8 rounded-xl ${showTodo ? 'opacity-0' : 'opacity-1'}`}>
            <p className="underline">Todo</p>
            <ul id="todo" className="text-base font-thin">
              {todoList.map((todo,index) => (
                <li className="flex items-center justify-between mt-3"
                    id={index}>
                    <div>
                        <input type="checkbox" 
                            className="mr-3"/> 
                        {todoItem}
                    </div> 
                    <MdDeleteForever size={20} onClick={removeItem}/>
                </li>)
              )}
            </ul>
            <div className="flex justify-between items-center mt-4">
                <label for="todo" className="opacity-0 absolute
                ">
                    New todo: 
                </label>
                <input 
                    id="todoInput" 
                    className="bg-transparent border-b w-3/4"
                    placeholder="New todo"
                    type="text"/>
                <button 
                    className="hover:text-slate-400"    
                    onClick={addTodo}>
                        <FaPlus/>
                </button>
            </div>
          </div>
        )
}