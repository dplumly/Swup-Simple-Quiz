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

// POST route to write CSV data
app.post('/write-file', async (req, res) => {
    try {
        await ensureDirectoryExists(analyticsDir);
        const filePath = path.join(analyticsDir, 'analytics.csv');
        const data = req.body; // CSV data from client

        console.log(`Data received from client: ${data}`); // Log the data received

        // Check the type of the incoming data
        console.log('Type of data:', typeof data);

        // Ensure data is a string
        if (typeof data !== 'string') {
            throw new Error('Data must be a string.');
        }

        // Append the data to the CSV file
        await fs.appendFile(filePath, data);
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
