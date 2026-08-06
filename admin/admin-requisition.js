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

//==============================
// APPROVE REQUISITION
//==============================

function approveReq(index){

    requisitionList =
    JSON.parse(localStorage.getItem("requisitionList")) || [];

    stockItems =
    JSON.parse(localStorage.getItem("stockItems")) || [];

    issueList =
    JSON.parse(localStorage.getItem("issueList")) || [];

    let req = requisitionList[index];

    if(!req){

        alert("Requisition Not Found");

        return;

    }

    if(req.status=="Issued"){

        alert("Already Approved");

        return;

    }

    if(req.status=="Rejected"){

        alert("Already Rejected");

        return;

    }

    let product = stockItems.find(item=>

        item.name.trim().toLowerCase() ==

        req.itemName.trim().toLowerCase()

    );

    if(!product){

        alert("Item Not Found In Stock");

        return;

    }

    if(Number(product.stock) < Number(req.qty)){

        alert("Insufficient Stock");

        return;

    }

    // Minus Stock

    product.stock =

    Number(product.stock) -

    Number(req.qty);

    // Create Issue

    let issue={

        issueNo:"ISS-"+Date.now(),

        code:product.code,

        name:product.name,

        qty:req.qty,

        issueTo:req.userName,

        department:req.department,

        date:new Date().toLocaleDateString(),

        requisitionNo:req.reqNo

    };

    issueList.push(issue);

    req.status="Issued";

    localStorage.setItem(
    "stockItems",
    JSON.stringify(stockItems)
    );

    localStorage.setItem(
    "issueList",
    JSON.stringify(issueList)
    );

    localStorage.setItem(
    "requisitionList",
    JSON.stringify(requisitionList)
    );

    alert("Requisition Approved Successfully");

    loadAdminRequisition();

}

//==============================
// REJECT REQUISITION
//==============================

function rejectReq(index){

    requisitionList =
    JSON.parse(localStorage.getItem("requisitionList")) || [];

    let req = requisitionList[index];

    if(!req){

        alert("Requisition Not Found");

        return;

    }

    if(req.status=="Issued"){

        alert("Already Issued");

        return;

    }

    if(req.status=="Rejected"){

        alert("Already Rejected");

        return;

    }

    req.status = "Rejected";

    localStorage.setItem(
        "requisitionList",
        JSON.stringify(requisitionList)
    );

    alert("Requisition Rejected Successfully");

    loadAdminRequisition();

}



//==============================
// REFRESH
//==============================

function refreshRequisition(){

    requisitionList =
    JSON.parse(localStorage.getItem("requisitionList")) || [];

    loadAdminRequisition();

}
