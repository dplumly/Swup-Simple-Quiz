console.log('init client.js');

// Helper function to send data as CSV
function sendDataAsCSV(data) {
    console.log(`Sending data: ${data}`);

    fetch('/write-file', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'  
        },
        body: data 
    })
    .then(response => response.text())
    .then(data => {
        console.log('Response from server:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Event listeners for each button
document.getElementById('data1').addEventListener('click', () => {
    let data = "Button 1 - Data 1 \n"; 
    sendDataAsCSV(data);
});

document.getElementById('data2').addEventListener('click', () => {
    let data = "Button 2 - Data 2 \n"; 
    sendDataAsCSV(data);
});

document.getElementById('data3').addEventListener('click', () => {
    let data = "Button 3 - Data 3 \n"; 
    sendDataAsCSV(data);
});
