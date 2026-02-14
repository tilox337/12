let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let cubeEl = document.querySelector("#cube");
let resetButton = document.querySelector("#reset");
let cubeButton1 = document.querySelector("#cubeButton1");
let cubeButton2 = document.querySelector("#cubeButton2");

renderCards();
rollDice();
cubeButton1.addEventListener("click", deleteTwoCards);
cubeButton2.addEventListener("click", deleteOneCard);
resetButton.addEventListener("click", reset);

function renderCards() {
  let cardsEl = document.querySelector("#cards");
  cardsEl.innerHTML = "";
  rollDice();
  for (let i = 0; i < 12; i++) {
    let div = document.createElement("div");
    div.innerText = i + 1;
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.width = "2em";
    div.style.height = "3em";
    div.style.color = "black";
    if (cards.includes(i + 1)) {
      div.style.backgroundColor = "green";
    } else {
      div.style.backgroundColor = "grey";
    }
    cardsEl.appendChild(div);
  }
}
function rollDice() {
  cube1 = Math.floor(Math.random() * 6) + 1;
  cube2 = Math.floor(Math.random() * 6) + 1;
  cubeButton1.innerText = cube1 + ", " + cube2;
  cubeButton2.innerText = cube1 + cube2;
}
function deleteOneCard() {
  index = cards.indexOf(cube1 + cube2);
  cards.splice(index, 1);
  console.log(cards);
  renderCards();
}
function deleteTwoCards() {
  let index = cards.indexOf(cube1);
  cards.splice(index, 1);
  index = cards.indexOf(cube2);
  cards.splice(index, 1);
  console.log(cards);
  renderCards();
}
function reset() {
  cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  renderCards;
}
