import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal";

const AddTodo = ({ addTodoToList }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleAddTodo = async () => {
    try {
      if (validateInputs()) {
        await addTodo();
        addTodoToList();
        clearInputs();
      }
    } catch (error) {
      handleError("Error adding task", error);
    }
  };

  const addTodo = async () => {
    await axios.post("http://localhost:3000/api/tasks", {
      name,
      description,
    });
  };

  const validateInputs = () => {
    if (name.trim() === "" || description.trim() === "") {
      setErrorMessage("Task name and description cannot be empty");
      setShowErrorModal(true);
      return false;
    }
    return true;
  };

  const clearInputs = () => {
    setName("");
    setDescription("");
  };

  const handleError = (message, error) => {
    console.error(`${message}:`, error);
    setErrorMessage(message);
    setShowErrorModal(true);
  };

  const handleInputChange = (updateState) => (e) => {
    updateState(e.target.value);
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch mt-4 mb-4">
      <input
        type="text"
        value={name}
        onChange={handleInputChange(setName)}
        placeholder="Add a new task here..."
        className="border border-gray-300 py-2 px-4 rounded-l flex-1 focus:outline-none focus:ring focus:border-blue-300 mb-2 sm:mb-0 sm:mr-2"
      />
      <textarea
        value={description}
        onChange={handleInputChange(setDescription)}
        placeholder="Add a description..."
        className="border border-gray-300 py-2 px-4 rounded flex-1 focus:outline-none focus:ring focus:border-blue-300 mb-2 sm:mb-0 sm:mr-2"
        style={{ height: "calc(2.5rem + 2px)" }}
      />
      <button
        onClick={handleAddTodo}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
      >
        Add Todo
      </button>

      <Modal
        isOpen={showErrorModal}
        onClose={closeErrorModal}
        message={errorMessage}
        showButtons={false}
      />
    </div>
  );
};

export default AddTodo;
