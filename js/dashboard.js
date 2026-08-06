/*=========================================
SH MAINTENANCE STORE
Dashboard JavaScript
=========================================*/

// Demo Dashboard Data

const dashboard = {

totalItems:850,

stock:25000,

purchaseToday:20,

issueToday:15,

lowStock:12

};


// Dashboard Load

window.onload=function(){

console.log("Dashboard Loaded");

showWelcome();

showClock();

setInterval(showClock,1000);

};


// Welcome

function showWelcome(){

console.log("Welcome Admin");

}


// Digital Clock

function showClock(){

let now=new Date();

let time=now.toLocaleTimeString();

let date=now.toLocaleDateString();

document.title=
"Dashboard | "+time;

console.log(date,time);

}


// Logout

function logout(){

if(confirm("Do you want to Logout?")){

window.location="index.html";

}

}


// Search Item

function searchItem(){

let keyword=
prompt("Enter Item Name");

if(keyword){

alert("Searching : "+keyword);

}

}


// Refresh Dashboard

function refreshDashboard(){

location.reload();

}
