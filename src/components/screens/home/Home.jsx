import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TodoItem from "./TodoItem";
import CreateTodoField from "./CreateTodoField";
import TodoSearch from "./TodoSearch";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addTodo = (title) => {
    setTodos([
      ...todos,
      { id: Date.now().toString(), title, isCompleted: false }
    ]);
  };

  const changeTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, isCompleted: !todo.isCompleted }
        : todo
    ));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newTitle) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, title: newTitle }
        : todo
    ));
  };

  const searchTodo = (term) => {
    setSearchTerm(term);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDrop = (droppedId, isCompleted) => {
    setTodos(todos.map(todo =>
      todo.id === droppedId
        ? { ...todo, isCompleted }
        : todo
    ));
  };

  const incompleteTodos = filteredTodos.filter(todo => !todo.isCompleted);
  const completedTodos = filteredTodos.filter(todo => todo.isCompleted);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="text-white mx-auto px-4 sm:px-6 lg:px-8 bg-slate-1200 min-h-screen flex overflow-x-hidden">
        <div className="flex-grow">
        <TodoSearch searchTodo={searchTodo} />
        <CreateTodoField setTodos={setTodos} />
          <div className="flex justify-between px-8">
            <div className=" flex-1 justify-between" >
              <h2 className="text-xl font-bold mr-36   ">Не выполненные</h2>
              {incompleteTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  changeTodo={changeTodo}
                  removeTodo={removeTodo}
                  editTodo={editTodo}
                  handleDrop={handleDrop}
                  isCompleted={false}
                />
              ))}
            </div>
            <div className="flex-1 ml-24">
              <h2 className="text-xl font-bold mr-36">Выполненные</h2>
              {completedTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  changeTodo={changeTodo}
                  removeTodo={removeTodo}
                  editTodo={editTodo}
                  handleDrop={handleDrop}
                  isCompleted={true}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </DndProvider>
  );
};

export default Home;
