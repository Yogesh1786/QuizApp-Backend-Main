// controllers/quiz.js
const Quiz = require('../models/Quiz');

const getAllQuiz = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const postQuiz = async (req, res) => {
    const quiz = req.body;
    try {
        const savedQuiz = await Quiz.create(quiz);
        res.status(201).json(savedQuiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateQuiz = async (req, res) => {
    const { body, params: { uuid } } = req;
    try {
        const savedQuiz = await Quiz.findOneAndUpdate({ _id: uuid }, body, { new: true });
        res.status(200).json(savedQuiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteQuiz = async (req, res) => {
    const { uuid } = req.params;
    try {
        const deletedQuiz = await Quiz.findByIdAndDelete(uuid);
        res.status(200).json(deletedQuiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteAll = async (req, res) => {
    try {
        await Quiz.deleteMany({});
        res.status(200).json({ status: true, message: "All quizzes deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllQuiz,
    postQuiz,
    updateQuiz,
    deleteQuiz,
    deleteAll
};
