console.log('init client.js');

// Variable to hold the selected answer
let selectedAnswer = null;

// Get the current question number from the HTML (from the h2 tag)
const questionElement = document.querySelector('h2[data-question]');
const questionNumber = parseInt(questionElement.getAttribute('data-question'));

// Add event listeners to each button to track the selected answer
document.querySelectorAll('.answer-button').forEach(button => {
    button.addEventListener('click', (event) => {
        selectedAnswer = event.target.innerText; // Get the text of the clicked button
        console.log(`Selected answer: ${selectedAnswer}`);
    });
});

// Function to store the selected answer in sessionStorage
function setLatestData(question, answer) {
    sessionStorage.setItem(question, answer); // Store the selected answer without "Selected" keyword
}

// Submit button logic
document.getElementById('submit').addEventListener('click', () => {
    if (selectedAnswer) {
        // Store the answer in sessionStorage for the current question
        setLatestData(`Question ${questionNumber}`, selectedAnswer); // Only store the answer text

        const totalQuestions = 3; // Adjust this range based on total questions

        // If the current question is the last question, submit all answers
        if (questionNumber === totalQuestions) {
            let quizData = [];

            // Collect all answers from sessionStorage for the CSV output
            for (let i = 1; i <= totalQuestions; i++) { 
                const answer = sessionStorage.getItem(`Question ${i}`);
                if (answer) {
                    quizData.push(answer); // Collect all answers (no "Question X:" or "Selected")
                }
            }

            // Join the answers with commas for cleaner CSV format
            const quizDataString = quizData.join(', '); // Ensure commas separate answers

            // Submit the entire quiz data via fetch
            fetch('/write-file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: quizDataString // Use the joined string here
            })
            .then(response => response.text())
            .then(data => {
                console.log('Response from server:', data);

                // Clear session storage after the last question is submitted
                sessionStorage.clear();

                // Redirect to the finish page
                window.location.href = "finish.html";
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            // Redirect to the next question page if not the last question
            window.location.href = `question${questionNumber + 1}.html`;
        }
    } else {
        console.log('Please select an answer before submitting.');
    }
});


















// console.log('init client.js');

// // Variable to hold the selected answer
// let selectedAnswer = null;

// // Get the current question number from the HTML (from the h2 tag)
// const questionElement = document.querySelector('h2[data-question]');
// const questionNumber = parseInt(questionElement.getAttribute('data-question'));

// // Add event listeners to each button to track the selected answer
// document.querySelectorAll('.answer-button').forEach(button => {
//     button.addEventListener('click', (event) => {
//         selectedAnswer = event.target.innerText; // Get the text of the clicked button
//         console.log(`Selected answer: ${selectedAnswer}`);
//     });
// });

// // Function to store the selected answer in sessionStorage
// function setLatestData(question, answer) {
//     sessionStorage.setItem(question, answer); // Store the selected answer
// }

// // Submit button logic
// document.getElementById('submit').addEventListener('click', () => {
//     if (selectedAnswer) {
//         // Store the answer in sessionStorage for the current question
//         setLatestData(`question${questionNumber}`, `Question ${questionNumber},${selectedAnswer},Selected\n`);

//         // Submit the answer via fetch
//         fetch('/write-file', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'text/plain'
//             },
//             body: sessionStorage.getItem(`question${questionNumber}`)
//         })
//         .then(response => response.text())
//         .then(data => {
//             console.log('Response from server:', data);

//             // Redirect to the next question page
//             const totalQuestions = 3;  // Adjust the total number of questions here

//             if (questionNumber < totalQuestions) {
//                 // Redirect to the next question page (e.g., "two.html", "three.html", etc.)
//                 window.location.href = `question${questionNumber + 1}.html`;
//             } else {
//                 // If on the last question, either redirect to a results page or handle end logic
//                 window.location.href = "finish.html";  // Update this to the correct end page if needed
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     } else {
//         console.log('Please select an answer before submitting.');
//     }
// });
