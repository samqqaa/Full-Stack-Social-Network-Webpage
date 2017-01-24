window.onload = function() {

			var clickmebtn = document.getElementById("clickmebtn")
			var width = window.innerWidth
			var height = window.innerHeight
			var wincard = document.getElementById("wincard")
			var flag = true
			var key = false
			var body = document.getElementById("body")

			clickmebtn.onmouseover = function move() {
				if (!key){
					clickmebtn.style.left =Math.floor(Math.random()*(width-105)) + 'px';
					clickmebtn.style.top = Math.floor(Math.random()*(height-55) )+ "px";
				}

			body.onkeydown=function(event){
				if (event.shiftKey){
					key = true
				}
			}
			body.onkeyup=function(event){
				if (flag){				
					key = false
				}
			}
				
			clickmebtn.onclick = function (){
				if (flag){
					key = true
					clickmebtn.value = "Play again!"
					wincard.style.visibility="visible"
					flag = false
				}else{
					clickmebtn.value = "Click me!"
					wincard.style.visibility="hidden"
					flag = true
					key = false
					move()
				}
			}
		}
		}