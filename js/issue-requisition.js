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



stock.stock =
stock.stock - req.qty;



req.status="Issued";



localStorage.setItem(

"stockItems",

JSON.stringify(stockItems)

);



localStorage.setItem(

"requisition",

JSON.stringify(requisition)

);



alert("Issue Completed");


loadIssue();


}




loadIssue();
