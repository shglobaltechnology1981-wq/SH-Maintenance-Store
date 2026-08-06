/*==================================================
SH Maintenance Store
Authentication
auth.js
==================================================*/

//==============================
// CHECK LOGIN
//==============================

(function () {

    const loginUser = localStorage.getItem("loginUser");

    if (!loginUser) {

        window.location.href = "index.html";

    }

})();



//==============================
// GET LOGIN USER
//==============================

function getLoginUser(){

    return localStorage.getItem("loginUser") || "";

}



//==============================
// SHOW USER NAME
//==============================

window.addEventListener("DOMContentLoaded", function(){

    const user = document.getElementById("loginUser");

    if(user){

        user.innerHTML = getLoginUser();

    }

});



//==============================
// LOGOUT
//==============================

function logout(){

    let ok = confirm("Do you want to Logout?");

    if(!ok){

        return;

    }

    localStorage.removeItem("loginUser");

    window.location.href = "index.html";

}
