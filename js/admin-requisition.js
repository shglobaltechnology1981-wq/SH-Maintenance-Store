/*==================================================
SH Maintenance Store
requisition-admin.js
==================================================*/


window.onload = function(){

    loadRequisitions();

    loadSummary();

    showUser();

};



//==================================================
// LOAD REQUISITION
//==================================================

function loadRequisitions(){

let list =
JSON.parse(
localStorage.getItem("requisitionList")
) || [];


let table =
document.getElementById("requisitionTable");


if(!table) return;


table.innerHTML="";


list.forEach((req,index)=>{


let items =
req.items || [];


let itemName =
items.map(x=>x.name).join("<br>");


let qty =
items.map(x=>x.qty).join("<br>");



table.innerHTML += `

<tr>

<td>${index+1}</td>

<td>${req.reqNo || ""}</td>

<td>${req.userName || ""}</td>

<td>${req.department || ""}</td>

<td>${itemName}</td>

<td>${qty}</td>

<td>${req.date || ""}</td>


<td>

<span class="req-status ${req.status.toLowerCase()}">

${req.status}

</span>

</td>


<td>


<button class="action-btn view-btn"
onclick="viewRequisition(${index})">

<i class="fa fa-eye"></i>

</button>



${
req.status=="Pending"

?

`

<button class="action-btn approve-btn"
onclick="approveRequisition(${index})">

<i class="fa fa-check"></i>

</button>


<button class="action-btn reject-btn"
onclick="rejectRequisition(${index})">

<i class="fa fa-xmark"></i>

</button>

`

:""

}


<button class="action-btn print-btn"
onclick="printRequisition(${index})">

<i class="fa fa-print"></i>

</button>


</td>


</tr>

`;

});


}




//==================================================
// SUMMARY
//==================================================

function loadSummary(){

let list =
JSON.parse(
localStorage.getItem("requisitionList")
) || [];


let pending =
list.filter(
x=>x.status=="Pending"
).length;


let approved =
list.filter(
x=>x.status=="Approved"
).length;


let rejected =
list.filter(
x=>x.status=="Rejected"
).length;



if(document.getElementById("totalReq"))

document.getElementById("totalReq").innerHTML =
list.length;


if(document.getElementById("pendingReq"))

document.getElementById("pendingReq").innerHTML =
pending;


if(document.getElementById("approvedReq"))

document.getElementById("approvedReq").innerHTML =
approved;


if(document.getElementById("rejectedReq"))

document.getElementById("rejectedReq").innerHTML =
rejected;


}



//==================================================
// APPROVE + STOCK DEDUCT + ISSUE HISTORY
//==================================================

function approveRequisition(index){


let reqList =
JSON.parse(
localStorage.getItem("requisitionList")
) || [];


let stockItems =
JSON.parse(
localStorage.getItem("stockItems")
) || [];


let issueList =
JSON.parse(
localStorage.getItem("issueList")
) || [];



let req=reqList[index];


if(!req) return;



if(req.status=="Approved"){

alert("Already Approved");

return;

}



let items=req.items;



// CHECK STOCK

for(let r of items){


let stock =
stockItems.find(
s=>s.name==r.name
);



if(!stock){

alert(
r.name+" Stock Not Found"
);

return;

}



if(
Number(stock.stock)
<
Number(r.qty)
){

alert(
"Insufficient Stock : "+
r.name
);

return;

}


}




// STOCK REDUCE

items.forEach(r=>{


stockItems.forEach(s=>{


if(s.name==r.name){


s.stock -= Number(r.qty);


}


});


});





// ISSUE HISTORY CREATE

items.forEach(r=>{


issueList.push({

code:"REQ",

name:r.name,

qty:Number(r.qty),

issueTo:req.department,

date:new Date()
.toLocaleDateString(),

requisitionNo:req.reqNo,

issuedBy:req.approvedBy || "Admin"


});


});





// UPDATE STATUS


req.status="Approved";


req.approvedDate =
new Date()
.toLocaleDateString();



req.approvedBy =

JSON.parse(
localStorage.getItem("loginUser")
).name;





// SAVE


reqList[index]=req;



localStorage.setItem(

"requisitionList",

JSON.stringify(reqList)

);



localStorage.setItem(

"stockItems",

JSON.stringify(stockItems)

);



localStorage.setItem(

"issueList",

JSON.stringify(issueList)

);



loadRequisitions();

loadSummary();



alert(
"Requisition Approved"
);


}





//==================================================
// REJECT
//==================================================

function rejectRequisition(index){


let list =
JSON.parse(
localStorage.getItem("requisitionList")
) || [];



list[index].status="Rejected";


localStorage.setItem(

"requisitionList",

JSON.stringify(list)

);



loadRequisitions();

loadSummary();


}




//==================================================
// VIEW
//==================================================

function viewRequisition(index){


let list =
JSON.parse(
localStorage.getItem("requisitionList")
) || [];


let req=list[index];


let text="";


req.items.forEach(x=>{


text +=

x.name+
" - "+
x.qty+
"\n";


});



alert(

"Requisition No: "+
req.reqNo+

"\nUser: "+
req.userName+

"\nDepartment: "+
req.department+

"\n\nItems:\n"+

text

);


}





//==================================================
// SEARCH
//==================================================

function searchRequisition(){


let key =
document.getElementById(
"searchRequisition"
)
.value
.toLowerCase();



document
.querySelectorAll(
"#requisitionTable tr"
)
.forEach(row=>{


row.style.display =

row.innerText
.toLowerCase()
.includes(key)

?

""

:

"none";


});


}




//==================================================
// PRINT
//==================================================

function printRequisition(index){


let list =
JSON.parse(
localStorage.getItem("requisitionList")
) || [];


let req=list[index];


let win=window.open("");



win.document.write(`

<h2 align="center">

SH GLOBAL TECHNOLOGY

</h2>


<h3 align="center">

Material Requisition

</h3>


<p>

Req No:
${req.reqNo}

<br>

User:
${req.userName}

<br>

Department:
${req.department}

</p>


<table border="1" width="100%">

<tr>

<th>Item</th>

<th>Qty</th>

</tr>


${
req.items.map(x=>

`

<tr>

<td>${x.name}</td>

<td>${x.qty}</td>

</tr>

`

).join("")

}


</table>

`);


win.print();


}




//==================================================
// USER
//==================================================

function showUser(){

let user =
JSON.parse(
localStorage.getItem("loginUser")
);


let box =
document.getElementById("loginUser");


if(user && box){

box.innerHTML=user.name;

}


}



//==================================================
// LOGOUT
//==================================================

function logout(){

localStorage.removeItem(
"loginUser"
);


location.href="login.html";


}
