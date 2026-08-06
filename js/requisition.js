/*==================================================
SH Maintenance Store
USER REQUISITION SYSTEM
requisition.js
==================================================*/


//==============================
// LOGIN USER LOAD
//==============================

let loginUser =
JSON.parse(localStorage.getItem("loginUser")) || null;



let requisitionList =
JSON.parse(localStorage.getItem("requisitionList")) || [];



//==============================
// PAGE LOAD
//==============================

window.onload=function(){


if(!loginUser){

    alert("Please Login First");

    window.location.href="login.html";

}


else{


document.getElementById("userName").innerHTML =

loginUser.name + " (" + loginUser.department + ")";


loadRequisition();


}


};




//==============================
// SAVE REQUISITION
//==============================

function saveRequisition(){



let itemName =

document.getElementById("itemName").value;



let qty =

document.getElementById("qty").value;



let purpose =

document.getElementById("purpose").value;




if(itemName=="" || qty==""){


alert("Please Enter Item & Quantity");

return;


}




let req = {


reqNo:
"REQ-" + Date.now(),


userId:
loginUser.id,


userName:
loginUser.name,


department:
loginUser.department,


itemName:
itemName,


qty:
Number(qty),


purpose:
purpose,


date:
new Date().toLocaleDateString(),


status:
"Pending"


};




requisitionList.push(req);



localStorage.setItem(

"requisitionList",

JSON.stringify(requisitionList)

);




alert("Requisition Submitted Successfully");



document.getElementById("itemName").value="";

document.getElementById("qty").value="";

document.getElementById("purpose").value="";



loadRequisition();


}





//==============================
// LOAD USER HISTORY
//==============================


function loadRequisition(){


let table =

document.getElementById("reqTable");



table.innerHTML="";




requisitionList.forEach(item=>{



if(item.userId==loginUser.id){



table.innerHTML += `


<tr>


<td>${item.itemName}</td>


<td>${item.qty}</td>


<td>${item.purpose}</td>


<td>

${item.status}

</td>


</tr>


`;



}


});



}
