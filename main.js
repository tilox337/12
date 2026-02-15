class player {
  constructor() {
    this.cards;
    this.playerEl;
  }
}

let player1 = new player();
player1.playerEl = document.querySelector("#firstPlayer");
let player2 = new player();
player2.playerEl = document.querySelector("#secondPlayer");
let players = [player1, player2];

let activePlayer = 0;
let cube1;
let cube2;

let rerolButton;
let resetButton = document.querySelector("#newGame");
let cubeButton1;
let cubeButton2;
let cubeEl = document.querySelector("#cube");

reset();
resetButton.addEventListener("click", () => reset(players[0]));

function renderCards(player) {
  let cardsEl = player.playerEl.querySelector(".cards");
  cardsEl.innerHTML = "";
  for (let i = 0; i < 12; i++) {
    let div = document.createElement("div");
    div.innerText = i + 1;
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.width = "2em";
    div.style.height = "3em";
    div.style.color = "black";
    div.style.borderRadius = "0.25em";
    if (player.cards.includes(i + 1)) {
      div.style.backgroundColor = "bisque";
    } else {
      div.style.backgroundColor = "rgb(232, 255, 168)";
    }
    cardsEl.appendChild(div);
  }
  checkWin(player);
}

function rollDice() {
  cubeButton1.disabled = false;
  cubeButton2.disabled = false;
  cube1 = Math.floor(Math.random() * 6) + 1;
  cube2 = Math.floor(Math.random() * 6) + 1;

  cubeButton1.innerText = cube1 + ", " + cube2;
  cubeButton2.innerText = cube1 + cube2;

  if (
    !players[activePlayer].cards.includes(cube1) ||
    !players[activePlayer].cards.includes(cube2) ||
    cube1 === cube2
  ) {
    cubeButton1.disabled = true;
  }
  if (!players[activePlayer].cards.includes(cube1 + cube2)) {
    cubeButton2.disabled = true;
  }
}

function reset() {
  activePlayer = 0;
  document.querySelector("#turn").innerHTML =
    "Player " + (activePlayer + 1) + " turn";
  for (let player of players) {
    player.cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    renderCards(player);
  }

  cubeEl.innerHTML = "";
  cubeEl.style.fontSize = "14px";

  cubeButton1 = document.createElement("button");
  cubeEl.appendChild(cubeButton1);
  cubeButton2 = document.createElement("button");
  cubeEl.appendChild(cubeButton2);
  rerolButton = document.createElement("button");
  cubeEl.appendChild(rerolButton);
  rerolButton.innerText = "Skip";

  cubeButton1.addEventListener("click", () => deleteTwoCards());
  cubeButton2.addEventListener("click", () => deleteOneCard());
  rerolButton.addEventListener("click", () => switchPlayer());

  rollDice();
}

function checkWin(player) {
  if (player.cards.length === 0) {
    cubeEl.style.fontSize = "56px";
    cubeEl.innerHTML = "Player " + (activePlayer + 1) + " win!";
    document.querySelector("#turn").innerHTML = "";
  }
}

function deleteOneCard() {
  let player = players[activePlayer];
  let index = player.cards.indexOf(cube1 + cube2);
  player.cards.splice(index, 1);
  console.log(player.cards);

  renderCards(player);
  switchPlayer();
}

function deleteTwoCards() {
  let player = players[activePlayer];
  let index = player.cards.indexOf(cube1);
  player.cards.splice(index, 1);
  index = player.cards.indexOf(cube2);
  player.cards.splice(index, 1);
  console.log(
    "Cards of player:" + (players.indexOf(player) + 1) + ":" + player.cards,
  );

  renderCards(player);
  switchPlayer();
}

function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector("#turn").innerHTML =
    "Player " + (activePlayer + 1) + " turn";
  rollDice();
}
