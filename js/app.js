/*==================================================
SH STORE
Login System
app.js
==================================================*/


function login(){


let user =
document.getElementById("username").value.trim();



let pass =
document.getElementById("password").value.trim();





if(user==="admin" && pass==="1234"){



localStorage.setItem(
"loginUser",
"admin"
);



window.location="dashboard.html";



}

else{


document.getElementById("msg").innerHTML =
"Invalid Username or Password";


}



}
