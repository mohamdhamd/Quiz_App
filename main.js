const questions = [
    {
        question: "Which is largest animal in the world",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which is smallest continent in the world",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false },
        ]
    }
];
const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    })

}
function resetState() {
    nextBtn.style.display = "none";
    while (answerBtn.firstElementChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}
function selectAnswer(e){
    const selectBtn =e.target;
    const isCorrect = selectBtn.dataset.correct ==="true";
    if(isCorrect)
    {
        selectBtn.classList.add("correct");
        score++;
    }else
    {
        selectBtn.classList.add("incorrect")
    }
    Array.from(answerBtn.children).forEach(button =>{
        if(button.dataset.correct==="true")
        {
            button.classList.add("correct");
        }
        button.disabled =true;
    })
    nextBtn.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML =`Your scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML="Play Again";
    nextBtn.style.display="block";
}
function handelNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex <questions.length)
    {
        showQuestion();
    }else
    {
        showScore();
    }
}
nextBtn.addEventListener("click",()=>{
    if(currentQuestionIndex <questions.length){
        handelNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
