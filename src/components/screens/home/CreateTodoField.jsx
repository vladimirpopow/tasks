import React, { useState } from "react";

const CreateTodoField = ({ setTodos }) => {
    const [title, setTitle] = useState('');

    const addTodo = (newTitle) => {
        if (newTitle.trim() !== '') {
            setTodos(prev => [{
                id: new Date(),
                title: newTitle,
                isCompleted: false
            }, ...prev]);
            setTitle('');
        }
    }

    return (
        <div className="flex ml-8 justify-between mb-4 rounded-2xl bg-gray-800 border-2 border-gray-600 px-5 py-5 w-1/4 mt-20">
            <input
                type="text"
                onChange={e => setTitle(e.target.value)}
                value={title}
                onKeyDown={e => e.key === "Enter" && addTodo(title)}
                className="bg-transparent w-full border-none outline-none text-white"
                placeholder="Добавить задачу"
            />
        </div>
    );
};

export default CreateTodoField;
