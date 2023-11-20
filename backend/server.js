const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const axios = require('axios');
// const nodemailer = require('nodemailer');
// const crypto = require('crypto');
// const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    user: "sql12661216",
    password: "RYz25QYwBj",
    database: "sql12661216"
})

app.post('/signup', (req, res) => {
    console.log('Received data:', req.body);

    const sql = "INSERT INTO users (`name`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [req.body.name, req.body.email, req.body.password];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting into database:', err);
            return res.json("Error");
        }
        console.log('Data inserted into database:', data);
        return res.json(data);
    });
});

app.post('/login', (req, res) => {
    console.log('Received data:', req.body);

    const { email, password, captchaValue } = req.body;

    const captchaSecretKey = '6Ld77hQpAAAAAD886gEc0TolWXUSKzv5ypOzbVmd';

    axios
        .post(`https://www.google.com/recaptcha/api/siteverify?secret=${captchaSecretKey}&response=${captchaValue}`)
        .then((captchaRes) => {
            if (captchaRes.data.success) {

                const sql = "SELECT * FROM users WHERE `email` = ? AND `password` = ?";
                db.query(sql, [email, password], (err, result) => {
                    if (err) {
                        return res.json("Error");
                    }
                    if (result.length > 0) {

                        return res.json("Success");
                    } else {

                        return res.json("Failed");
                    }
                });
            } else {

                return res.status(400).json("Captcha verification failed");
            }
        })
        .catch((captchaErr) => {
            console.error('Captcha verification error:', captchaErr);
            return res.status(500).json("Internal server error");
        });
});

// app.post('/forgot-password', (req, res) => {
//     const { email } = req.body;

//     const resetToken = crypto.randomBytes(20).toString('hex');
//     const expirationDate = new Date();
//     expirationDate.setHours(expirationDate.getHours() + 1);

//     const sql = "UPDATE users SET reset_token = ?, reset_token_expiration = ? WHERE email = ?";
//     db.query(sql, [resetToken, expirationDate, email], (err, result) => {
//         if (err) {
//             console.error('Error updating reset token in database:', err);
//             return res.json({ status: "error", message: "Error updating reset token" });
//         }

//         if (result.affectedRows > 0) {
//             sendResetEmail(email, resetToken);
//             return res.json({ status: "success", message: "Reset email sent successfully" });
//         } else {
//             return res.json({ status: "failed", message: "User not found" });
//         }
//     });
// });

// app.post('/reset-password', (req, res) => {
//     const { email, token, password } = req.body;

//     const sql = "SELECT * FROM users WHERE email = ? AND reset_token = ? AND reset_token_expiration > NOW()";
//     db.query(sql, [email, token], (err, result) => {
//         if (err) {
//             console.error('Error querying reset token from database:', err);
//             return res.json({ status: "error", message: "Error querying reset token" });
//         }

//         if (result.length > 0) {
//             const updateSql = "UPDATE users SET password = NULL, reset_token = NULL, reset_token_expiration = NULL WHERE email = ?";
//             db.query(updateSql, [email], (updateErr, updateResult) => {
//                 if (updateErr) {
//                     return res.json({ status: "error", message: "Error updating password" });
//                 }

//                 return res.json({ status: "success", message: "Password reset successfully" });
//             });
//         } else {
//             return res.json({ status: "failed", message: "Invalid or expired reset token" });
//         }
//     });
// });

// function sendResetEmail(email, token) {
//     // Create a nodemailer transporter using your email service provider's credentials
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'your-email@gmail.com',  // Replace with your email address
//             pass: 'your-password'         // Replace with your email password
//         }
//     });

//     // Define email options
//     const mailOptions = {
//         from: 'your-email@gmail.com',  // Replace with your email address
//         to: email,
//         subject: 'Reset Password Link',
//         text: `http://localhost:8081/reset-password?email=${email}&token=${token}`
//     };

//     // Send the email
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error sending reset email:', error);
//         } else {
//             console.log('Reset email sent:', info.response);
//         }
//     });
// }

// // Example usage
// // Replace 'user-email@gmail.com' and 'reset-token' with actual values
// sendResetEmail('user-email@gmail.com', 'reset-token');



app.post('/changepassword', (req, res) => {
    console.log('Received data:', req.body);

    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
        return res.status(400).json({ status: "error", message: "Invalid request body" });
    }

    const sqlUpdate = "UPDATE users SET `password` = ? WHERE `email` = ?";
    console.log('SQL Query:', sqlUpdate);

    db.query(sqlUpdate, [newPassword, email], (updateErr, updateResult) => {
        console.log('Update Error:', updateErr);
        console.log('Update Result:', updateResult);

        if (updateErr) {
            return res.status(500).json({ status: "error", message: "Error updating password", error: updateErr });
        }

        if (updateResult.affectedRows > 0) {
            // Password updated successfully
            return res.json({ status: "success", message: "Password updated successfully" });
        } else {
            // User not found or current password incorrect
            return res.status(404).json({ status: "failed", message: "User not found or current password incorrect" });
        }
    });
});


app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
