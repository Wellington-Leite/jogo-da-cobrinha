let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

let direction = "right";

function criarBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "black";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

document.addEventListener("keydown", update);

function update(event) {
  // 37 para a direita, 38 para baixo, 39 para esquerda, 40 para cima
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
}

function inicarJogo() {
  // Mantendo a cobrinha dentro do canvas
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

  criarBG();
  criarCobrinha();

  //Setando a posicão da cobrinha
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //Criando as coordenadas
  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  snake.pop(); //Retirando o Ultimo elemento

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  //Acrescentando um elemento a frente
  snake.unshift(newHead);
}

let jogo = setInterval(inicarJogo, 500);
