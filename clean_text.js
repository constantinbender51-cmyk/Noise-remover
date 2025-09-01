const express = require('express');
const fs = require('fs');
const path = require('path');

// Initialize the Express application
const app = express();
// Use the PORT environment variable provided by Railway, or default to 3000 for local development.
const PORT = process.env.PORT || 3000;

// The name of the input file.
const inputFile = 'book_with_noise.txt';

// The regular expression to match the date and time string.
const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z\s+\[inf\]\s+/gm;

// Define the main route to serve the cleaned text.
app.get('/', (req, res) => {
    // Read the content of the input file.
    fs.readFile(path.join(__dirname, inputFile), 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading the file: ${err.message}`);
            // Send a 500 status code and error message if the file can't be read.
            return res.status(500).send("Error reading the book file.");
        }

        // Use the regular expression to replace all matched patterns with an empty string.
        const cleanedText = data.replace(dateRegex, '');

        // Wrap the cleaned text in basic HTML for display on a webpage.
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Cleaned Book Text</title>
                <style>
                    body {
                        font-family: 'Inter', sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 800px;
                        margin: 2rem auto;
                        padding: 0 1rem;
                        background-color: #f4f4f4;
                    }
                    pre {
                        background-color: #fff;
                        padding: 1.5rem;
                        border-radius: 8px;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                        white-space: pre-wrap;
                    }
                </style>
            </head>
            <body>
                <h1>Cleaned Book Text</h1>
                <pre>${cleanedText}</pre>
            </body>
            </html>
        `;

        // Send the HTML response to the client.
        res.send(html);
    });
});

// Start the server.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
