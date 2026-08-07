/*==================================================
SH Maintenance Store
requisition-history.js
==================================================*/


//==================================================
// LOGIN CHECK
//==================================================

let user =
JSON.parse(
    localStorage.getItem("loginUser")
);


if(!user){

    window.location.href =
    "login.html";

}


//==================================================
// LOAD REQUISITION HISTORY
//==================================================

function loadHistory(){

    let history =
    JSON.parse(
        localStorage.getItem("requisitionHistory")
    ) || [];


    let table =
    document.getElementById("historyTable");


    if(!table){

        return;

    }


    table.innerHTML = "";


    if(history.length === 0){

        table.innerHTML = `

        <tr>

            <td colspan="8">

                No Requisition Found

            </td>

        </tr>

        `;

        return;

    }


    history.forEach((req,index)=>{

        let statusClass = "";


        if(req.status === "Pending"){

            statusClass = "pending";

        }


        table.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>
                ${req.requisitionNo}
            </td>

            <td>
                ${req.user}
            </td>

            <td>
                ${req.department}
            </td>

            <td>
                ${req.date}
            </td>

            <td>
                ${req.time}
            </td>

            <td>

                <span class="${statusClass}">

                    ${req.status}

                </span>

            </td>

            <td>

                <button
                onclick="viewRequisition(${index})">

                    <i class="fa fa-eye"></i>

                    View

                </button>

                <button
                onclick="deleteRequisition(${index})">

                    <i class="fa fa-trash"></i>

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}


//==================================================
// SEARCH REQUISITION
//==================================================

function searchRequisition(){

    let keyword =
    document.getElementById("searchReq")
    .value
    .toLowerCase();


    let rows =
    document.querySelectorAll(
        "#historyTable tr"
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
// VIEW REQUISITION
//==================================================

function viewRequisition(index){

    let history =
    JSON.parse(
        localStorage.getItem("requisitionHistory")
    ) || [];


    let req =
    history[index];


    if(!req){

        alert(
            "Requisition not found."
        );

        return;

    }


    let itemsText = "";


    req.items.forEach((item,i)=>{

        itemsText +=

        (i + 1) +
        ". " +
        item.name +
        " - Qty: " +
        item.qty +
        "\n";

    });


    alert(

        "Requisition No: " +
        req.requisitionNo +

        "\n\nUser: " +
        req.user +

        "\nDepartment: " +
        req.department +

        "\nDate: " +
        req.date +

        "\nTime: " +
        req.time +

        "\nStatus: " +
        req.status +

        "\n\nItems:\n" +
        itemsText

    );

}


//==================================================
// DELETE REQUISITION
//==================================================

function deleteRequisition(index){

    let history =
    JSON.parse(
        localStorage.getItem("requisitionHistory")
    ) || [];


    let req =
    history[index];


    if(!req){

        return;

    }


    let confirmDelete =
    confirm(

        "Delete Requisition " +
        req.requisitionNo +
        "?"

    );


    if(!confirmDelete){

        return;

    }


    history.splice(index,1);


    localStorage.setItem(

        "requisitionHistory",

        JSON.stringify(history)

    );


    //==================================================
    // UPDATE PENDING LIST
    //==================================================

    let pendingList = [];


    history.forEach(item=>{

        if(item.status === "Pending"){

            item.items.forEach(reqItem=>{

                pendingList.push({

                    name:reqItem.name,

                    qty:reqItem.qty,

                    status:"Pending",

                    requisitionNo:
                    item.requisitionNo

                });

            });

        }

    });


    localStorage.setItem(

        "requisition",

        JSON.stringify(pendingList)

    );


    loadHistory();


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


//==================================================
// PAGE LOAD
//==================================================

window.onload = function(){

    loadHistory();

};
