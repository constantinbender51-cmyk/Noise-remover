const express = require('express');
const fs = require('fs');
const path = require('path');

// Initialize the Express application
const app = express();
// Use the PORT environment variable provided by Railway, or default to 3000 for local development.
const PORT = process.env.PORT || 3000;

// The name of the input file for the first book.
const architectsFile = 'book_with_noise.txt';

// The regular expression to match the date and time string at the start of a line.
const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z\s+\[inf\]\s+/gm;

// The regular expression to match and remove the "Of course..." lines.
const ofCourseRegex = /^Of course\. Here is.*?[\r\n]+/gm;

// The specific string that marks the beginning of the actual book content.
const architectsBookStartMarker = "The dust had a particular taste here, a metallic grit that settled on the tongue and clung to the back of the throat.";
const stillnessBookStartMarker = "The sun did not so much rise over";
const dumplingsBookStartMarker = "The Beijing air hit me like a ";
const wisdomBookStartMarker = "The sun fell upon the sacred";

// Define the route for "The Architects of Silence" under the /architects/ directory.
app.get('/architects/', (req, res) => {
    // Read the content of the input file.
    fs.readFile(path.join(__dirname, architectsFile), 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading the file: ${err.message}`);
            // Send a 500 status code and error message if the file can't be read.
            return res.status(500).send("Error reading the book file.");
        }

        let cleanedText = data;

        // Step 1: Remove all date and timestamp prints.
        cleanedText = cleanedText.replace(dateRegex, '');

        // Step 2: Find the true start of the book and discard everything before it.
        const startIndex = cleanedText.indexOf(architectsBookStartMarker);
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
                <title>The Architects of Silence</title>
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
                <h1>The Architects of Silence</h1>
                <pre>${cleanedText}</pre>
            </body>
            </html>
        `;

        // Send the HTML response to the client.
        res.send(html);
    });
});

// Define the route for "The Stillness Valley" under the /stillness/ directory.
app.get('/stillness/', (req, res) => {
    // Read the content of the new book file.
    fs.readFile(path.join(__dirname, 'stillness.txt'), 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading the stillness file: ${err.message}`);
            return res.status(500).send("Error reading the stillness book file.");
        }

        let cleanedText = data;
        
        // Remove all date and timestamp prints.
        cleanedText = cleanedText.replace(dateRegex, '');

        // Find the true start of the book and discard everything before it.
        const startIndex = cleanedText.indexOf(stillnessBookStartMarker);
        if (startIndex !== -1) {
            cleanedText = cleanedText.substring(startIndex);
        }

        // Remove all apostrophes.
        cleanedText = cleanedText.replaceAll("'", '');
        
        // Wrap the raw text in basic HTML for display.
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>The Stillness Valley</title>
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
                <h1>The Stillness Valley</h1>
                <pre>${cleanedText}</pre>
            </body>
            </html>
        `;
        res.send(html);
    });
});

// Define the route for "The Dumpling Diaries" under the /dumplings/ directory.
app.get('/dumplings/', (req, res) => {
    // Read the content of the dumplings file.
    fs.readFile(path.join(__dirname, 'dumplings.txt'), 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading the dumplings file: ${err.message}`);
            return res.status(500).send("Error reading the dumpling book file.");
        }

        let cleanedText = data;
        
        // Remove all date and timestamp prints.
        cleanedText = cleanedText.replace(dateRegex, '');

        // Find the true start of the book and discard everything before it.
        const startIndex = cleanedText.indexOf(dumplingsBookStartMarker);
        if (startIndex !== -1) {
            cleanedText = cleanedText.substring(startIndex);
        }

        // Remove all asterisks.
        cleanedText = cleanedText.replaceAll('*', '');
        
        // Wrap the raw text in basic HTML for display.
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>The Dumpling Diaries</title>
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
                <h1>The Dumpling Diaries</h1>
                <pre>${cleanedText}</pre>
            </body>
            </html>
        `;
        res.send(html);
    });
});

// Define the route for "The Unheeded Oracle: A Dialogue on Wisdom" under the /wisdom/ directory.
app.get('/wisdom/', (req, res) => {
    fs.readFile(path.join(__dirname, 'wisdom.txt'), 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading the wisdom file: ${err.message}`);
            return res.status(500).send("Error reading the wisdom book file.");
        }

        let cleanedText = data;
        
        // Remove all date and timestamp prints.
        cleanedText = cleanedText.replace(dateRegex, '');

        // Remove the conversational segments.
        cleanedText = cleanedText.replace(ofCourseRegex, '');

        // Find the true start of the book and discard everything before it.
        const startIndex = cleanedText.indexOf(wisdomBookStartMarker);
        if (startIndex !== -1) {
            cleanedText = cleanedText.substring(startIndex);
        }

        // Remove all asterisks.
        cleanedText = cleanedText.replaceAll('*', '');
        
        // Wrap the raw text in basic HTML for display.
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>The Unheeded Oracle</title>
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
                <h1>The Unheeded Oracle: A Dialogue on Wisdom</h1>
                <audio controls src="/wisdom.mp3"></audio>
                <pre>${cleanedText}</pre>
            </body>
            </html>
        `;
        res.send(html);
    });
});


// A simple landing page to direct users to the books.
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Book Server</title>
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
                    text-align: center;
                }
                h1 {
                    font-weight: 700;
                    color: #1a1a1a;
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                }
                li {
                    margin: 1rem 0;
                }
                a {
                    display: inline-block;
                    padding: 0.75rem 1.5rem;
                    background-color: #007bff;
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: bold;
                    transition: background-color 0.3s;
                }
                a:hover {
                    background-color: #0056b3;
                }
            </style>
        </head>
        <body>
            <h1>Welcome to the Book Server</h1>
            <p>Please select a book to read:</p>
            <ul>
                <li><a href="/architects/">The Architects of Silence</a></li>
                <li><a href="/stillness/">The Stillness Valley</a></li>
                <li><a href="/dumplings/">The Dumpling Diaries</a></li>
                <li><a href="/wisdom/">The Unheeded Oracle: A Dialogue on Wisdom</a></li>
            </ul>
        </body>
        </html>
    `);
});

// Start the server.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
