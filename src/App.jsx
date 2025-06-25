import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, settodos] = useState([]);
  useEffect(() => {
    let s = localStorage.getItem("todos");
    if (s) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, []);

  const savtoLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleDelete = (e) => {
    let id = e.target.name;
    const newTodos = todos.filter((i) => i.id !== id);
    settodos(newTodos);

    savtoLS();
  };
  const handleEdit = (e) => {
    let id = e.target.name;
    let t = todos.filter((i) => i.id == id);
    setTodo(t[0].todo);
    const newTodos = todos.filter((i) => i.id !== id);
    settodos(newTodos);
    savtoLS();
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    // console.log(id);
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newtodos = [...todos];

    // console.log(index);
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
    savtoLS();
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    savtoLS();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-400 min-h-[80vh]">
        <div className="add todo my-5">
          <h2 className="text-lg font-bold ">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-1/2"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length < 3}
            className="bg-blue-700 hover:bg-violet-950 p-2 py-1 text-white font-bold rounded-md mx-6"
          >
            Add
          </button>
        </div>
        <div className="text-xl font-bold">
          <h2>Your Todos</h2>
          <div className="todos">
            {todos.length == 0 && <div className="m-5">your list is empty</div>}
            {todos.map((item) => {
              return (
                <div
                  key={item.id}
                  className="todo flex w-1/2 justify-between my-3 "
                >
                  <div className="flex gap-5 w-full ">
                    <input
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                    />
                    <div
                      className={item.isCompleted ? "line-through" : ""}
                      break-words
                      whitespace-normal
                    >
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={handleEdit}
                      name={item.id}
                      className="bg-blue-700 hover:bg-violet-950 p-2 py-1 text-white font-bold rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-blue-700 hover:bg-violet-950 p-2 py-1 text-white font-bold rounded-md mx-1"
                      name={item.id}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
