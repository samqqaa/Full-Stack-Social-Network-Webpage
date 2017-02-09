'use strict'

var enemy = []
var myPlane = []
var enemyMissile = []
var myMissile = []
myPlane.push({x:400, y:460, x1:45, y1:20})
var myPlaneImage = new Image();
myPlaneImage.src = 'myPlane.png';
var enemyPlaneImage = new Image();
enemyPlaneImage.src = 'enemyPlane.png';
var explodeImage = new Image();
explodeImage.src = 'explode.png'
var jump = false
var dodge = 0
var distance = 0
var score = 0
var mouseX = 0
var mouseY = 0
var enemyBuildRate = 0.4
var enemyFireRate = 0.2
var createApp = function(canvas) { 
	var c = canvas.getContext("2d");
	// Create the ground
	var floor = canvas.height * 0.6 //480
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "white")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)
	//build a enemy
	var build = function() { 
		if (score > 20){
			enemyBuildRate = 0.9
		}
		var randNum =  Math.random()
		if (randNum < enemyBuildRate){
			var x0 = Math.random()*(canvas.width-35)
			var planeWidth = 35
			var planeHeight = 20
			enemy.push({x:x0, y:0, x1:planeWidth, y1:planeHeight})
		}
	}
	//Enemy fire missiles
	var enemyFire = function() { 
		if(score > 30){
			enemyFireRate = 0.75
		}
		for (var index = 0; index < enemy.length; ++index) {
			var randfloat = Math.random()
			if (randfloat < enemyFireRate){ //randomly fire missles 
				enemyMissile.push({x:enemy[index].x+17, y:enemy[index].y})
			}
		}
	}
	//My plane fires missiles
	var myFire = function() { 
		myMissile.push({x:myPlane[0].x+22, y:460})
	}
