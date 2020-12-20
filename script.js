let canvas = document.getElementById("snake");
let divPlacar = document.getElementById("placar");
let divRecorde = document.getElementById("recorde");
let context = canvas.getContext("2d");
let recorde = 1;
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

let direction = "right";
//Comida aleatoria
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

function criarBG() {
  context.fillStyle = "white";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "lime";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

//Criando a comida da cobrinha
function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
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

  //Verificando se a cobrinha esta se chocando com o corpo
  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      //parar a funçao jogo
      recorde = snake.length;
      clearInterval(jogo);
      alert("Game Over. :(");
      snake = [];
      snake[0] = {
        x: 8 * box,
        y: 8 * box,
      };

      jogo = setInterval(inicarJogo, 200);
    }
  }

  criarBG();
  criarCobrinha();
  drawFood();

  //Setando a posicão da cobrinha
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //Criando as coordenadas
  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop(); //Retirando o Ultimo elemento
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  //Acrescentando um elemento a frente
  snake.unshift(newHead);
  divPlacar.innerHTML = `<h2>${snake.length}</h2>`;
  divRecorde.innerHTML = `<h2>${recorde}</h2>`;
}

let jogo = setInterval(inicarJogo, 200);
