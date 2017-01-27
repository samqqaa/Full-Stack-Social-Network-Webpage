'use strict'

var buildinglist = []
var cx = 0
var sx = 30

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 
	var sy = canvas.height/5
	var windowColors = [ 'yellow', 'black'] 
	var cy = canvas.height/2 - 30

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2

		c.fillStyle= blgColors[ Math.floor(Math.random()*blgColors.length)]

		buildinglist.push({x:x0, y:floor - blgHeight, x1:blgWidth, y1:blgHeight, color :c.fillStyle})
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
		c.fillStyle="yellow"
		for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				c.fillStyle= windowColors[ Math.floor(Math.random()*windowColors.length)]
				c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
			}
		}

	}

//clean car
	c.fillStyle= "white"
	c.fillRect(cx-20, cy,50,30)
//clean sun
	c.beginPath();
	c.arc(sx-2, sy+1, 32, 0, 2 * Math.PI);
	c.fillStyle="white"
	c.fill()		
//print sun
	c.beginPath();
	c.arc(sx, sy, 30, 0, 2 * Math.PI);
	c.stroke();
	c.fillStyle= "red"
	
	c.fill()
//move sun
	sx += 2
	if (sx-30 >= canvas.width){
		sx = 0
	}
//print building and blink
	var index = 0
	for (index = 0; index < buildinglist.length; ++index) {

		var bx0 = buildinglist[index].x
		var by0 = buildinglist[index].y
		var bx1 = buildinglist[index].x1
		var by1 = buildinglist[index].y1
		c.fillStyle= buildinglist[index].color
		c.fillRect(bx0, by0, bx1, by1)
		for (var y = floor - floorSpacing; y > floor - by1; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < bx1 - windowWidth; x += windowSpacing + windowWidth) {
				c.fillStyle= windowColors[ Math.floor(Math.random()*windowColors.length)]
				c.fillRect(bx0+x, y - windowHeight, windowWidth, windowHeight)

			}
		}
	}

// print car and move car

	c.fillStyle= "purple"
	c.fillRect(cx, cy,50,30)
	cx += 20
	if (cx-30 >= canvas.width){
		cx = 0
	}	

	return {
		build: build,
	}

}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
	setInterval(function (){createApp(document.querySelector("canvas"))}, 100);
	window.onclick = function(e){
		var x = e.clientX
		var y = e.clientY
		var index = 0
		for (var index = 0; index < buildinglist.length; ++index) {

		var bx0 = buildinglist[index].x
		var by0 = buildinglist[index].y
		var bx1 = buildinglist[index].x1
		var by1 = buildinglist[index].y1
		console.log(x,y)
			if (bx0<=x && x<=bx0+bx1 && by0+by1>=y && by0<=y){
				buildinglist[index].y1 += 5
				buildinglist[index].y -= 5
				console.log(bx0,by0,bx1,by1)

			}
		}
	}
}

