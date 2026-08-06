let requisition =
JSON.parse(localStorage.getItem("requisition")) || [];


let stockItems =
JSON.parse(localStorage.getItem("stockItems")) || [];




function loadIssue(){


let html="";


requisition.forEach((x,i)=>{


if(x.status=="Approved"){


html+=`

<tr>

<td>${i+1}</td>

<td>${x.user}</td>

<td>${x.department}</td>

<td>${x.item}</td>

<td>${x.qty}</td>

<td>${x.status}</td>


<td>

<button onclick="issueItem(${i})">

Issue

</button>

</td>


</tr>

`;

}

});


document.getElementById("issueTable").innerHTML=html;


}





function issueItem(index){


let req =
requisition[index];



let stock =
stockItems.find(

x=>x.name==req.item

);



if(!stock){

alert("Item not found in Stock");

return;

}



if(stock.stock < req.qty){

alert("Insufficient Stock");

return;

}



// Stock Minus

stock.stock =
stock.stock - req.qty;



// Status Update

req.status="Issued";




// Issue Challan Create


let issueNo =
"ISS-" + 
String(Date.now()).slice(-6);



let issueData={


issueNo:issueNo,


date:new Date().toLocaleDateString(),


department:req.department,


user:req.user,


items:[

{

name:req.item,

qty:req.qty

}

]


};




// Save Challan


localStorage.setItem(

"lastIssue",

JSON.stringify(issueData)

);




// Save Stock


localStorage.setItem(

"stockItems",

JSON.stringify(stockItems)

);



// Save Requisition


localStorage.setItem(

"requisition",

JSON.stringify(requisition)

);



alert("Issue Completed");



// Open Challan


window.location.href=
"issue-challan.html";


}




