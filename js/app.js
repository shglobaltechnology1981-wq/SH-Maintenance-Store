/*==================================================
SH Maintenance Store
Login System
app.js
==================================================*/

//==============================
// LOGIN
//==============================

function login(){

    let username = document.getElementById("username").value.trim();

    let password = document.getElementById("password").value.trim();

    let msg = document.getElementById("msg");

    if(username === "" || password === ""){

        msg.innerHTML = "Please enter Username and Password";
        msg.style.color = "red";
        return;

    }

    // Default Login

    if(username === "admin" && password === "1234"){

        localStorage.setItem("loginUser", username);

        window.location.href = "dashboard.html";

    }

    else{

        msg.innerHTML = "Invalid Username or Password";
        msg.style.color = "red";

    }

}



//==============================
// ENTER KEY LOGIN
//==============================

document.addEventListener("DOMContentLoaded", function(){

    let password = document.getElementById("password");

    if(password){

        password.addEventListener("keypress", function(e){

            if(e.key === "Enter"){

                login();

            }

        });

    }

});



//==============================
// AUTO REDIRECT
//==============================

if(localStorage.getItem("loginUser")){

    if(window.location.pathname.includes("index.html") ||
       window.location.pathname.endsWith("/")){

        window.location.href = "dashboard.html";

    }

}
