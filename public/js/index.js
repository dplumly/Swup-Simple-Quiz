// Ensure this is in every page's index.js
(function() {
    console.log('Quiz script initialized');

   
    document.addEventListener('click', function(event) {
        const answerButton = event.target.closest('.answer-button');
        const submitButton = event.target.closest('#submit');

        if (answerButton) {
            
            document.querySelectorAll('.answer-button').forEach(btn => btn.blur());
            answerButton.focus();
            window.selectedAnswer = answerButton.innerText;
        }

        if (submitButton) {
            const questionElement = document.querySelector('h1[data-question]');
            const questionNumber = questionElement 
                ? parseInt(questionElement.getAttribute('data-question')) 
                : null;

            if (window.selectedAnswer && questionNumber) {
                sessionStorage.setItem(`Question ${questionNumber}`, window.selectedAnswer);

                const totalQuestions = 3;
                
                if (questionNumber === totalQuestions) {
                    const quizData = Array.from({length: totalQuestions}, (_, i) => 
                        sessionStorage.getItem(`Question ${i + 1}`)
                    ).filter(Boolean);

                    fetch('/write-file', {
                        method: 'POST',
                        headers: { 'Content-Type': 'text/plain' },
                        body: quizData.join(', ')
                    })
                    .then(response => response.text())
                    .then(() => {
                        sessionStorage.clear();
                        swup.navigate('finish.html');
                    })
                    .catch(console.error);
                } else {
                    swup.navigate(`question${questionNumber + 1}.html`);
                }
            }
        }
    });
})();

