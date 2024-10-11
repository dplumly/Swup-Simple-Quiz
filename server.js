const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse text (CSV data)
app.use(express.text());

// Serve static files
app.use(express.static('public'));

// Ensure analytics directory exists
const analyticsDir = path.join(__dirname, 'analytics');

async function ensureDirectoryExists(directory) {
    try {
        await fs.access(directory);
    } catch (error) {
        await fs.mkdir(directory);
        console.log('Analytics directory created.');
    }
}

app.post('/write-file', async (req, res) => {
    try {
        const filePath = path.join(__dirname, 'analytics/analytics.csv');
        const data = req.body; // This will be the entire session's data in a single line

        // Append the data to the CSV file
        await fs.appendFile(filePath, data + "\n");  // Add a newline after the session data
        res.send('CSV data has been saved!');
    } catch (err) {
        console.error('Error writing to file:', err);
        res.status(500).send('Failed to write CSV file');
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
