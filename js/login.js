//=====================================
// SH Maintenance Store Login
//=====================================


function login(){


let user =
document.getElementById("username").value;


let pass =
document.getElementById("password").value;



if(user==="admin" && pass==="1234"){


localStorage.setItem(
"login",
"true"
);


window.location="dashboard.html";


}

else{


document.getElementById("msg").innerHTML=
"Wrong Username or Password";


}


}
