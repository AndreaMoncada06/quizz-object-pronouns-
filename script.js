// ---------------------------
// Lista de preguntas
// ---------------------------
const questions = [
    {
        text: "Peter is very kind. Everyone likes ___.",
        options: ["he", "him", "his"],
        correct: "him",
        explanation: "La respuesta correcta es 'him' porque es el pronombre objeto de 'he'."
    },
    {
        text: "I know ___.",
        options: ["she", "her", "hers"],
        correct: "her",
        explanation: "La respuesta correcta es 'her' porque es el pronombre objeto de 'she'."
    },
    {
        text: "We are going to visit ___.",
        options: ["they", "them", "their"],
        correct: "them",
        explanation: "La respuesta correcta es 'them' porque es el pronombre objeto de 'they'."
    },
    {
        text: "This is my phone. Please give it back to ___.",
        options: ["me", "them", "its"],
        correct: "me",
        explanation: "La respuesta correcta es 'me' porque es el pronombre objeto de 'I'."
    },
    {
        text:"I love my parents. I always visit ___.",
        options: ["they", "them", "their"],
        correct: "them",
        explanation: "La respuesta correcta es 'them' porque es el pronombre objeto de 'they'."
    },
    {
        text: "This is Sarah. Do you know ___?",
        options: ["she", "hers", "her"],
        correct: "her",
        explanation: "La respuesta correcta es 'her' porque es el pronombre objeto de 'she'."
    },
    {
        text: "We are very hungry. Can you cook for ___?",
        options: ["we", "our", "us"],
        correct: "us",
        explanation: "La respuesta correcta es 'us' porque es el pronombre objeto de 'we'."
    },
    {
        text: "I like my teacher. I always listen to ___.",
        options: ["him", "his", "he"],
        correct: "him",
        explanation: "La respuesta correcta es 'him' porque es el pronombre objeto de 'he'."
    },
    {
        text: "This is my dog. I really like ___.",
        options: ["it", "its", "they"],
        correct: "it",
        explanation: "La respuesta correcta es 'it' porque es el pronombre objeto que usamos para cosas o animales."
    },
    {
        text: "They are my friends. Do you know ___.",
        options: ["they", "them", "their"],
        correct: "them",
        explanation: "La respuesta correcta es 'them' porque es el pronombre objeto de 'they'."
    }
];

// ---------------------------
// Variables de control
// ---------------------------
let currentQuestion = 0;
let score = 0;

// Elementos del DOM
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");
const explanationEl = document.getElementById("explanation");

const finalMessageEl = document.getElementById("final-message");
const finalScoreEl = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar");

// ---------------------------
// Sonidos
// ---------------------------
const soundCorrect = new Audio("sounds/correct.mp3");
const soundWrong = new Audio("sounds/wrong.mp3");   

// ---------------------------
// Función para mostrar una pregunta
// ---------------------------
function showQuestion() {
    optionsEl.innerHTML = "";
    explanationEl.textContent = "";
    nextBtn.style.display = "none";

    const q = questions[currentQuestion];
    questionEl.textContent = q.text;

    // 🔹 Actualizar barra de progreso
    progressBar.textContent = `${currentQuestion + 1}/${questions.length}`;

    q.options.forEach((option) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("option-btn");

        btn.addEventListener("click", () => selectAnswer(option));
        optionsEl.appendChild(btn);
    });
}

// ---------------------------
// Función al seleccionar respuesta
// ---------------------------
function selectAnswer(selected) {
    const q = questions[currentQuestion];

    if (selected === q.correct) {
        score++;
        explanationEl.textContent = "✅ Right!";
        explanationEl.className = "correct";
        soundCorrect.play(); // <-- 🎵 sonido de acierto
    } else {
        explanationEl.textContent = "❌ Wrong. " + q.explanation;
        explanationEl.className = "wrong";
        soundWrong.play(); // <-- 🎵 sonido de error
    }

    scoreEl.textContent = `Score: ${score}`;

    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach(btn => btn.disabled = true);

    nextBtn.style.display = "block";
}

// ---------------------------
// Avanzar a la siguiente pregunta
// ---------------------------
nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showFinal();
    }
});

// ---------------------------
// Mostrar resultado final
// ---------------------------
function showFinal() {
    quizScreen.style.display = "none";
    resultScreen.style.display = "flex";

    finalScoreEl.textContent = `${score}/${questions.length}`;

    // 🎖️ Mensajes personalizados
    if (score === questions.length) {
        finalMessageEl.textContent = "PERFECT SCORE! You're amazing!";
    } else if (score >= 8) {
        finalMessageEl.textContent = "Excellent job!";
    } else if (score >= 5) {
        finalMessageEl.textContent = "Good effort!";
    } else {
        finalMessageEl.textContent = "Keep practicing!";
    }
}


// ---------------------------
// Iniciar juego desde el botón de inicio
// ---------------------------
startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    quizScreen.style.display = "flex";  // ahora sí aparece como pantalla
    currentQuestion = 0;
    score = 0;
    scoreEl.textContent = `Score: ${score}`;
    showQuestion();
});

// ---------------------------
// Reiniciar el juego
// ---------------------------
restartBtn.addEventListener("click", () => {
    resultScreen.style.display = "none";
    startScreen.style.display = "flex";     
});
