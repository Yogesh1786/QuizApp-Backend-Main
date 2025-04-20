const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    answer: String
},{
    versionKey : false,
    timestamps: true
});

module.exports = mongoose.model('Quiz', QuestionSchema);
