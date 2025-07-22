import React from 'react'

import styles from "../explore.module.css";
import { useDestination } from '../../DestinationContext';

const ThingsToDo = () => {
  const destination = useDestination();
  // Try to get todos from the context
  let todos = destination?.acf?.explore?.things_to_do;

  // If todos is an object, convert to array
  if (todos && !Array.isArray(todos) && typeof todos === 'object') {
    todos = Object.values(todos);
  }
  // If still not an array, fallback to empty array
  if (!Array.isArray(todos)) {
    todos = [];
  }

  // Filter todos to only those with image, title, and description
  const filteredTodos = todos.filter((todo: any) => todo.image && todo.title && todo.description);

  if (!filteredTodos.length) {
    return <div>No things to do found.</div>;
  }

  return (
    <div>
      {filteredTodos.map((todo: any, idx: number) => (
        <div
          key={idx}
          className="flex flex-col md:flex-row items-start gap-4 mb-6 p-4 rounded-lg shadow bg-white"
        >
          {/* Left: Image */}
          <div className="w-full h-48 md:w-32 md:h-32 flex-shrink-0 bg-gray-100 rounded overflow-hidden mb-4 md:mb-0">
            <img
              src={todo.image}
              alt={todo.title}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Right: Title & Description */}
          <div className="flex-1">
            <h3 className="mt-0 text-lg font-semibold mb-2">{todo.title}</h3>
            <p className="text-gray-600">{todo.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThingsToDo;
