/*==================================================
SH STORE
Authentication System
auth.js
==================================================*/


let loginUser =
localStorage.getItem("loginUser");



if(!loginUser){

window.location="index.html";

}




function logout(){


if(confirm("Are you sure Logout?")){


localStorage.removeItem("loginUser");


window.location="index.html";


}


}
