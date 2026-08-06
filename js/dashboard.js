//=====================================
// SH Maintenance Store Dashboard
// dashboard.js
//=====================================


window.onload = function(){

showDate();

showClock();

setInterval(showClock,1000);

loadDashboard();

};


//=====================================
// LOAD DASHBOARD DATA
//=====================================

function loadDashboard(){


let stockItems =
JSON.parse(localStorage.getItem("stockItems")) || [];


let purchaseList =
JSON.parse(localStorage.getItem("purchaseList")) || [];


let issueList =
JSON.parse(localStorage.getItem("issueList")) || [];



// Total Items

let totalItems = stockItems.length;


// Total Stock

let totalStock = 0;

let lowStock = 0;


stockItems.forEach(item=>{


totalStock += Number(item.stock);



if(item.stock <= 10){

lowStock++;

}


});



// Purchase

let totalPurchase = 0;


purchaseList.forEach(item=>{

totalPurchase += Number(item.qty);

});



// Issue

let totalIssue = 0;


issueList.forEach(item=>{

totalIssue += Number(item.qty);

});





// Display


if(document.getElementById("totalItems"))

document.getElementById("totalItems").innerHTML=
totalItems;



if(document.getElementById("totalStock"))

document.getElementById("totalStock").innerHTML=
totalStock;



if(document.getElementById("purchaseToday"))

document.getElementById("purchaseToday").innerHTML=
totalPurchase;



if(document.getElementById("issueToday"))

document.getElementById("issueToday").innerHTML=
totalIssue;



if(document.getElementById("lowStock"))

document.getElementById("lowStock").innerHTML=
lowStock;


}



//=====================================
// DATE
//=====================================

function showDate(){

let today=new Date();

if(document.getElementById("todayDate"))

document.getElementById("todayDate").innerHTML =
today.toLocaleDateString();

}



//=====================================
// CLOCK
//=====================================

function showClock(){

let now=new Date();


if(document.getElementById("clock"))

document.getElementById("clock").innerHTML =
now.toLocaleTimeString();

}



//=====================================
// SEARCH
//=====================================

function searchItem(){

let item=prompt("Enter Item Name");


if(item){

alert("Searching : "+item);

}

}



//=====================================
// REFRESH
//=====================================

function refreshDashboard(){

location.reload();

}



//=====================================
// LOGOUT
//=====================================

function logout(){

if(confirm("Logout?")){

window.location="index.html";

}

}
