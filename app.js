//Variables
const width = 10;
const height = 21;
const numberOfBoxes = width * height;
let boxes = [];
let timerId;
const grid = document.querySelector(".grid");
const colors = ["orange", "red", "purple", "green", "blue"];
const playPause = document.querySelector(".playPausebtn");
const reset = document.querySelector(".resetBtn");
const footer = document.querySelector("footer");
const smallGrid = document.querySelector(".smallGrid");
const scoreSel = document.querySelector(".score");
const linesSel = document.querySelector(".lines");
const level = document.querySelector(".levels");
const sound = document.createElement("audio");
const sound2 = document.createElement("audio");
const sound3 = document.createElement("audio");
const sound4 = document.createElement("audio");
const sound5 = document.createElement("audio");
const sound6 = document.createElement("audio");
sound.volume = 0.1;
sound2.volume = 0.2;
sound3.volume = 0.2;
sound4.volume = 0.2;
sound5.volume = 0.1;
let score = 0;
let lines = 0;

// Function for the game grid
function createGrid() {
  for (let index = 0; index < numberOfBoxes; index++) {
    const box = document.createElement("div");
    document.querySelector(".grid").appendChild(box);
    boxes.push(box);
  }
}
createGrid();

//Creating the tetrominos using indexes and width to draw them across the grid.
//Each array contains the four different rotations of each tetromino

const lTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2],
];

const zTetromino = [
  [0, width, width + 1, width * 2 + 1],
  [width * 2, width * 2 + 1, width + 1, width + 2],
  [0, width, width + 1, width * 2 + 1],
  [width * 2, width * 2 + 1, width + 1, width + 2],
];

const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3, width + 3],
];

const tTetromino = [
  [width, width + 1, 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, 1, width * 2 + 1],
];

const boxTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

//Array which contains the five created tetrominos
const tetrominos = [
  lTetromino,
  zTetromino,
  iTetromino,
  tTetromino,
  boxTetromino,
];

//CurrentPosition is the position 4 in the grid where each tetromino starts
//from and current rotation 0 is the first rotation of each tetromino
let currentPosition = 4;
let currentRotation = 0;
let random = Math.floor(Math.random() * tetrominos.length);
let current = tetrominos[random][currentRotation];
console.log(tetrominos);
console.log(tetrominos.length);
console.log(current.length);

function createTetromino() {
  current.forEach((index) => {
    boxes[currentPosition + index].style.backgroundColor = colors[random]; //assigning a random color from colors array
    console.log(index);
  });
}

function removeTetromino() {
  current.forEach((index) => {
    boxes[currentPosition + index].style.backgroundColor = "";
  });
}

//Function for key input actions
function movement(event) {
  if (event.code === "ArrowRight") {
    goRight();
  } else if (event.code === "ArrowLeft") {
    goLeft();
  } else if (event.code === "ArrowDown") {
    scoreSel.innerText = score;
    score++;
    goDown();
  }
}
function keyRotate(event) {
  if (event.code === "ArrowUp") {
    rotate();
  }
}

//Function which makes the tetromino fall down
function goDown() {
  if (
    current.some(
      (index) =>
        boxes[currentPosition + index + width].classList.contains("taken") //checks if the next line contains the class taken.
      //If it does then it calls the freeze function otherwise keeps moving the tetromino to the next line
    )
  ) {
    freeze();
    sound.src = "audioFiles/mixkit-quick-lock-sound-2854.wav";
    sound.play();
  } else {
    removeTetromino();
    currentPosition += width;
    createTetromino();
  }
}

//Loop that creates 10 divs that do not have style then adds
//the class taken to them which will be used to freeze the tetromino at the bottom
for (let index = 200; index < 210; index++) {
  boxes[index].classList.add("taken");
  boxes[index].style.border = 0;
  boxes[index].style.width = 0;
}

