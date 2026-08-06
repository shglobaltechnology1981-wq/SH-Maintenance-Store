/*==================================================
SH STORE
Report Management
report.js
==================================================*/


let stockItems =
JSON.parse(localStorage.getItem("stockItems")) || [];


let purchaseList =
JSON.parse(localStorage.getItem("purchaseList")) || [];


let issueList =
JSON.parse(localStorage.getItem("issueList")) || [];




//==============================
// PAGE LOAD
//==============================

window.onload=function(){

loadReport();

};





//==============================
// LOAD ALL REPORT
//==============================

function loadReport(){



loadSummary();


loadStockReport();


loadPurchaseReport();


loadIssueReport();



}







//==============================
// SUMMARY
//==============================


function loadSummary(){



let totalStock=0;


stockItems.forEach(item=>{


totalStock += Number(item.stock || 0);


});





let totalPurchase=0;


purchaseList.forEach(item=>{


totalPurchase += Number(item.qty || 0);


});





let totalIssue=0;


issueList.forEach(item=>{


totalIssue += Number(item.qty || 0);


});






if(document.getElementById("rItems")){


document.getElementById("rItems").innerHTML =
stockItems.length;


}



if(document.getElementById("rStock")){


document.getElementById("rStock").innerHTML =
totalStock;


}



if(document.getElementById("rPurchase")){


document.getElementById("rPurchase").innerHTML =
totalPurchase;


}



if(document.getElementById("rIssue")){


document.getElementById("rIssue").innerHTML =
totalIssue;


}




}







//==============================
// STOCK REPORT
//==============================


function loadStockReport(){



let table =
document.getElementById("stockReport");



if(!table) return;



table.innerHTML="";



stockItems.forEach(item=>{



table.innerHTML +=`


<tr>

<td>${item.code}</td>

<td>${item.name}</td>

<td>${item.category}</td>

<td>${item.stock}</td>

<td>${item.unit}</td>


</tr>


`;



});


}







//==============================
// PURCHASE REPORT
//==============================


function loadPurchaseReport(){



let table =
document.getElementById("purchaseReport");



if(!table) return;



table.innerHTML="";



purchaseList.forEach(item=>{



table.innerHTML +=`


<tr>

<td>${item.code}</td>

<td>${item.name}</td>

<td>${item.qty}</td>

<td>${item.date}</td>


</tr>


`;



});



}







//==============================
// ISSUE REPORT
//==============================


function loadIssueReport(){



let table =
document.getElementById("issueReport");



if(!table) return;



table.innerHTML="";



issueList.forEach(item=>{



table.innerHTML +=`


<tr>


<td>${item.code}</td>


<td>${item.name}</td>


<td>${item.qty}</td>


<td>${item.issueTo}</td>


<td>${item.date}</td>



</tr>


`;



});



}
