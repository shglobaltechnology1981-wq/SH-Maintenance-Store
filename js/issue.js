/*==================================================
SH STORE
Issue Management
issue.js
==================================================*/


let issueList =
JSON.parse(localStorage.getItem("issueList")) || [];


let stockItems =
JSON.parse(localStorage.getItem("stockItems")) || [];



//==============================
// PAGE LOAD
//==============================

window.onload = function(){

    loadIssue();

};




//==============================
// ISSUE ITEM
//==============================

function issueItem(){


let code =
document.getElementById("issueCode").value.trim();


let qty =
Number(document.getElementById("issueQty").value);


let issueTo =
document.getElementById("issueTo").value.trim();



if(code==="" || qty<=0 || issueTo===""){

alert("Please fill all information.");

return;

}



let found=false;



for(let i=0;i<stockItems.length;i++){



if(stockItems[i].code===code){


found=true;



if(Number(stockItems[i].stock)<qty){

alert("Insufficient Stock!");

return;

}




// STOCK MINUS

stockItems[i].stock =
Number(stockItems[i].stock)-qty;




// SAVE ISSUE


issueList.push({

code:stockItems[i].code,

name:stockItems[i].name,

category:stockItems[i].category,

qty:qty,

issueTo:issueTo,

date:new Date().toLocaleDateString()

});



break;


}



}




if(!found){

alert("Item Code Not Found.");

return;

}




localStorage.setItem(

"stockItems",

JSON.stringify(stockItems)

);



localStorage.setItem(

"issueList",

JSON.stringify(issueList)

);




clearIssueForm();


loadIssue();



alert("Issue Saved Successfully.");



}





//==============================
// LOAD ISSUE TABLE
//==============================


function loadIssue(){



let table =
document.getElementById("issueTable");



if(!table) return;



table.innerHTML="";




issueList.forEach((item,index)=>{



table.innerHTML += `


<tr>

<td>${item.code}</td>

<td>${item.name}</td>

<td>${item.qty}</td>

<td>${item.issueTo}</td>

<td>${item.date}</td>

<td>

<button onclick="deleteIssue(${index})">

Delete

</button>

</td>

</tr>


`;



});



}





//==============================
// DELETE ISSUE
//==============================


function deleteIssue(index){


if(confirm("Delete this issue?")){


issueList.splice(index,1);



localStorage.setItem(

"issueList",

JSON.stringify(issueList)

);



loadIssue();



}


}





//==============================
// CLEAR FORM
//==============================


function clearIssueForm(){


document.getElementById("issueCode").value="";

document.getElementById("issueQty").value="";

document.getElementById("issueTo").value="";


}
