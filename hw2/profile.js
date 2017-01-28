window.onload = function(){

         
        
    var submitbtn = document.getElementById("submitbtn")
    var retbtn = document.getElementById("retbtn")
    retbtn.onclick = retfun;
    submitbtn.onclick = validation
         
    function retfun(){
        window.location.href="main.html";
    }
    function cleanhint(){
        document.getElementById("zipcodehint").innerHTML = ""   
        document.getElementById("passwordhint").innerHTML = ""   
        document.getElementById("idhint").innerHTML = ""   
        document.getElementById("emailhint").innerHTML = ""   
        document.getElementById("numberhint").innerHTML = ""        
    }
    function validation(){
        console.log(11)
        //new input
        var displayName = document.getElementById("displayname").value
        var pswd = document.getElementById("pass").value
        var cpswd = document.getElementById("passc").value
        var emailAddress = document.getElementById("emailaddress").value
        var zipcode = document.getElementById("zipcode").value
        var phonenumber = document.getElementById("phoneNumber").value
        //old value
        var oldName = document.getElementById("oldName").innerHTML
        var oldNumber = document.getElementById("oldNumber").innerHTML
        var oldPassword = document.getElementById("oldPassword").innerHTML
        var oldAddress = document.getElementById("oldAddress").innerHTML
        var oldZipcode = document.getElementById("oldZipcode").innerHTML   

        var phoneno = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //validate first
        if(pswd !== cpswd | pswd ==""){
            document.getElementById("passwordhint").innerHTML = "    Password not match"   
        }
        else if (displayName == ""){
            cleanhint()
            document.getElementById("idhint").innerHTML = "    Display name not correct"   
        }
        else if (emailAddress ==""| !re.test(emailAddress)){
            cleanhint()
            document.getElementById("emailhint").innerHTML = "    Email not correct"   
        }
        else if (phonenumber ==""|phonenumber.length!=12|!phoneno.test(phonenumber)){
            cleanhint()
            document.getElementById("numberhint").innerHTML = "    Phone number not correct"   
        }
        else if (zipcode.length != 5|isNaN(zipcode)){
            cleanhint()
            document.getElementById("zipcodehint").innerHTML = "    Zipcode not correct"   
        } 
        else{
            //change old value if pass validation
            cleanhint()
            //change name
            if (oldName!== displayName){
                document.getElementById("idhint").innerHTML = "    Display name changed from " + oldName 
                document.getElementById("oldName").innerHTML = displayName
                
            }
            //change password
            if (oldPassword!== pswd){
                document.getElementById("passwordhint").innerHTML = "    Password changed from " + oldPassword  
                document.getElementById("oldPassword").innerHTML = pswd
            }
            //change zipcode
            if (oldZipcode!== zipcode){
                document.getElementById("zipcodehint").innerHTML = "    Zipcode changed from " + oldZipcode   
                document.getElementById("oldZipcode").innerHTML = zipcode
                
            }
            //change email address
            if (oldAddress!== emailAddress){
                document.getElementById("emailhint").innerHTML = "    Email changed from " + oldAddress   
                document.getElementById("oldAddress").innerHTML = emailAddress
            } 
            //change phone number
            if (oldNumber!== phonenumber){
                document.getElementById("numberhint").innerHTML = "    Phone number changed from " + oldNumber 
                document.getElementById("oldNumber").innerHTML = phonenumber
            }       			
            document.getElementById("emailaddress").value = ""
            document.getElementById("displayname").value = ""
            document.getElementById("pass").value =""
            document.getElementById("passc").value = ""
            document.getElementById("zipcode").value = ""

        
        }
    }
}