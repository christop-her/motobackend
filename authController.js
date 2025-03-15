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
        console.log("🚀 Request received:", req.body); // Debugging Line

        const { email, datetime } = req.body;

        if (!email || !datetime) {
            console.log("❌ Missing email or datetime"); // Debugging Line
            return res.status(400).json({ message: "All fields are required." });
        }

        // Update product details
        const updateQuery = `
            UPDATE settime 
            SET datetime = $1
            WHERE email = $2
            RETURNING *;
        `;

        const { rows } = await pooll.query(updateQuery, [
            datetime,
            email
        ]);

        // if (rowCount === 0) {
        //     console.log("⚠️ No matching record found"); // Debugging Line
        //     return res.status(404).json({ message: "Product not found." });
        // }

        console.log("✅ Product updated successfully:", rows[0]); // Debugging Line
        res.status(200).json({ message: "Product updated successfully.", product: rows[0] });

    } catch (error) {
        console.error("🚨 Error updating product:", error);
        res.status(500).json({ message: "An error occurred while updating the product." });
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
