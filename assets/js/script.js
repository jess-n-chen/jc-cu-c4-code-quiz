var timerEl = document.getElementById("timer");
var mainEl = document.getElementById("page-content");

// Timer that counts down from 75 seconds
function timer() {
  var timeLeft = 10;

  // Function to Display Timer Countdown At Interval
  var timerInterval = setInterval(function () {
    // Display Time Left when Greater than 0
    if (timeLeft > 0) {
      timerEl.textContent = `Time: ${timeLeft}`;
      timeLeft--;
    } else {
      timerEl.textContent = `Time: 0`;
      // Stop Timer
      clearInterval(timer);
    }
  }, 1000);
}
