
window.onload = function() {
		var LOGIN = "Login"
		var LOGOUT = "LogOut"
		var username = document.getElementById("username")
		var loginBtn = document.getElementById("login")
		var hiddenfield = document.getElementById("hiddenfield")
		var postbtn = document.getElementById("post")
		var hiddentext = document.getElementById("hiddentext")
		//five images
		var image1 = document.getElementById("image1")
		var image2 = document.getElementById("image2")
		var image3 = document.getElementById("image3")
		var image4 = document.getElementById("image4")
		var image5 = document.getElementById("image5")
		//different speed count
		var count1 = 0
		var count2 = 0
		var count3 = 0
		var count4 = 0
		var count5 = 0
		//different random speed
		var speed1 = 1 + Math.floor(Math.random()*5)
		var speed2 = 1 + Math.floor(Math.random()*5)
		var speed3 = 1 + Math.floor(Math.random()*5)
		var speed4 = 1 + Math.floor(Math.random()*5)
		var speed5 = 1 + Math.floor(Math.random()*5)	
		//if image is changing	
		var flag1 = true
		var flag2 = true
		var flag3 = true
		var flag4 = true
		var flag5 = true
		//image list
		var imagelist = ["images/image1.jpeg","images/image2.jpeg","images/image3.jpeg","images/image4.jpeg",
		"images/image5.jpeg","images/image6.jpeg","images/image7.jpeg","images/image8.jpeg","images/image9.jpeg"
		,"images/image10.jpeg","images/image11.jpeg","images/image12.jpeg"]
		// five buttons
		var btn1 = document.getElementById("btn1")
		var btn2 = document.getElementById("btn2")
		var btn3 = document.getElementById("btn3")
		var btn4 = document.getElementById("btn4")
		var btn5 = document.getElementById("btn5")
		var profilebtn = document.getElementById("profilebtn")
		//keep changing images
		setInterval(changeimage,1000)
		//to profile page
		profilebtn.onclick = function(){
			window.location.href="profile.html"
		}
		//button stop and start
		btn1.onclick = function(){
			if(flag1){
				btn1.value="Start"
				flag1 = false
			}
			else{
				flag1 = true
				btn1.value ="Stop" 
			 	speed1 = 1 + Math.floor(Math.random()*5)
				//changespeed
			}

		}
		//button stop and start
		btn2.onclick = function(){
			if(flag2){
				btn2.value="Start"
				flag2 = false
			}
			else{
				flag2 = true
				btn2.value ="Stop" 
			 	speed2 = 1 + Math.floor(Math.random()*5)
				//changespeed
			}
		}
		//button stop and start
		btn3.onclick = function(){
			if(flag3){
				btn3.value="Start"
				flag3 = false
			}
			else{
				flag3 = true
				btn3.value ="Stop" 
			 	speed3 = 1 + Math.floor(Math.random()*5)
				//changespeed
			}

		}
		//button stop and start
		btn4.onclick = function(){
			if(flag4){
				btn4.value="Start"
				flag4 = false
			}
			else{
				flag4 = true
				btn4.value ="Stop" 
			 	speed4 = 1 + Math.floor(Math.random()*5)
				//changespeed
			}

		}
		//button stop and start
		btn5.onclick = function(){
			if(flag5){
				btn5.value="Start"
				flag5 = false
			}
			else{
				flag5 = true
				btn5.value ="Stop" 
			 	speed5 = 1 + Math.floor(Math.random()*5)
				//changespeed
			}
		}
		//different image changing speed speed 		
		function changeimage(){
			if(flag1){
				image1.src = imagelist[Math.floor(count1)%3]
			}
			if(flag2){
				image2.src = imagelist[3+Math.floor(count2)%2]
			}
			if(flag3){
				image3.src = imagelist[5+Math.floor(count3)%2]
			}			
			if(flag4){
				image4.src = imagelist[7+Math.floor(count4)%3]
			}			
			if(flag5){
				image5.src = imagelist[10+Math.floor(count5)%2]
			}
			count1 += 1/speed1
			count2 += 1/speed2
			count3 += 1/speed3
			count4 += 1/speed4
			count5 += 1/speed5


		}
}