import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";

const TodoItem = ({
  todo,
  onUpdate,
  currentlyEditing,
  setCurrentlyEditing,
  onSelectTodo,
  isSelected,
  showCheckbox,
}) => {
  const { _id, name, isCompleted, description } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);

  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  useEffect(() => {
    setIsEditing(_id === currentlyEditing);
  }, [_id, currentlyEditing]);

  const updateTodoInList = (todos, updatedTodo) => {
    return todos.map((todo) =>
      todo._id === updatedTodo._id ? updatedTodo : todo
    );
  };

  const handleError = (message, error) => {
    console.error(`${message}:`, error);
    throw new Error(message);
  };

  const toggleIsCompleted = async () => {
    try {
      await axios.put(`http://localhost:3000/api/tasks/${_id}`);
      updateTodoStatus();
    } catch (error) {
      handleError("Error updating status", error);
    }
  };

  const updateTodoStatus = () => {
    onUpdate((prevTodos) =>
      updateTodoInList(prevTodos, { ...todo, isCompleted: !isCompleted })
    );
  };

  const handleSaveTodo = async () => {
    try {
      await updateTodoItem();
      updateTodoList();
      setIsEditing(false);
      setCurrentlyEditing(null);
    } catch (error) {
      handleError("Error editing task", error);
    }
  };

  const updateTodoItem = async () => {
    await axios.put(`http://localhost:3000/api/tasks/edit/${_id}`, {
      name: newName,
      description: newDescription,
    });
  };

  const updateTodoList = () => {
    onUpdate((prevTodos) =>
      updateTodoInList(prevTodos, {
        ...todo,
        name: newName,
        description: newDescription,
      })
    );
  };

  const handleInputChange = (updateState) => (e) => {
    updateState(e.target.value);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setIsEditing(false);
      setCurrentlyEditing(null);
    } else {
      setIsEditing(true);
      setCurrentlyEditing(_id);
    }
  };

  return (
    <div
      className={`flex items-center justify-between px-2 py-2 border-b border-gray-200 ${
        isCompleted ? "bg-gray-200" : ""
      }`}
    >
      <div className="flex items-center">
        {isEditing ? (
          <div className="flex flex-col sm:flex-row items-stretch">
            <input
              type="text"
              value={newName}
              onChange={handleInputChange(setNewName)}
              className="border border-gray-300 p-1 mr-2 flex-1 mb-2 sm:mb-0"
            />
            <textarea
              value={newDescription}
              onChange={handleInputChange(setNewDescription)}
              className="border border-gray-300 p-1 mr-2 flex-1"
              style={{ height: "calc(2rem + 2px)" }}
            />
          </div>
        ) : (
          <>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={toggleIsCompleted}
              className="mr-2"
            />
            <p
              className={`flex-1 ${
                isCompleted ? "line-through text-gray-500" : "text-gray-700"
              }`}
            >
              {name}
            </p>
          </>
        )}
      </div>
      <div>
        {isEditing ? (
          <>
            <button
              onClick={handleSaveTodo}
              className="text-green-500 hover:text-green-700 mr-2"
            >
              Save
            </button>
            <button
              onClick={handleEditToggle}
              className="text-red-500 hover:text-red-700 mr-2"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setShowDescriptionModal(true)}
              className="text-green-500 hover:text-green-700 mr-2"
            >
              View
            </button>
            <button
              onClick={handleEditToggle}
              className="text-blue-500 hover:text-blue-700 mr-2"
            >
              Edit
            </button>
            {showCheckbox && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelectTodo(_id)}
                className="mr-2"
              />
            )}
          </>
        )}
      </div>

      <Modal
        isOpen={showDescriptionModal}
        onClose={() => setShowDescriptionModal(false)}
        message={description}
        showButtons={false}
      />
    </div>
  );
};

export default TodoItem;
