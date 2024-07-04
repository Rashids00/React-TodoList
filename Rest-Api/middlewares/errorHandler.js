const errorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    } else if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(404).json({ error: "Resource not found" });
    }
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
};

module.exports = {
    errorHandler
};