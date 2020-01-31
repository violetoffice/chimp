const board = document.querySelector(".gameboard");
const bossLevel = 10;

let steps = 2;
let lastClicked = 0;
let seatsTaken = [];

function buildBoard() {
  // clear board
  document.body.classList.remove("fail", "mask", "success");
  board.innerHTML = "";
  // reset values
  lastClicked = 0;
  seatsTaken = [];

  for (let i = 1; i <= steps; i++) {
    let seats = findSeats();
    board.innerHTML += `
      <div class="number" style="top: ${seats[0]}%; left: ${seats[1]}%">${i}</div>
    `;
  }
}

function findSeats() {
  // let seats = [getRandomInt(1,9)*10, getRandomInt(1,9)*10];
  let seats = [getRandomInt(1, 4) * 20, getRandomInt(1, 4) * 20];
  if (seatsTaken.find(s => JSON.stringify(s) == JSON.stringify(seats))) {
    // seat taken try again
    return findSeats();
  } else {
    seatsTaken.push(seats);
    return seats;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

board.addEventListener("click", e => {
  if (!e.target.classList.contains("number")) return;
  let clickedNum = Number(e.target.innerHTML);

  if (clickedNum == 1) {
    document.body.classList.add("mask");
  }
  if (clickedNum == lastClicked + 1) {
    lastClicked = clickedNum;
    e.target.remove();
    if (clickedNum == steps) {
      if (steps == bossLevel) {
        // won - game over
        board.innerHTML = '<div class="chimp">🐒</div>';
      } else {
        // next level
        document.body.classList.add("success");
        steps++;
        setTimeout(function() {
          buildBoard();
        }, 600);
      }
    }
  } else {
    // lost - game over
    document.body.classList.add("fail");
    document.body.classList.remove("mask");
    steps = 2;
    setTimeout(function() {
      buildBoard();
    }, 2000);
  }
});

buildBoard();