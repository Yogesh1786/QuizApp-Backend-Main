const mongoose = require('mongoose');
const { Schema } = mongoose;

const AnswerSchema = new Schema({
    questionId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
    isCorrect: { type: Boolean, required: true }
});

const ScoreSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    answer: { type: [AnswerSchema], required: true }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Score', ScoreSchema);
