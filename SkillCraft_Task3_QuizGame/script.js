const questions = [
{
    question: "What does HTML stand for?",
    answers: [
        { text: "Hyper Text Markup Language", correct: true },
        { text: "High Text Machine Language", correct: false },
        { text: "Hyperlinks Text Markup Language", correct: false },
        { text: "Home Tool Markup Language", correct: false }
    ]
},
{
    question: "Which language is used for styling web pages?",
    answers: [
        { text: "HTML", correct: false },
        { text: "CSS", correct: true },
        { text: "Python", correct: false },
        { text: "Java", correct: false }
    ]
},
{
    question: "Which language is used to make web pages interactive?",
    answers: [
        { text: "HTML", correct: false },
        { text: "JavaScript", correct: true },
        { text: "CSS", correct: false },
        { text: "SQL", correct: false }
    ]
},
{
    question: "Which tag is used to create a paragraph?",
    answers: [
        { text: "<p>", correct: true },
        { text: "<h1>", correct: false },
        { text: "<div>", correct: false },
        { text: "<br>", correct: false }
    ]
},
{
    question: "Which property changes text color in CSS?",
    answers: [
        { text: "font-color", correct: false },
        { text: "color", correct: true },
        { text: "background", correct: false },
        { text: "text-style", correct: false }
    ]
}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.style.background = "green";
        score++;
    } else {
        selectedBtn.style.background = "red";
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.style.background = "green";
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! 🎉`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();