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
// APPROVE REQUEST
//==============================

function approveReq(index){



requisitionList[index].status="Approved";



localStorage.setItem(

"requisitionList",

JSON.stringify(requisitionList)

);



alert("Requisition Approved");



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
