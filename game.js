const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image(); 
ground.src = "mape-2.png"; 

const food = new Image(); 
food.src = "point.png"; 

const person = new Image();
person.src = "person.png"

const steps = new Image();
steps.src = "steps.png"


let box = 35;

let score = 0;
 

let food_1 = {
	x: Math.floor( (Math.random () * 16 + 2) ) * box,
	y: Math.floor( (Math.random () * 16 + 3) ) * box,
};


let snake = [];
snake[0] = {
	x: 9 * box,
	y: 9* box,
}

document.addEventListener("keydown", direction);

let dir;


function direction(event){
	if (event.keyCode == 37 && dir != "right")
		dir = "left";
	else if (event.keyCode == 38 && dir != "down" )
		dir = "up";
	else if (event.keyCode == 39 && dir != "left")
		dir = "right";
	else if (event.keyCode == 40 && dir != "up")
		dir = "down";
}

function eatTail (head, arr) {
	for (let i = 0 ; i < arr.length; i++){
		if (head.x == arr[i].x && head.y == arr[i].y)
			clearInterval(game);


	}
}





 function drawGame (){
 	ctx.drawImage(ground, 0 , 0);

 	ctx.drawImage(food, food_1.x, food_1.y);

 	


 	for (let i = 0; i < snake.length; i++){
 		
 		if (i == 0){
 			p= ctx.drawImage(person, snake [i].x, snake [i].y) ;
 		}
 		else{
 			ctx.drawImage(steps, snake [i].x, snake [i].y)
 		}


 	}

 	ctx.fillStyle = "black";
 	ctx.font = "50px Arial";
 	ctx.fillText(score, box * 2.5, box * 3 );

 	let snakeX = snake[0].x;
 	let snakeY = snake[0].y;


 	if(snakeX == food_1.x && snakeY == food_1.y){
 		score ++;
 		food_1 = {
			x: Math.floor( (Math.random () * 16 + 2) ) * box,
			y: Math.floor( (Math.random () * 16 + 2) ) * box,
		};
 	} else {
 		snake.pop();
 	}

 	if (snakeX < 2 * box  || snakeX > box * 17 || snakeY < 2 * box || snakeY > box * 17) 
 		clearInterval(game);



 	

 	if(dir == "left") snakeX -= box;
 	if(dir == "right") snakeX += box;
 	if(dir == "up") snakeY -= box;
 	if(dir == "down") snakeY += box;

 	let newHead = {
 		x: snakeX,
 		y: snakeY
 	};

 	eatTail(newHead, snake);
 	snake.unshift(newHead);

 }

let game = setInterval (drawGame, 100);




