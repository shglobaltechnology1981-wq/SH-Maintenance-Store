/*==================================================
SH Maintenance Store
Authentication
auth.js
==================================================*/


//==============================
// CHECK LOGIN
//==============================

(function () {

    const loginUser =
    localStorage.getItem("loginUser");


    if (!loginUser) {

        window.location.href = "index.html";

    }


})();




//==============================
// GET LOGIN USER
//==============================

function getLoginUser(){


    let user =

    JSON.parse(
    localStorage.getItem("loginUser")
    ) || null;



    if(user){

        return user.name;

    }


    return "";


}





//==============================
// SHOW USER NAME
//==============================

window.addEventListener("DOMContentLoaded", function(){


    const userBox =
    document.getElementById("loginUser");



    if(userBox){


        userBox.innerHTML =
        getLoginUser();


    }


});






//==============================
// LOGOUT
//==============================

function logout(){


    let ok =
    confirm("Do you want to Logout?");



    if(!ok){

        return;

    }



    localStorage.removeItem("loginUser");



    window.location.href =
    "index.html";


}
