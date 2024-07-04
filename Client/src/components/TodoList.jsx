import React, { useState } from "react";
import TodoItem from "./TodoItem";
import Select from "react-select";
import axios from "axios";
import Modal from "./Modal";

const TodoList = ({ todos, onUpdate }) => {
  const [filter, setFilter] = useState("all");
  const [currentlyEditing, setCurrentlyEditing] = useState(null);
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const options = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];

  const handleOptionChange = (selectedOption) => {
    setFilter(selectedOption.value);
    setCurrentlyEditing(null);
    setShowCheckboxes(false);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.isCompleted;
    if (filter === "completed") return todo.isCompleted;
    return true;
  });

  const handleSelectTodo = (todoId) => {
    setSelectedTodos((prevSelected) =>
      prevSelected.includes(todoId)
        ? prevSelected.filter((id) => id !== todoId)
        : [...prevSelected, todoId]
    );
  };

  const handleDeleteButtonClick = () => {
    setShowCheckboxes(true);
  };

  const handleCancelDelete = () => {
    setShowCheckboxes(false);
    setSelectedTodos('');
  };

  const handleDeleteSelected = async () => {
    try {
      await axios.all(
        selectedTodos.map((todoId) =>
          axios.delete(`http://localhost:3000/api/tasks/${todoId}`)
        )
      );
      onUpdate((prevTodos) =>
        prevTodos.filter((todo) => !selectedTodos.includes(todo._id))
      );
      setSelectedTodos([]);
      setShowDeleteModal(false);
      setShowCheckboxes(false);
    } catch (error) {
      console.error("Error deleting selected tasks:", error);
    }
  };

  const ConfirmDelete = () => {
    setShowDeleteModal(true);
  };

  return (
    <div>
      <div className="mt-2 mb-4 flex justify-between items-center">
        <Select
          options={options}
          value={options.find((option) => option.value === filter)}
          onChange={handleOptionChange}
          className="w-full max-w-32"
        />
        {filteredTodos.length > 0 && (
          <div>
            {showCheckboxes ? (
              <div className="flex items-center">
                <button
                  onClick={handleCancelDelete}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                {selectedTodos.length > 0 ? (
                <button
                  onClick={ConfirmDelete}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                >
                  Delete Selected
                </button>
                ) : (
                  <></>
                )}   
              </div>
            ) : (
              <button
                onClick={handleDeleteButtonClick}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
      <div className="bg-white shadow sm:rounded-lg">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onUpdate={onUpdate}
            currentlyEditing={currentlyEditing}
            setCurrentlyEditing={setCurrentlyEditing}
            onSelectTodo={handleSelectTodo}
            isSelected={selectedTodos.includes(todo._id)}
            showCheckbox={showCheckboxes}
          />
        ))}
      </div>
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        message="Are you sure you want to delete the selected item(s)?"
        onConfirm={handleDeleteSelected}
        showButtons={true}
      />
    </div>
  );
};

export default TodoList;
