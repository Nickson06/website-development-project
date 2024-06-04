const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Wedidit@20',
  database: 'wedidit_db'
});

// Open the connection to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as ID', connection.threadId);
});

// Subscribe to newsletter endpoint
app.post('/subscribe', (req, res) => {
  const { email } = req.body;

  console.log('Received subscription request:', req.body);

  if (!email) {
    return res.status(400).send('Email is required');
  }

  // Save the email to the database or perform any other necessary action
  const query = 'INSERT INTO subscribers (email) VALUES (?)';
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Internal server error');
    }
    res.status(200).send('Subscription successful');
  });
});

// Contact form endpoint
app.post('/contact', (req, res) => {
  const { name, email, number, message } = req.body;

  console.log('Received contact request:', req.body);

  if (!name || !email || !number || !message) {
    return res.status(400).send('All fields are required');
  }

  // Save the contact details to the subscribers table
  const query = 'INSERT INTO subscribers (name, email, number, message) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, email, number, message], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Internal server error');
    }
    res.status(200).send('Message sent successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
