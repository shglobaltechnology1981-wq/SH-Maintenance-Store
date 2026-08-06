//=====================================
// SH STORE MAINTENANCE DASHBOARD
// dashboard.js
//=====================================


// PAGE LOAD
window.onload = function(){

    showDate();

    showClock();

    setInterval(showClock,1000);

    loadDashboard();

    loadChart();

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



// TOTAL ITEMS

let totalItems = stockItems.length;



// TOTAL STOCK

let totalStock = 0;


stockItems.forEach(item=>{

    totalStock += Number(item.stock || 0);

});




// TOTAL PURCHASE

let totalPurchase = 0;


purchaseList.forEach(item=>{

    totalPurchase += Number(item.qty || 0);

});




// TOTAL ISSUE

let totalIssue = 0;


issueList.forEach(item=>{

    totalIssue += Number(item.qty || 0);

});





// DISPLAY DATA


if(document.getElementById("totalItems")){

document.getElementById("totalItems").innerHTML =
totalItems;

}



if(document.getElementById("totalStock")){

document.getElementById("totalStock").innerHTML =
totalStock;

}



if(document.getElementById("totalPurchase")){

document.getElementById("totalPurchase").innerHTML =
totalPurchase;

}



if(document.getElementById("totalIssue")){

document.getElementById("totalIssue").innerHTML =
totalIssue;

}



}



//=====================================
// STOCK MOVEMENT CHART
//=====================================


function loadChart(){


let purchaseList =
JSON.parse(localStorage.getItem("purchaseList")) || [];


let issueList =
JSON.parse(localStorage.getItem("issueList")) || [];



let purchaseQty = 0;

purchaseList.forEach(item=>{

purchaseQty += Number(item.qty || 0);

});



let issueQty = 0;

issueList.forEach(item=>{

issueQty += Number(item.qty || 0);

});



let chartArea =
document.getElementById("stockChart");



if(!chartArea) return;



new Chart(chartArea,{

type:"bar",


data:{


labels:[

"Purchase",

"Issue"

],



datasets:[{

label:"Stock Movement",

data:[

purchaseQty,

issueQty

]


}]


},



options:{


responsive:true,


plugins:{


legend:{


display:true


}


}



}


});



}




//=====================================
// DATE
//=====================================


function showDate(){


let today = new Date();



if(document.getElementById("todayDate")){


document.getElementById("todayDate").innerHTML =
today.toLocaleDateString();

}


}





//=====================================
// CLOCK
//=====================================


function showClock(){


let now = new Date();



if(document.getElementById("clock")){


document.getElementById("clock").innerHTML =
now.toLocaleTimeString();

}


}





//=====================================
// SEARCH
//=====================================


function searchItem(){


let item = prompt("Enter Item Name");


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
