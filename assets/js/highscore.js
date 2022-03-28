// Declare Global Variables
var scoreList = localStorage.getItem("scoreList");
var leaderboardEl = document.getElementById("leaderboard");
var clearEl = document.getElementById("clear-button");

function clearBoard() {
  leaderboardEl.innerHTML = "";
  localStorage.clear();
}
function displayLeaderboard(scoreList) {
  // Create List on Board
  var leaderboardList = document.createElement("ul");

  // Append New Elements to Board
  leaderboardEl.appendChild(leaderboardList);

  // Display Each Entry in Current Score List
  for (i = 0; i < scoreList.length; i++) {
    var scoreEntry = document.createElement("li");
    scoreEntry.textContent = `${i + 1}. ${scoreList[i].initials} - ${
      scoreList[i].score
    }`;
    leaderboardList.appendChild(scoreEntry);
    scoreEntry.setAttribute("class", "entry-item");
  }
}

// Sort Current Score List
function sortLeaderboard(scoreList) {
  scoreList.sort(function (score1, score2) {
    return score2.score - score1.score;
  });

  displayLeaderboard(scoreList);
}

if (!scoreList) {
  scoreList = [];
} else {
  scoreList = JSON.parse(scoreList);
  sortLeaderboard(scoreList);
}

// Event Listener
clearEl.addEventListener("click", clearBoard);
