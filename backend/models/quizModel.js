const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, 'Question text is required'],
        },
        options: {
            type: [String],
            required: [true, 'Options are required'],
            validate: {
                validator: function (v) {
                    return v.length >= 2;
                },
                message: 'There must be at least two options',
            },
        },
        correctAnswer: {
            type: String,
            required: [true, 'Correct answer is required'],
        },
    },
    {
        timestamps: true,
        collection: 'Quiz',
    }
);

module.exports = mongoose.model('Quiz', quizSchema);
