/*==================================================
SH Maintenance Store
ADMIN REQUISITION MANAGEMENT
admin-requisition.js
==================================================*/


let requisitionList =
JSON.parse(localStorage.getItem("requisitionList")) || [];



//==============================
// PAGE LOAD
//==============================

window.onload=function(){

    loadAdminRequisition();

};




//==============================
// LOAD ALL REQUISITION
//==============================

function loadAdminRequisition(){


let table =

document.getElementById("adminReqTable");


table.innerHTML="";



requisitionList.forEach((item,index)=>{



table.innerHTML += `


<tr>


<td>

${item.reqNo}

</td>



<td>

${item.userName}

</td>



<td>

${item.department}

</td>



<td>

${item.itemName}

</td>



<td>

${item.qty}

</td>



<td>

${item.date}

</td>



<td>

${item.status}

</td>



<td>



<button

onclick="approveReq(${index})"

class="btn btn-success">

Approve

</button>




<button

onclick="rejectReq(${index})"

class="btn btn-danger">

Reject

</button>



</td>


</tr>


`;



});


}




//==============================
// APPROVE REQUEST & ISSUE STOCK
//==============================

function approveReq(index){


let req = requisitionList[index];


// Load Stock

let stockItems =

JSON.parse(localStorage.getItem("stockItems")) || [];


// Load Issue

let issueList =

JSON.parse(localStorage.getItem("issueList")) || [];



// Find Item

let product = stockItems.find(item =>

item.name === req.itemName

);



if(!product){


alert("Item Not Found In Stock");

return;


}



// Check Stock

if(Number(product.stock) < Number(req.qty)){


alert("Insufficient Stock");

return;


}



//==============================
// STOCK MINUS
//==============================

product.stock =

Number(product.stock) - Number(req.qty);




//==============================
// CREATE ISSUE
//==============================

let issue = {


issueNo:

"ISS-" + Date.now(),


code:

product.code,


name:

product.name,


qty:

Number(req.qty),


issueTo:

req.userName,


department:

req.department,


date:

new Date().toLocaleDateString(),


requisitionNo:

req.reqNo


};



// Save Issue

issueList.push(issue);


localStorage.setItem(

"issueList",

JSON.stringify(issueList)

);



// Save Stock

localStorage.setItem(

"stockItems",

JSON.stringify(stockItems)

);




//==============================
// UPDATE REQUISITION STATUS
//==============================

requisitionList[index].status="Issued";


localStorage.setItem(

"requisitionList",

JSON.stringify(requisitionList)

);



alert("Requisition Issued Successfully");



loadAdminRequisition();


}




//==============================
// REJECT REQUEST
//==============================

function rejectReq(index){



requisitionList[index].status="Rejected";



localStorage.setItem(

"requisitionList",

JSON.stringify(requisitionList)

);



alert("Requisition Rejected");



loadAdminRequisition();


}
