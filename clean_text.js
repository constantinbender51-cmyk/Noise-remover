const express = require('express');
const fs = require('fs');
const path = require('path');

// Initialize the Express application
const app = express();
// Use the PORT environment variable provided by Railway, or default to 3000 for local development.
const PORT = process.env.PORT || 3000;

// The name of the input file.
const inputFile = 'book_with_noise.txt';

// The regular expression to match the date and time string at the start of a line.
const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z\s+\[inf\]\s+/gm;

// The regular expression to match and remove the "Of course..." lines.
// It looks for a line starting with "Of course." and removes the entire line.
const ofCourseRegex = /^Of course\. Here is.*?[\r\n]+/gm;

// The specific string that marks the beginning of the actual book content.
const bookStartMarker = "The dust had a particular taste here, a metallic grit that settled on the tongue and clung to the back of the throat.";

// Define the main route to serve the cleaned text.
app.get('/', (req, res) => {
    // Read the content of the input file.
    fs.readFile(path.join(__dirname, inputFile), 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading the file: ${err.message}`);
            // Send a 500 status code and error message if the file can't be read.
            return res.status(500).send("Error reading the book file.");
        }

        let cleanedText = data;

        // Step 1: Remove all date and timestamp prints.
        cleanedText = cleanedText.replace(dateRegex, '');

        // Step 2: Find the true start of the book and discard everything before it.
        const startIndex = cleanedText.indexOf(bookStartMarker);
        if (startIndex !== -1) {
            cleanedText = cleanedText.substring(startIndex);
        }

        // Step 3: Remove all "Of course. Here is..." lines.
        cleanedText = cleanedText.replace(ofCourseRegex, '');

        // Step 4: Remove all asterisks.
        cleanedText = cleanedText.replaceAll('*', '');

        // Wrap the cleaned text in basic HTML for display on a webpage.
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Cleaned Book Text</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
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
                    h1 {
                        font-weight: 700;
                        color: #1a1a1a;
                        text-align: center;
                    }
                    pre {
                        background-color: #fff;
                        padding: 1.5rem;
                        border-radius: 8px;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                        white-space: pre-wrap;
                        font-size: 1rem;
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
