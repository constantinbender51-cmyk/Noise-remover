const fs = require('fs');
const path = require('path');

// Define the name of the input file.
const inputFile = 'book_with_noise.txt';

// The regular expression to match the date and time string.
// It looks for a pattern like "2025-09-01T18:41:13.175633843Z [inf]  " at the beginning of each line.
const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z\s+\[inf\]\s+/gm;

// Read the content of the input file.
fs.readFile(path.join(__dirname, inputFile), 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading the file: ${err.message}`);
        return;
    }

    // Use the regular expression to replace all matched patterns with an empty string.
    const cleanedText = data.replace(dateRegex, '');

    // Print the cleaned text to the console.
    console.log(cleanedText);
});
