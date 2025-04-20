const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    try {
        const user = req.body;
        await User.create(user);
        res.status(200).json({ status: true, message: "Registration Successful." });
    } catch (error) {
        console.log('error', error);
        res.status(400).json({ status: false, message: "Registration Failed." });
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });
        if (!user || user === null) {
            return res.status(404).json({ message: 'User not found' });
        }
        const token = jwt.sign({ id: user._id }, "QuizUser", { expiresIn: '1h' });
        res.status(200).json({ status: true, token, userId: user._id });
    } catch (error) {
        console.log('error', error);
        res.status(400).json({ status: false, message: "Login Failed." });
    }
};

const getUserDetail = async (req, res) => {
    try {
        const { uuid } = req.params;
        const user = await User.findOne({ _id: uuid });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ status: true, user });
    } catch (error) {
        console.log('error', error);
        res.status(400).json({ status: false, message: "Login Failed." });
    }
};

module.exports = {
    createUser,
    userLogin,
    getUserDetail
};
