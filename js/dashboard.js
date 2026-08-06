//=====================================
// SH Maintenance Store Dashboard
//=====================================

window.onload = function () {

showDate();

showClock();

setInterval(showClock,1000);

loadDashboard();

};


// Dashboard Data

function loadDashboard(){

document.getElementById("totalItems").innerHTML="850";

document.getElementById("totalStock").innerHTML="25000";

document.getElementById("purchaseToday").innerHTML="20";

document.getElementById("issueToday").innerHTML="15";

document.getElementById("lowStock").innerHTML="12";

document.getElementById("machineRunning").innerHTML="80";

}


// Date

function showDate(){

let today=new Date();

document.getElementById("todayDate").innerHTML=

today.toLocaleDateString();

}


// Clock

function showClock(){

let now=new Date();

document.getElementById("clock").innerHTML=

now.toLocaleTimeString();

}


// Search

function searchItem(){

let item=prompt("Enter Item Name");

if(item){

alert("Searching : "+item);

}

}


// Refresh

function refreshDashboard(){

location.reload();

}


// Logout

function logout(){

if(confirm("Logout?")){

window.location="index.html";

}

}


// Low Stock Alert

if(Number(document.getElementById("lowStock")?.innerHTML)>10){

console.log("Low Stock Available");

}
