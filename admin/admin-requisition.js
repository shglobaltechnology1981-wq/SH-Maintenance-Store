/*==================================================
SH Maintenance Store
ADMIN REQUISITION MANAGEMENT
admin-requisition.js
==================================================*/


let requisitionList =

JSON.parse(
localStorage.getItem("requisitionList")
) || [];




//==============================
// PAGE LOAD
//==============================

window.onload = function(){

    loadAdminRequisition();

};





//==============================
// LOAD ALL REQUISITION
//==============================

function loadAdminRequisition(){


    let table =

    document.getElementById("adminReqTable");



    if(!table){

        return;

    }



    table.innerHTML = "";




    requisitionList.forEach(function(item,index){



        table.innerHTML += `


<tr>


<td>${item.reqNo || ""}</td>


<td>${item.userName || ""}</td>


<td>${item.department || ""}</td>


<td>${item.itemName || ""}</td>


<td>${item.qty || 0}</td>


<td>${item.date || ""}</td>


<td>

${item.status || "Pending"}

</td>


<td>



<button

class="btn btn-success"

onclick="approveReq(${index})">

Approve

</button>




<button

class="btn btn-danger"

onclick="rejectReq(${index})">

Reject

</button>



</td>


</tr>


`;



    });


}






//==============================
// APPROVE REQUISITION
//==============================

function approveReq(index){



let req =

requisitionList[index];




let stockItems =

JSON.parse(

localStorage.getItem("stockItems")

) || [];





let issueList =

JSON.parse(

localStorage.getItem("issueList")

) || [];





// FIND STOCK ITEM


let product =

stockItems.find(item =>


item.name.toLowerCase()

===

req.itemName.toLowerCase()


);





if(!product){


alert(
"Item Not Found In Stock"
);


return;


}






// CHECK STOCK


if(

Number(product.stock)

<

Number(req.qty)

){


alert(
"Insufficient Stock"
);


return;


}





// STOCK MINUS


product.stock =

Number(product.stock)

-

Number(req.qty);








// CREATE ISSUE


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





issueList.push(issue);






localStorage.setItem(

"issueList",

JSON.stringify(issueList)

);





localStorage.setItem(

"stockItems",

JSON.stringify(stockItems)

);







// STATUS UPDATE


requisitionList[index].status =

"Issued";





localStorage.setItem(

"requisitionList",

JSON.stringify(requisitionList)

);





alert(
"Requisition Approved Successfully"
);




loadAdminRequisition();



}







//==============================
// REJECT REQUISITION
//==============================

function rejectReq(index){



requisitionList[index].status =

"Rejected";





localStorage.setItem(

"requisitionList",

JSON.stringify(requisitionList)

);





alert(
"Requisition Rejected"
);




loadAdminRequisition();



}
