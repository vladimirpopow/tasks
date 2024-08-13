import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from './Constants';
import Check from "./Check_box";
import cn from "classnames";
import { BsTrash } from "react-icons/bs";

const TodoItem = ({ todo, changeTodo, removeTodo, editTodo, handleDrop, isCompleted }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TODO_ITEM,
    item: { id: todo.id, isCompleted },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TODO_ITEM,
    drop: (item) => {
      if (item.isCompleted !== isCompleted) {
        handleDrop(item.id, !isCompleted);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} className={cn('flex items-center justify-between mb-4 rounded-2xl bg-gray-800 p-5 w-full', {
      'opacity-50': isDragging,
      'bg-green-800': isOver && !isCompleted,
      'bg-red-800': isOver && isCompleted
    })}>
      <button className="flex items-center" onClick={() => changeTodo(todo.id)}>
        <Check isCompleted={todo.isCompleted} />
        <span
          className={cn({ "line-through": todo.isCompleted })}
          onClick={() => editTodo(todo.id, todo.title)}
        >
          {todo.title}
        </span>
      </button>
      <button onClick={() => removeTodo(todo.id)}>
        <BsTrash size={22} className="text-gray-600 hover:text-red-700 transition-colors ease-in-out duration-300" />
      </button>
    </div>
  );
};

export default TodoItem;
