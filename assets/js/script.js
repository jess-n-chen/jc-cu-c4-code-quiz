// Declare Global Variables
// Initial Variables to Start
var timerEl = document.getElementById("timer");
var quesEl = document.getElementById("question-section");
var startEl = document.getElementById("start-btn");

// Variables Used During Quiz
var resultsEl = document.getElementById("results");

// End Form Variables
var endFormEl = document.getElementById("end-form");
var scoreEl = document.getElementById("score-text");
var scoreformEl = document.getElementById("submit-score");
var initialsEl = document.getElementById("initials");

// Question Count and Time Variables
var count = 1;
var timeLeft = 10;
var timerInterval;

// Question Bank
var questionBank = [
  {
    text: "Commonly used data types DO NOT include:",
    options: {
      option_1: "Strings",
      option_2: "Booleans",
      option_3: "Alerts",
      option_4: "Numbers",
    },
    answer: "3",
  },
  {
    text: "The condition in an if / else statement is enclosed with ____.",
    options: {
      option_1: "Quotes",
      option_2: "Curly brackets",
      option_3: "Parenthesis",
      option_4: "Square brackets",
    },
    answer: "3",
  },
  {
    text: "Arrays in JavaScript can be used to store ____.",
    options: {
      option_1: "Numbers and Strings",
      option_2: "Other arrays",
      option_3: "Booleans",
      option_4: "All of the above",
    },
    answer: "4",
  },
  {
    text: "String values must be enclosed within _____ when being assigned to variables.",
    options: {
      option_1: "Commas",
      option_2: "Curly brackets",
      option_3: "Quotes",
      option_4: "Parenthesis",
    },
    answer: "3",
  },
  {
    text: "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: {
      option_1: "JavaScript",
      option_2: "Terminal/Bash",
      option_3: "For Loops",
      option_4: "console.log",
    },
    answer: "4",
  },
];

function storeScoreObj(userInitials, userScore) {
  var entry = {
    initials: userInitials,
    score: userScore,
  };

  var currentScores = localStorage.getItem("scoreList");

  if (!currentScores) {
    currentScores = [];
  } else {
    currentScores = JSON.parse(currentScores);
  }
  console.log(currentScores);
  currentScores.push(entry);

  localStorage.setItem("scoreList", JSON.stringify(currentScores));
}

function saveScore(event) {
  event.preventDefault();
  resultsEl.setAttribute("style", "display: none;");

  var userInitials = initialsEl.value;

  // reset form field for next entry
  initialsEl.value = "";

  if (!userInitials) {
    alert("Please enter a valid response.");
  } else {
    var userScore = timeLeft;
    storeScoreObj(userInitials, userScore);
    window.location.href = "./highscore.html";
  }
}

function displayResults() {
  quesEl.innerHTML = "";
  endFormEl.setAttribute("style", "display: block;");
  scoreEl.textContent = `Your final score is ${timeLeft}`;
}

function checkAnswer(event) {
  var optionEl = event.target;

  if (optionEl.matches(".btn-option")) {
    var optionNumber = optionEl.getAttribute("data-number");

    if (optionNumber === questionBank[count].answer) {
      resultsEl.innerHTML = "<p>Correct!</p>";
      results.setAttribute("style", "display: block;");
    } else {
      resultsEl.innerHTML = "<p>Wrong!</p>";
      resultsEl.setAttribute("style", "display: block;");
    }
  }
  if (count < questionBank.length - 1) {
    count++;
    displayQuestions(count);
  } else {
    clearInterval(timerInterval);
    displayResults();
  }
}

function displayQuestions() {
  quesEl.innerHTML = `<div class="question-container">
  <h2>${questionBank[count].text}</h2>
  <ul class="options">
  <li><button class="btn-option" data-number="1">1. ${questionBank[count].options.option_1}</button></li>
  <li><button class="btn-option" data-number="2">2. ${questionBank[count].options.option_2}</button></li>
  <li><button class="btn-option" data-number="3">3. ${questionBank[count].options.option_3}</button></li>
  <li><button class="btn-option" data-number="4">4. ${questionBank[count].options.option_4}</button></li>
  </div>`;

  var optionsEl = document.querySelector(".options");
  optionsEl.addEventListener("click", checkAnswer);
}

// Timer that counts down from 60 seconds
function timer() {
  // Display Initial Time when Function Starts
  timerEl.textContent = `Time: ${timeLeft}`;
  // Function to Display Timer Countdown At Interval
  timerInterval = setInterval(function () {
    // Display Time Left when Greater than 0
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
      // Stop Timer
      clearInterval(timerInterval);
      displayResults();
    }
  }, 1000);
}

function startGame() {
  timer();
  displayQuestions();
}

/* Event Listeners */
startEl.addEventListener("click", startGame);
scoreformEl.addEventListener("submit", saveScore);
