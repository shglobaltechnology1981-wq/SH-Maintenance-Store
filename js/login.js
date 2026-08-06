//=====================================
// SH Maintenance Store Login
//=====================================


function login(){


let user =
document.getElementById("username").value;


let pass =
document.getElementById("password").value;



//==============================
// ADMIN LOGIN
//==============================

if(user==="admin" && pass==="1234"){



let loginUser = {

    id:"ADMIN001",

    name:"Admin",

    department:"Management"

};



localStorage.setItem(

"loginUser",

JSON.stringify(loginUser)

);



localStorage.setItem(

"login",

"true"

);



window.location="dashboard.html";



}


//==============================
// EMPLOYEE LOGIN
//==============================

else if(user==="EMP001" && pass==="1234"){



let loginUser = {

    id:"EMP001",

    name:"Md. Samsul Haque",

    department:"Maintenance"

};



localStorage.setItem(

"loginUser",

JSON.stringify(loginUser)

);



localStorage.setItem(

"login",

"true"

);



window.location="dashboard.html";



}



else{


document.getElementById("msg").innerHTML =

"Wrong Username or Password";


}



}
