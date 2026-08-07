/*==================================================
SH Maintenance Store
requisition-admin.js
==================================================*/


//==================================================
// PAGE LOAD
//==================================================

window.onload = function(){

    showUser();

    loadRequisition();

    loadSummary();

};


//==================================================
// SHOW LOGIN USER
//==================================================

function showUser(){

    let user =
    JSON.parse(
        localStorage.getItem("loginUser")
    );

    let box =
    document.getElementById("loginUser");


    if(user && box){

        box.innerHTML =
        user.name;

    }

}


//==================================================
// LOAD REQUISITION
//==================================================

function loadRequisition(){

    let list =
    JSON.parse(
        localStorage.getItem("requisition")
    ) || [];


    let table =
    document.getElementById(
        "requisitionTable"
    );


    if(!table){

        return;

    }


    table.innerHTML = "";


    list.forEach((item,index)=>{

        let status =
        item.status || "Pending";


        let css = "";


        if(status === "Pending"){

            css = "low-stock";

        }

        else if(status === "Approved"){

            css = "in-stock";

        }

        else if(status === "Rejected"){

            css = "out-stock";

        }


        table.innerHTML += `

        <tr>

        <td>${index + 1}</td>

        <td>${item.name}</td>

        <td>${item.qty}</td>

        <td>

        <span class="status ${css}">

        ${status}

        </span>

        </td>

        <td>

        ${
        status === "Pending"

        ?

        `

        <button
        class="action-btn"
        onclick="approveRequisition(${index})">

        <i class="fa fa-check"></i>

        </button>


        <button
        class="action-btn delete-btn"
        onclick="rejectRequisition(${index})">

        <i class="fa fa-xmark"></i>

        </button>

        `

        :

        `

        <button
        class="action-btn delete-btn"
        onclick="deleteRequisition(${index})">

        <i class="fa fa-trash"></i>

        </button>

        `

        }

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
        localStorage.getItem("requisition")
    ) || [];


    let total = list.length;


    let pending = 0;

    let approved = 0;

    let rejected = 0;


    list.forEach(item=>{

        let status =
        item.status || "Pending";


        if(status === "Pending"){

            pending++;

        }

        else if(status === "Approved"){

            approved++;

        }

        else if(status === "Rejected"){

            rejected++;

        }

    });


    let totalBox =
    document.getElementById(
        "totalRequisition"
    );


    let pendingBox =
    document.getElementById(
        "pendingRequisition"
    );


    let approvedBox =
    document.getElementById(
        "approvedRequisition"
    );


    let rejectedBox =
    document.getElementById(
        "rejectedRequisition"
    );


    if(totalBox){

        totalBox.innerHTML =
        total;

    }


    if(pendingBox){

        pendingBox.innerHTML =
        pending;

    }


    if(approvedBox){

        approvedBox.innerHTML =
        approved;

    }


    if(rejectedBox){

        rejectedBox.innerHTML =
        rejected;

    }

}


//==================================================
// APPROVE
//==================================================

function approveRequisition(index){

    let list =
    JSON.parse(
        localStorage.getItem("requisition")
    ) || [];


    if(!list[index]){

        return;

    }


    list[index].status =
    "Approved";


    localStorage.setItem(

        "requisition",

        JSON.stringify(list)

    );


    loadRequisition();

    loadSummary();


    alert(
        "Requisition Approved."
    );

}


//==================================================
// REJECT
//==================================================

function rejectRequisition(index){

    if(!confirm(
        "Reject this requisition?"
    )){

        return;

    }


    let list =
    JSON.parse(
        localStorage.getItem("requisition")
    ) || [];


    if(!list[index]){

        return;

    }


    list[index].status =
    "Rejected";


    localStorage.setItem(

        "requisition",

        JSON.stringify(list)

    );


    loadRequisition();

    loadSummary();


    alert(
        "Requisition Rejected."
    );

}


//==================================================
// DELETE
//==================================================

function deleteRequisition(index){

    if(!confirm(
        "Delete this requisition?"
    )){

        return;

    }


    let list =
    JSON.parse(
        localStorage.getItem("requisition")
    ) || [];


    list.splice(index,1);


    localStorage.setItem(

        "requisition",

        JSON.stringify(list)

    );


    loadRequisition();

    loadSummary();

}


//==================================================
// SEARCH
//==================================================

function searchRequisition(){

    let input =
    document.getElementById(
        "searchRequisition"
    );


    if(!input){

        return;

    }


    let keyword =
    input.value.toLowerCase();


    let rows =
    document.querySelectorAll(
        "#requisitionTable tr"
    );


    rows.forEach(row=>{

        if(
            row.innerText
            .toLowerCase()
            .includes(keyword)
        ){

            row.style.display = "";

        }

        else{

            row.style.display = "none";

        }

    });

}


//==================================================
// LOGOUT
//==================================================

function logout(){

    localStorage.removeItem(
        "loginUser"
    );


    window.location.href =
    "login.html";

}
