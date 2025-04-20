// controllers/score.js
const Score = require('../models/Score');

const getAllScore = async (req, res) => {
    try {
        const scores = await Score.aggregate([
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'userId',
                    'foreignField': '_id',
                    'as': 'userDetails'
                }
            }, {
                '$unwind': {
                    'path': '$userDetails'
                }
            }, {
                '$project': {
                    'userId': true,
                    'score': true,
                    'createdAt': true,
                    'name': '$userDetails.name'
                }
            }
        ])
        res.status(200).json(scores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const postScore = async (req, res) => {
    const { userId, answer } = req.body;
    let correct = 0;
    let totalQuestions = 0;
    try {

        if (!answer.length) return res.status(404).json({ status: false, message: "Please send all the questions." })

        answer.map(e => {
            if (e.isCorrect) {
                correct += 10;
            }
            totalQuestions += 10;
        });

        let percent = ((correct / totalQuestions) * 100).toFixed(2);

        let score = {
            userId,
            score: percent,
            answer
        }

        const savedScore = await Score.create(score);
        res.status(201).json(savedScore);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const { ObjectId } = require('mongoose').Types;

const getResponseById = async (req, res) => {
    const { uuid } = req.params;
    try {
        const score = await Score.aggregate([
            {
                $match: { _id: new ObjectId(uuid) }
            },
            {
                $unwind: '$answer'
            },
            {
                $lookup: {
                    from: 'quizzes',
                    localField: 'answer.questionId',
                    foreignField: '_id',
                    as: 'quiz'
                }
            },
            {
                $unwind: '$quiz'
            },
            {
                $project: {
                    _id: 0,
                    question: '$quiz.question',
                    isCorrect: '$answer.isCorrect'
                }
            }
        ]);

        if (score.length === 0) {
            return res.status(404).json({ status: false, message: 'Score not found' });
        }

        const answers = score.map(item => ({
            question: item.question,
            isCorrect: item.isCorrect
        }));

        res.status(200).json({ status: true, data: answers });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};


const deleteScore = async (req, res) => {
    const { uuid } = req.params;
    try {
        const deletedScore = await Score.findByIdAndDelete(uuid);
        res.status(200).json(deletedScore);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteAll = async (req, res) => {
    try {
        await Score.deleteMany({});
        res.status(200).json({ status: true, message: "All scores deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllScore,
    postScore,
    getResponseById,
    deleteScore,
    deleteAll
};
