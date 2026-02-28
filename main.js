class Player {
  constructor() {
    this.cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.playerEl = Element;
  }
}

let players = [];
let numOfPlayers;
let activePlayer = 0;

let cubeEl;
let cube1;
let cube2;

let rerolButton;
let cubeButton1;
let cubeButton2;

satartNewGame();

function satartNewGame() {
  document.querySelector("#turn").innerHTML = "";
  document.querySelector("#playerContaner").innerHTML = "";

  let playerCountInput = document.createElement("input");
  playerCountInput.id = "playerCount";
  playerCountInput.type = "number";
  playerCountInput.placeholder = "Number of players";
  document.querySelector("#gameStart").appendChild(playerCountInput);

  let startButton = document.createElement("button");
  startButton.id = "playerCountButton";
  startButton.innerText = "Enter";
  document.querySelector("#gameStart").appendChild(startButton);
  startButton.addEventListener("click", startGame);

  document.querySelector("footer").innerHTML = "";
}

function renderCards(player) {
  let cardsEl = player.playerEl.querySelector(".cards");
  cardsEl.innerHTML = "";

  for (let i = 0; i < 12; i++) {
    let div = document.createElement("div");
    div.innerText = i + 1;
    div.classList.add("card");
    if (player.cards.includes(i + 1)) {
      div.style.backgroundColor = "bisque";
    } else {
      div.style.backgroundColor = "rgb(232, 255, 168)";
    }
    cardsEl.appendChild(div);
  }

  checkWin(player);
}

function rollDice(player) {
  cubeEl.innerHTML = "";
  cubeEl.style.fontSize = "14px";

  cubeButton1 = document.createElement("button");
  cubeEl.appendChild(cubeButton1);
  cubeButton2 = document.createElement("button");
  cubeEl.appendChild(cubeButton2);
  rerolButton = document.createElement("button");
  cubeEl.appendChild(rerolButton);
  rerolButton.innerText = "Skip";

  cubeButton1.addEventListener("click", () => deleteTwoCards(player));
  cubeButton2.addEventListener("click", () => deleteOneCard(player));
  rerolButton.addEventListener("click", () => switchPlayer(player));

  cube1 = Math.floor(Math.random() * 6) + 1;
  cube2 = Math.floor(Math.random() * 6) + 1;

  cubeButton1.innerText = cube1 + ", " + cube2;
  cubeButton2.innerText = cube1 + cube2;

  if (
    !player.cards.includes(cube1) ||
    !player.cards.includes(cube2) ||
    cube1 === cube2
  ) {
    cubeButton1.disabled = true;
  }
  if (!player.cards.includes(cube1 + cube2)) {
    cubeButton2.disabled = true;
  }
}

function reset() {
  document.querySelector("#turn").innerHTML =
    "Player " + (activePlayer + 1) + " turn";

  for (let player of players) {
    player.cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    renderCards(player);
  }

  rollDice(players[0]);
}

function checkWin(player) {
  if (player.cards.length === 0) {
    document.querySelector("#playerContaner").innerHTML =
      "Player " + (players.indexOf(player) + 1) + " win!";
    document.querySelector("#playerContaner").style.fontSize = "5em";

    document.querySelector("#cube").innerHTML = "";
    document.querySelector("#turn").innerHTML = "";
  }
}

function deleteOneCard(player) {
  let index = player.cards.indexOf(cube1 + cube2);
  player.cards.splice(index, 1);

  switchPlayer(player);
  renderCards(player);
}

function deleteTwoCards(player) {
  let index = player.cards.indexOf(cube1);
  player.cards.splice(index, 1);

  index = player.cards.indexOf(cube2);
  player.cards.splice(index, 1);

  switchPlayer(player);
  renderCards(player);
}

function switchPlayer() {
  players[activePlayer].playerEl.style.background =
    "linear-gradient(135deg, #ff416c, #ff4b2b)";

  activePlayer = (activePlayer + 1) % numOfPlayers;
  document.querySelector("#turn").innerHTML =
    "Player " + (activePlayer + 1) + " turn";

  players[activePlayer].playerEl.style.background =
    "linear-gradient(135deg, #6e8efb, #a777e3)";

  rollDice(players[activePlayer]);
}

function startGame() {
  let playerContanerEl = document.querySelector("#playerContaner");
  playerContanerEl.innerHTML = "";
  playerContanerEl.style.fontSize = "mediumk";
  players = [];
  activePlayer = 0;

  numOfPlayers = document.querySelector("#playerCount").value;
  for (i = 0; i < numOfPlayers; i++) {
    let playerN = new Player();
    playerN.playerEl = document.createElement("div");
    playerN.playerEl.style.minWidth = "15em";
    playerN.playerEl.style.background =
      "linear-gradient(135deg, #ff416c, #ff4b2b)";
    playerN.playerEl.style.borderRadius = "1em";
    playerContanerEl.appendChild(playerN.playerEl);

    players.push(playerN);

    let playerWidth = 90 / numOfPlayers;
    playerN.playerEl.style.width = playerWidth + "%";

    createPlayer(playerN);
  }
  players[activePlayer].playerEl.style.background =
    "linear-gradient(135deg, #6e8efb, #a777e3)";

  let newGameEl = document.createElement("button");
  newGameEl.id = "newGame";
  newGameEl.innerText = "Start new game";
  document.querySelector("footer").appendChild(newGameEl);
  resetButton = document.querySelector("#newGame");
  resetButton.addEventListener("click", satartNewGame);

  cubeEl = document.createElement("div");
  cubeEl.id = "cube";
  document.querySelector("footer").appendChild(cubeEl);

  document.querySelector("#gameStart").innerHTML = "";
  reset();
}

function createPlayer(player) {
  let playerNumberEl = document.createElement("div");
  playerNumberEl.innerText = "Player " + (players.indexOf(player) + 1);
  player.playerEl.appendChild(playerNumberEl);
  playerNumberEl.style.display = "flex";
  playerNumberEl.style.justifyContent = "center";

  let cardsEl = document.createElement("div");
  cardsEl.classList.add("cards");
  player.playerEl.appendChild(cardsEl);
}