//Repaint function
	var refresh = function(){
		//clear canvas
		c.fillStyle = "white"
		c.fillRect(0, 0, canvas.width, canvas.height)
		c.fillStyle=grad
		c.fillRect(0, floor, canvas.width, canvas.height)

        //Enemy moving  
		for (var index = 0; index < enemy.length; ++index) {
			var enemyShift = Math.random()
			if (score >10){
				if (enemyShift<0.25){
					//Randomly shift right
					enemy[index].x =  enemy[index].x+7
					enemy[index].x =  enemy[index].x % canvas.width
				}
				else if (enemyShift > 0.75){
					//Randomly shift left
					enemy[index].x =  enemy[index].x-7
					if (enemy[index].x<0){
						enemy[index].x =  enemy[index].x + canvas.width
					}
				}
			}
			enemy[index].y =  enemy[index].y + 1
			var bx0 = enemy[index].x
			var by0 = enemy[index].y
			var bx1 = enemy[index].x1
			var by1 = enemy[index].y1
			if(by0 > 440){
				gameover()
			}
			c.fillStyle= enemy[index].color
			c.drawImage(enemyPlaneImage,bx0, by0, bx1, by1)
		}
	//Enemy missles move
		for (var index = 0; index < enemyMissile.length; ++index) {
			enemyMissile[index].y = enemyMissile[index].y + 20
			var bx0 = enemyMissile[index].x
			var by0 = enemyMissile[index].y
			c.fillStyle = "black"
			c.fillRect(bx0, by0, 2, 2)
		}
	// My missles move
		for (var index = 0; index < myMissile.length; ++index) {
			myMissile[index].y = myMissile[index].y - 20
			var bx0 = myMissile[index].x
			var by0 = myMissile[index].y
			c.fillStyle = "red"
			c.fillRect(bx0, by0, 2, 2)
		}
		//My missles hit  
		for (var index = 0; index < myMissile.length; ++index) {
			for (var enemyindex = 0; enemyindex < enemy.length; ++enemyindex){
				if (enemy[enemyindex].x  <=  myMissile[index].x && myMissile[index].x <=enemy[enemyindex].x+ enemy[enemyindex].x1 
				&& enemy[enemyindex].y <=  myMissile[index].y && myMissile[index].y <=enemy[enemyindex].y + enemy[enemyindex].y1){
					c.drawImage(explodeImage,enemy[enemyindex].x, enemy[enemyindex].y, 40, 30)					
					enemy.splice(enemyindex,1)
					myMissile.splice(index, 1)
					score += 1
					break 
				}
			}
		}
	//My airplane moves left
		if (mouseX-3 <myPlane[0].x){
			distance += 10
			myPlane[0].x = myPlane[0].x-10
			if (myPlane[0].x <0) {
				myPlane[0].x += canvas.width
			}
		}
		//Moveright
		else if (mouseX+3>myPlane[0].x+myPlane[0].y1){ 
			distance += 10
			myPlane[0].x = myPlane[0].x+10
			if (myPlane[0].x > canvas.width-20){
				myPlane[0].x=0
			}
		}	
		//Draw my airplane
		c.drawImage(myPlaneImage,myPlane[0].x, myPlane[0].y,myPlane[0].x1, myPlane[0].y1)

		//Enemy missles hit  
		for (var index = 0; index < enemyMissile.length; ++index) {
				if (myPlane[0].x  <=  enemyMissile[index].x && enemyMissile[index].x <=myPlane[0].x + 45 
				&& myPlane[0].y <=  enemyMissile[index].y && enemyMissile[index].y <=myPlane[0].y + 20 ){
					if(!jump){
						c.drawImage(explodeImage,myPlane[0].x, myPlane[0].y, 45, 30)					
						gameover()
						break
					}
					dodge += 1
				}			
		}
	}
	//Get mouse location
	body.onmousemove = function(e) {
		e = e || window.event
		mouseX = e.pageX
		mouseY = e.pageY
	}
	//Jump feature
	body.onkeydown=function(event){
		c.fillStyle= "white"
		c.fillRect(myPlane[0].x, myPlane[0].y, 45, 20)
		//Jump	
		if (event.keyCode == '32'){ 
			if(jump == false){
				jump = true
				for (var i = 0; i < 10; i++){
					if (i<5){
						setTimeout(function(){myPlane[0].x-=2,myPlane[0].x1+=i*2}, i*100)
					}
					else{
						setTimeout(function(){myPlane[0].x+=2,myPlane[0].x1-=i*2}, i*100)
					}
				}
				setTimeout(function(){jump=false}, 1000)
			}
		}	
	}
	c.drawImage(myPlaneImage,myPlane[0].x, myPlane[0].y,myPlane[0].x1, myPlane[0].y1)
	//Game over function
	var gameover = function(){
		var gameCard = document.getElementById('gameCard')
		var scoreCard = document.getElementById('scoreCard')
		var dodgeCard = document.getElementById('dodgeCard')
		var distanceCard = document.getElementById('distanceCard')
		clearInterval(autoenemyfire);
		clearInterval(automyfire);
		clearInterval(autobuild);
		clearInterval(autorefresh);
		var oldScore = parseInt(getCookie('score'), 10)
		//update cookies
		if (getCookie('dodge') =="" || parseInt(getCookie('dodge'), 10) <dodge  ){
						setCookie('dodge', String(dodge), 1)
		}
		if (getCookie('score') =="" || parseInt(getCookie('score'), 10) <score  ){
						setCookie('score', String(score), 1)
		}
		if (getCookie('distance') =="" || parseInt(getCookie('distance'), 10) <distance  ){
						setCookie('distance', String(distance), 1)
		}
		//Reveil game states
		gameCard.style.display = "block"
		dodgeCard.style.display = "block"
		scoreCard.style.display = "block"
		distanceCard.style.display = "block"
		scoreCard.innerHTML = 'Your Score: ' + String(score)
		dodgeCard.innerHTML = 'Dodged: ' + String(dodge)
		distanceCard.innerHTML = 'Distance: ' + String(distance)
	}	
	//Auto create enemy
	var autobuild = setInterval(function (){build()}, 1000);
	//Enemy auto fire
	var autoenemyfire = setInterval(function (){enemyFire()}, 1000);
	//My plane auto fire
	var automyfire = setInterval(function (){myFire()}, 300);
	//repaint
	var autorefresh = setInterval(function (){refresh()}, 100);
	return {}
}
//onload function
window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	var cookieCard = document.getElementById('cookieCard')
	var oldScore = getCookie('score')
	var oldDodge = getCookie('dodge')
	var oldDistance = getCookie('distance')
	cookieCard.innerHTML = 'Max Score: ' + oldScore + '<br>' + 'Max Dodge: ' + oldDodge +'<br>' +'Max Distance: ' + oldDistance
}
//Set cookie function
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//Get cookie function
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}