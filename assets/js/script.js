document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-btn');
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result');
    const questionElement = document.getElementById('question');
    const optionAElement = document.getElementById('optionA');
    const optionBElement = document.getElementById('optionB');
    const optionCElement = document.getElementById('optionC');
    const optionDElement = document.getElementById('optionD');
    const submitButton = document.getElementById('submit-btn');
    const scoreElement = document.getElementById('score');
    const initialsInput = document.getElementById('initials');
    const submitScoreButton = document.getElementById('submit-score');
    const timerElement = document.getElementById('time-left');

    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 90; // Initial time for the quiz

    // Quiz questions with multiple choice options
    const questions = [
        {
            question: "What does HTML stand for?",
            options: {
                A: "Hyper Text Markup Language",
                B: "High Tech Markup Language",
                C: "Hyperlinks and Text Markup Language",
                D: "Home Tool Markup Language"
            },
            answer: "A"
        },
        {
            question: "What is the correct HTML element for inserting a line break?",
            options: {
                A: "<br>",
                B: "<lb>",
                C: "<break>",
                D: "<line>"
            },
            answer: "A"
        },
        {
            question: "Which of the following is used to style HTML elements?",
            options: {
                A: "HTML",
                B: "JavaScript",
                C: "CSS",
                D: "XML"
            },
            answer: "C"
        },
        {
            question: "Which of the following is NOT a valid data type in JavaScript?",
            options: {
                A: "<String>",
                B: "<Character>",
                C: "<Boolean>",
                D: "<Float>"
            },
            answer: "B"
        },
        {
            question: "Which CSS property is used to set the text color of an element?",
            options: {
                A: "font-color",
                B: "color",
                C: "text-color",
                D: "text"
            },
            answer: "B"
        },
        {
            question: "Which tag is used to embed an image in HTML?",
            options: {
                A: "<img>",
                B: "<image>",
                C: "<picture>",
                D: "<src>"
            },
            answer: "A"
        },
        {
            question: "What is the correct way to write a comment in JavaScript?",
            options: {
                A: "// This is a comment",
                B: "<!-- This is a comment -->",
                C: "/* This is a comment */",
                D: "# This is a comment"
            },
            answer: "C"
        },
        {
            question: "Which HTML tag is used to define an unordered list?",
            options: {
                A: "<ol>",
                B: "<list>",
                C: "<ul>",
                D: "<unordered>"
            },
            answer: "C"
        },
        {
            question: "What is the correct HTML tag for creating a hyperlink?",
            options: {
                A: "<a>",
                B: "<link>",
                C: "<hyperlink>",
                D: "<href>"
            },
            answer: "A"
        },
        {
            question: "Which HTML tag is used to define the main content of a web page?",
            options: {
                A: "<header>",
                B: "<body>",
                C: "<main>",
                D: "<section>"
            },
            answer: "C"
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
        optionAElement.innerText = currentQuestion.options.A;
        optionBElement.innerText = currentQuestion.options.B;
        optionCElement.innerText = currentQuestion.options.C;
        optionDElement.innerText = currentQuestion.options.D;
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
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (!selectedOption) return; // No option selected

        const userAnswer = selectedOption.value;

        if (userAnswer === questions[currentQuestionIndex].answer) {
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

        selectedOption.checked = false; // Uncheck the selected option
    }

    function endQuiz() {
        console.log("End quiz function called."); 
        // Log that the endQuiz function is called
    
    // Make sure the quiz container is hidden and result container is shown
        quizContainer.classList.add('hide');
        resultContainer.classList.remove('hide');
       // Display the final score
        scoreElement.innerText = "Your score is: " + score;
        console.log("Final score displayed: " + score); // Log the final score
    }

    submitScoreButton.addEventListener('click', saveScore);

    function saveScore() {
        const initials = initialsInput.value.trim();
        // Implement saving score and initials logic here
        localStorage.setItem('score', score);
        localStorage.setItem('initials', initials);
        // You may want to redirect the user or show some confirmation message
    }
});
