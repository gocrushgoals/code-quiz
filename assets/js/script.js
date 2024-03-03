document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-btn');
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result');
    const questionElement = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const submitButton = document.getElementById('submit-btn');
    const scoreElement = document.getElementById('score');
    const initialsInput = document.getElementById('initials');
    const submitScoreButton = document.getElementById('submit-score');
    const timerElement = document.getElementById('time-left');

    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 60; // Initial time for the quiz

    // Quiz questions
    const questions = [
        {
            question: "What is 2 + 2?",
            answer: "4"
        },
        {
            question: "Who wrote Hamlet?",
            answer: "Shakespeare"
        },
        // Add more questions as needed
    ];

    startButton.addEventListener('click', startQuiz);

    function startQuiz() {
        startButton.classList.add('hide');
        quizContainer.classList.remove('hide');
        showQuestion();
        startTimer();
    }

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.innerText = currentQuestion.question;
    }

    function startTimer() {
        const timer = setInterval(function() {
            timeLeft--;
            timerElement.innerText = timeLeft;

            if (timeLeft === 0 || currentQuestionIndex === questions.length) {
                clearInterval(timer);
                endQuiz();
            }
        }, 1000);
    }

    submitButton.addEventListener('click', checkAnswer);

    function checkAnswer() {
        const userAnswer = answerInput.value.trim().toLowerCase();
        const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();

        if (userAnswer === correctAnswer) {
            score++;
        } else {
            timeLeft -= 10; // Subtract time for incorrect answer
            if (timeLeft < 0) timeLeft = 0; // Ensure time doesn't go negative
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }

        answerInput.value = ''; // Clear input field
    }

    function endQuiz() {
        quizContainer.classList.add('hide');
        resultContainer.classList.remove('hide');
        scoreElement.innerText = "Your score is: " + score;
    }

    submitScoreButton.addEventListener('click', saveScore);

    function saveScore() {
        // Implement saving score and initials logic here
        const initials = initialsInput.value.trim();
        // Example: Save score to localStorage
        localStorage.setItem('score', score);
        localStorage.setItem('initials', initials);
        // You may want to redirect the user or show some confirmation message
    }
});