//Function that is called in the goDown function to freeze the tetrominoes
//if they collide with a previously placed tetromino or with the bottom side
function freeze() {
  current.forEach((index) =>
    boxes[currentPosition + index].classList.add("taken")
  );
  random = nextRandom; //saving the value
  nextRandom = Math.floor(Math.random() * tetrominos.length);
  current = tetrominos[random][0];
  console.log(current);
  currentPosition = 4;
  removeLine();
  createTetromino();
  displayTetromino();
  gameOver();
}

//functions that stop the tetromino from going outside of the left border or right border of the grid

function goLeft() {
  removeTetromino();
  const leftBorder = current.some(
    (index) => (currentPosition + index) % width === 0
  );
  console.log(leftBorder);
  if (!leftBorder) {
    currentPosition--;
  }
  if (
    current.some((index) =>
      boxes[currentPosition + index].classList.contains("taken")
    )
  ) {
    currentPosition++;
  }
  createTetromino();
}

function goRight() {
  removeTetromino();
  const rightBorder = current.some(
    (index) => (currentPosition + index) % width === 9
  );
  console.log(rightBorder);

  if (!rightBorder) currentPosition++;

  if (
    current.some((index) =>
      boxes[currentPosition + index].classList.contains("taken")
    )
  ) {
    currentPosition--;
  }
  createTetromino();
}

//Functions that prevent the tetromino from spliting to other side of the grid when rotating at the edge of the border
function isAtRight() {
  return current.some((index) => (currentPosition + index + 1) % width === 0);
}

function isAtLeft() {
  return current.some((index) => (currentPosition + index) % width === 0);
}

function isAtBottom() {
  return current.some(
    (index) => currentPosition + index + width > numberOfBoxes
  );
}

