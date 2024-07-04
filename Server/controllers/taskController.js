const Task = require('../models/Task');

const handleAddTask = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        await createTask(name, description);
        return res.status(201).json({message: "Successfully Added"});
    } catch (err) {
        next (err);
    }
};

const createTask = async (name,description) => {
    const task = new Task({
        name,
        description,
        isCompleted: false
    });
    return await task.save();
};

const listAllTasks = async (req, res, next) => {
    try {
        const tasks = await findAllTasks();
        return res.status(200).json(tasks);
    } catch (err) {
       next (err);
    }   
};

const findAllTasks = async () => {
    const tasks = await Task.find();
    if (tasks.length === 0) {
        throw new Error("No tasks available");
    }
    return tasks;
};

const getATask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const task = await findTaskbyId(id);
        return res.status(200).json(task);
    } catch (err) {
        next (err);
    }
};

const handleUpdateStatus = async (req, res, next) => {
    try {
        const id = req.params.id;
        const task = await findTaskbyId(id);
        await toggleIsCompleted(task)
        return res.status(200).json({message: "Updated Successfully", task})
    } catch (err) {
        next (err);
    }
};

const findTaskbyId = async (id) => {
    const task = await Task.findById(id);
    if (!task) {
        throw new Error("Task not found");
    }
    return task;
};

const toggleIsCompleted = async (task) => {
    task.isCompleted = !task.isCompleted;
    await task.save();
};

const deleteTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Task.findByIdAndDelete(id);
        return res.status(200).json({message: "Deleted Successfully"})
    } catch (err) {
        next (err);
    }
};

const handleEditTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const {name, description} = req.body;
        const task = await findTaskbyId(id);
        await updateTaskDetails(task, name, description);
        return res.status(200).json({message : "Task Edited Successfully"});
    } catch (err) {
        next (err);
    }
};

const updateTaskDetails = async (task, name, description) => {
    task.name = name,
    task.description = description;
    await task.save();
}

module.exports = {
    handleAddTask,
    listAllTasks,
    getATask,
    handleUpdateStatus,
    deleteTask,
    handleEditTask
};


