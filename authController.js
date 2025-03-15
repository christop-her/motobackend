// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const crypto = require("crypto");
// const nodemailer = require("nodemailer");
const pooll = require('./db');
// require('.env').config();
// const multer = require("multer");
// const path = require("path");



// Upload Product Function
const uploaddata = async (req, res) => {
    try {
        console.log("🚀 Request received:", req.body);

        const { email, datetime } = req.body;

        if (!email || !datetime) {
            console.log("Missing email or datetime");
            return res.status(400).json({ message: "All fields are required." });
        }


        // Check if email exists
        const checkQuery = `SELECT * FROM settime WHERE email = $1;`;
        const checkResult = await pooll.query(checkQuery, [email]);

        if (checkResult.rowCount > 0) {
            // Update existing record
            const updateQuery = `UPDATE settime SET datetime = $1 WHERE email = $2 RETURNING *;`;
            const updateResult = await pooll.query(updateQuery, [datetime, email]);

            if (updateResult.rowCount > 0) {
                console.log("✅ Datetime updated successfully:", updateResult.rows[0]);
                return res.status(200).json({ message: "Datetime updated successfully.", data: updateResult.rows[0] });
            } else {
                console.log("⚠️ Update failed.");
                return res.status(500).json({ message: "Update failed." });
            }
        } else {
            // Insert new record
            const insertQuery = `INSERT INTO settime (email, datetime) VALUES ($1, $2) RETURNING *;`;
            const insertResult = await pooll.query(insertQuery, [email, datetime]);

            if (insertResult.rowCount > 0) {
                console.log("✅ New datetime inserted successfully:", insertResult.rows[0]);
                return res.status(201).json({ message: "Datetime inserted successfully.", data: insertResult.rows[0] });
            } else {
                console.log("⚠️ Insert failed.");
                return res.status(500).json({ message: "Insert failed." });
            }
        }
    } catch (error) {
        console.error("🚨 Error updating datetime:", error);
        return res.status(500).json({ message: "An error occurred while updating the datetime." });
    }
};





const getUploaded = async (req, res) => {
    try {
        const { email } = req.body;

        // Fetch products based on email
        const { rows } = await pooll.query("SELECT * FROM settime WHERE email = $1", [email]);

        if (rows.length > 0) {
            return res.json({
                message: "Data fetched successfully",
                data: rows
            });
        } else {
            return res.status(404).json({ message: "No products found." });
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "An error occurred while fetching the products." });
    }
};


  
  // Export the Google Sign-In function
module.exports = { uploaddata, getUploaded };