function checkRotatedPosition() {
  //get current position.  Then, check if the piece is near the left side.
  if ((currentPosition + 1) % width < 4) {
    //add 1 because the position index can be 1 less than where the piece is (with how they are indexed).
    if (isAtRight()) {
      console.log("is it right is true");
      //use actual position to check if it's flipped over to right side
      currentPosition += 1; //if so, add one to wrap it back around
      checkRotatedPosition(); //Checks the rotated position again as in the case of a
      //longer tetromino like the l one it may need to be moved more than once
    }
  } else if (currentPosition % width > 5) {
    if (isAtLeft()) {
      currentPosition -= 1;
      checkRotatedPosition();
    }
  } else if (currentPosition % width > 184) {
    if (isAtBottom()) {
      currentPosition -= width;
      checkRotatedPosition();
    }
  }

  //check if the rotated tetromino overlaps with any taken squares
  if (
    current.some((index) =>
      boxes[currentPosition + index].classList.contains("taken")
    )
  ) {
    // move the tetromino up by one row
    currentPosition -= width;
    // If the tetromino still overlaps with any taken squares after moving up,
    // then move it back down and reset the current rotation.
    if (
      current.some((index) =>
        boxes[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition += width;
      currentRotation--;
      if (currentRotation < 0) {
        currentRotation = 3;
      }
      current = tetrominos[random][currentRotation];
    }
  }

  console.log(isAtBottom());
}

//Function that rotates the tetromino by looping throught the different rotation states

function rotate() {
  removeTetromino();
  currentRotation++;
  sound5.src = "audioFiles/mixkit-arcade-game-jump-coin-216.mp3";
  sound5.play();
  if (currentRotation > 3) {
    currentRotation = 0;
  }
  current = tetrominos[random][currentRotation];
  checkRotatedPosition();
  createTetromino();
}

//Play/Pause button logic

playPause.addEventListener("click", () => {
  if (timerId) {
    sound.src = "audioFiles/mixkit-positive-interface-beep-221.wav";
    sound.play();
    clearInterval(timerId);
    timerId = null;
    document.removeEventListener("keyup", keyRotate);
    document.removeEventListener("keydown", movement);
  } else {
    sound.src = "audioFiles/mixkit-arcade-score-interface-217.wav";
    sound.play();
    createTetromino();
    displayTetromino();
    timerId = setInterval(goDown, 1000);
    document.addEventListener("keyup", keyRotate);
    document.addEventListener("keydown", movement);
  }
});

//Removal of line if filled with tetrominoes
function removeLine() {
  for (let i = 0; i < 199; i += width) {
    const row = [
      //The row array is every row on the grid
      i,
      i + 1,
      i + 2,
      i + 3,
      i + 4,
      i + 5,
      i + 6,
      i + 7,
      i + 8,
      i + 9,
    ];
    console.log(row);
    if (row.every((index) => boxes[index].classList.contains("taken"))) {
      //if each of the squares of that row include the class taken the it does the following
      row.forEach((index) => {
        boxes[index].classList.remove("taken");
        boxes[index].style.backgroundColor = "";
      });
      sound2.src = "audioFiles/mixkit-retro-arcade-casino-notification-211.wav";
      sound2.play();
      lines++;
      linesSel.innerText = lines;
      if (lines === 5) {
        level.innerText = "Level 2";
        sound3.src = "audioFiles/mixkit-arcade-retro-changing-tab-206.wav";
        sound3.play();
        timerId = setInterval(goDown, 500);
      } else if (lines === 10) {
        sound3.src = "audioFiles/mixkit-arcade-retro-changing-tab-206.wav";
        sound3.play();
        level.innerText = "Level 3";
        timerId = setInterval(goDown, 200);
      }
      const boxesRemoved = boxes.splice(i, width); //With splice we get just the 10 last divs that contain the tetromino class
      boxes = boxesRemoved.concat(boxes); //With the concat method the array boxesRemoved is merged with the boxes array
      boxes.forEach((cell) => grid.appendChild(cell)); //The row that was deleted is appended on top of the grid so that the grid doesn't appear smaller
      console.log(boxesRemoved);
    }
  }
}

//Function that triggers if a tetromino is at the top row
function gameOver() {
  const topRow = Array.from(Array(width), (_, i) => i); // Create an array representing the indices of the top row
  const tetrominoOverlapping = topRow.some((index) =>
    boxes[index].classList.contains("taken")
  );
  if (tetrominoOverlapping) {
    clearInterval(timerId);
    sound4.src = "audioFiles/mixkit-arcade-retro-game-over-213.wav";
    sound4.play();
    const h1 = document.createElement("h1");
    h1.innerText = "GAME OVER";
    h1.style.color = "OldLace";
    footer.appendChild(h1);
    document.removeEventListener("keyup", keyRotate);
    document.removeEventListener("keydown", movement);
  }
}

reset.addEventListener("click", () => {
  const sound6 = new Audio("audioFiles/mixkit-game-flute-bonus-2313.wav");
  sound6.play();
  sound6.volume = 0.1;
  setTimeout(() => {
    window.location.reload();
  }, 600); // Delay the reload so that the sound can play
});

//Variables for small grid
const displayWidth = 4;
const smallWidth = 4;
const smallHeight = 4;
const smallNumberOfBoxes = smallWidth * smallHeight;
let smallBoxes = [];
let nextRandom = 0;

//function for creating small grid
function createSmallGrid() {
  for (let index = 0; index < smallNumberOfBoxes; index++) {
    const smallBox = document.createElement("div");
    document.querySelector(".smallGrid").appendChild(smallBox);
    smallBoxes.push(smallBox);
  }
}
createSmallGrid();
console.log(smallBoxes);
console.log(boxes);

//Array which contains the first rotation state of each of the tetrominoes
const nextTetromino = [
  [1, displayWidth + 1, displayWidth * 2 + 1, 2],
  [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
  [displayWidth, displayWidth + 1, 1, displayWidth + 2],
  [0, 1, displayWidth, displayWidth + 1],
];

//Function to display the next tetromino
function displayTetromino() {
  smallBoxes.forEach((square) => {
    square.classList.remove("tetromino"); //removes the previous tetromino so that they dont overlap with each other
    square.style.backgroundColor = "";
  });
  nextTetromino[nextRandom].forEach((index) => {
    smallBoxes[index].classList.add("tetromino");
    smallBoxes[index].style.backgroundColor = colors[nextRandom]; //nextRandom passes its value to random value
  });
}

//Event listener to prevent scrolling of page when pressing the down arrow key
window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);
