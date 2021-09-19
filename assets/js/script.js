//Variables
var timeEl = document.querySelector("#time");
var secondsLeft = 60;
var scoreEl = document.querySelector("#score");
var questionEl = document.querySelector("#question");
var questionCount = 0;
var initialsInput = document.querySelector("#initials");
var scoreListEl = document.querySelector("#score-list");
var scoreList = [];

//Constants
const introEl = document.querySelector("#intro");
const questionsEl = document.querySelector("#questions");
const yesnoEl = document.querySelector("#yesno");
const endEl = document.querySelector("#end");
const highscoresEl = document.querySelector("#highscores");
const startBtn = document.querySelector("#start");
const ansBtn = document.querySelectorAll("button.ansBtn");
const ans1Btn = document.querySelector("#answer1");
const ans2Btn = document.querySelector("#answer2");
const ans3Btn = document.querySelector("#answer3");
const ans4Btn = document.querySelector("#answer4");
const submitScrBtn = document.querySelector("#submit-score");
const goBackBtn = document.querySelector("#goback");
const clearScoreBtn = document.querySelector("#clear-scores");
const viewScoresBtn = document.querySelector("#view-scores");

const questions = [ 
    {
        // question 0
        question: "Which is not valid data type in Javascript?",
        answers: ["1. undefined", "2. boolean", "3. float", "4. number"],
        correctAnswer: "2" //Remember...0-4, not 1-5!!!!!
    },
    {
        // question 1
        question: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
        answers: ["1. last()", "2. put()", "3. push()", "4. None of the above"],
        correctAnswer: "2"
    },
    {
        // question 2
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "2"
    },
    {
        // question 3
        question: "Which of the following function of Number object forces a number to display in exponential notation?",
        answers: ["1. toExponential()", "2. toFixed()", "3. toPrecision()", "4. toLocaleString()"],
        correctAnswer: "0"
    },
    {
        // question 4
        question: "Which of the following function of Boolean object returns the primitive value of the Boolean object?",
        answers: ["1. toSource()", "2. valueOf()", "3. toString()", "4. None of the above"],
        correctAnswer: "1"
    }
];

//Timer
function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time Left: ${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            endEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}
//create questions
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
};
//Start
function startQuiz() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
};

//After answered, check value
function checkAnswer(event) {
    event.preventDefault();

    yesnoEl.style.display = "block";
    var p = document.createElement("p");
    yesnoEl.appendChild(p);

    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
};

function addScore(event) {
    event.preventDefault();

    endEl.style.display = "none";
    highscoresEl.style.display = "block";

    var init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    // sort scores
    scorelist = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (var i = 0; i < scoreList.length; i++) {
        var li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    var storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    if (storedScoreList !== null) {
        scoreList = storedScoreList;
        
    }
    
}

// clear scores
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

startBtn.addEventListener("click", startQuiz);

ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

submitScrBtn.addEventListener("click", addScore);

goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    introEl.style.display = "block";
    secondsLeft = 60;
    timeEl.textContent = `Time:${secondsLeft}s`;
});

clearScoreBtn.addEventListener("click", clearScores);

// View/Hide High Scores Button
viewScoresBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } else {
        return alert("No scores to show.");
    }
});



