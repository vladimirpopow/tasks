import React, { useState } from "react";

const TodoSearch = ({ searchTodo }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    searchTodo(event.target.value); // Вызываем функцию поиска, передавая текущий поисковый запрос
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder="Поиск по задачам"
      className="bg-transparent w-full border-none outline-none mb-5 ml-4"
    />
  );
};

export default TodoSearch;
