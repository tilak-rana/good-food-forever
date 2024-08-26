const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require("../Models/user");

// Sign Up
exports.postSignUp = [
    // Validate and sanitize email
    check('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
    
    // Validate password (ensuring it's a number and converting it later)
    check('password').isNumeric().withMessage('Password must be a number'),

    async (req, res) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // Check if email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }

            // Convert password to a string if it's a number
            const passwordString = password.toString();

            // Hash the password
            const hashedPassword = await bcrypt.hash(passwordString, 10);

            // Create a new user object
            const userObj = new User({
                name,
                email,
                password: hashedPassword
            });

            // Save the user object to the database
            const response = await userObj.save();

            res.status(201).json({
                message: "User registered successfully",
                Signup: response,
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
];

// Login
exports.postLogin = [
    // Validate and sanitize email
    check('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),

    // Validate password (ensuring it's a number and converting it later)
    check('password').isNumeric().withMessage('Password must be a number'),

    async (req, res) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Find the user by email
            const user = await User.findOne({ email });

            // If the user is not found
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "User not found",
                    isAuthenticated: false
                });
            }

            // Convert password to a string if it's a number
            const passwordString = password.toString();

            // Compare the hashed password
            const isMatch = await bcrypt.compare(passwordString, user.password);
            // console.log(user.name);
            if (isMatch) {
                res.status(200).json({
                    success: true,
                    message: "User authenticated successfully",
                    isAuthenticated: true,
                    user: user // Sending user details (without password) to the client
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Invalid credentials",
                    isAuthenticated: false
                });
            }
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
];
