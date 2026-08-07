/*==================================================
SH Maintenance Store
requisition-admin.js
==================================================*/


//==================================================
// PAGE LOAD
//==================================================

window.onload = function(){

    showUser();

    loadRequisitions();

    loadSummary();

};


//==================================================
// LOAD REQUISITIONS
//==================================================

function loadRequisitions(){

    let list =
    JSON.parse(
        localStorage.getItem("requisitionList")
    ) || [];


    let table =
    document.getElementById(
        "requisitionTable"
    );


    if(!table){

        return;

    }


    table.innerHTML = "";


    if(list.length === 0){

        table.innerHTML = `

        <tr>

            <td colspan="9">

                No Requisition Found

            </td>

        </tr>

        `;

        return;

    }


    list.forEach((req,index)=>{

        let status =
        req.status || "Pending";


        let statusClass =
        status.toLowerCase();


        let items =
        req.items || [];


        /*
        Old requisition format support
        */

        if(!Array.isArray(items)){

            items = [{

                name:req.name || "",

                qty:req.qty || 0,

                status:status

            }];

        }


        let itemNames = items.map(
            item => item.name || ""
        ).join(", ");


        let quantities = items.map(
            item => item.qty || 0
        ).join(", ");


        let reqNo =
        req.reqNo ||
        ("REQ-" + String(index + 1).padStart(4,"0"));


        let user =
        req.userName ||
        req.user ||
        "";


        let department =
        req.department ||
        "";


        let date =
        req.date ||
        "";


        table.innerHTML += `

        <tr>

            <td>
                ${index + 1}
            </td>


            <td>
                ${reqNo}
            </td>


            <td>
                ${user}
            </td>


            <td>
                ${department}
            </td>


            <td>
                ${itemNames}
            </td>


            <td>
                ${quantities}
            </td>


            <td>
                ${date}
            </td>


            <td>

                <span class="req-status ${statusClass}">

                    ${status}

                </span>

            </td>


            <td>

                <button
                class="action-btn view-btn"
                onclick="viewRequisition(${index})">

                    <i class="fa fa-eye"></i>

                </button>


                ${
                    status === "Pending"

                    ?

                    `

                    <button
                    class="action-btn approve-btn"
                    onclick="approveRequisition(${index})">

                        <i class="fa fa-check"></i>

                    </button>


                    <button
                    class="action-btn reject-btn"
                    onclick="rejectRequisition(${index})">

                        <i class="fa fa-xmark"></i>

                    </button>

                    `

                    :

                    ""

                }


                <button
                class="action-btn print-btn"
                onclick="printRequisition(${index})">

                    <i class="fa fa-print"></i>

                </button>


                <button
                class="action-btn pdf-btn"
                onclick="downloadRequisitionPDF(${index})">

                    <i class="fa fa-file-pdf"></i>

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


    let total = list.length;


    let pending =
    list.filter(
        req =>
        (req.status || "Pending")
        === "Pending"
    ).length;


    let approved =
    list.filter(
        req =>
        req.status === "Approved"
    ).length;


    let rejected =
    list.filter(
        req =>
        req.status === "Rejected"
    ).length;


    let totalBox =
    document.getElementById("totalReq");


    let pendingBox =
    document.getElementById("pendingReq");


    let approvedBox =
    document.getElementById("approvedReq");


    let rejectedBox =
    document.getElementById("rejectedReq");


    if(totalBox){

        totalBox.innerHTML = total;

    }


    if(pendingBox){

        pendingBox.innerHTML = pending;

    }


    if(approvedBox){

        approvedBox.innerHTML = approved;

    }


    if(rejectedBox){

        rejectedBox.innerHTML = rejected;

    }

}


//==================================================
// VIEW REQUISITION
//==================================================

function viewRequisition(index){

    let list =
    JSON.parse(
        localStorage.getItem("requisitionList")
    ) || [];


    let req = list[index];


    if(!req){

        alert("Requisition not found.");

        return;

    }


    let items =
    req.items || [];


    if(!Array.isArray(items)){

        items = [{

            name:req.name || "",

            qty:req.qty || 0

        }];

    }


    let itemText = "";


    items.forEach((item,i)=>{

        itemText +=

        (i + 1) +
        ". " +
        (item.name || "") +
        " - Qty: " +
        (item.qty || 0) +
        "\n";

    });


    alert(

        "Requisition Details\n\n" +

        "Req. No: " +
        (req.reqNo || "") +

        "\nUser: " +
        (req.userName || req.user || "") +

        "\nDepartment: " +
        (req.department || "") +

        "\nDate: " +
        (req.date || "") +

        "\nStatus: " +
        (req.status || "Pending") +

        "\n\nItems:\n" +

        itemText

    );

}


//==================================================
// APPROVE
//==================================================

function approveRequisition(index){

    let list =
    JSON.parse(
        localStorage.getItem("requisitionList")
    ) || [];


    if(!list[index]){

        return;

    }


    if(
        !confirm(
            "Approve this requisition?"
        )
    ){

        return;

    }


    list[index].status =
    "Approved";


    list[index].approvedDate =
    new Date().toLocaleDateString();


    localStorage.setItem(

        "requisitionList",

        JSON.stringify(list)

    );


    loadRequisitions();

    loadSummary();


    alert(
        "Requisition Approved."
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


    if(!list[index]){

        return;

    }


    if(
        !confirm(
            "Reject this requisition?"
        )
    ){

        return;

    }


    list[index].status =
    "Rejected";


    list[index].rejectedDate =
    new Date().toLocaleDateString();


    localStorage.setItem(

        "requisitionList",

        JSON.stringify(list)

    );


    loadRequisitions();

    loadSummary();


    alert(
        "Requisition Rejected."
    );

}


//==================================================
// SEARCH
//==================================================

function searchRequisition(){

    let keyword =
    document.getElementById(
        "searchRequisition"
    ).value.toLowerCase();


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
// PRINT REQUISITION
//==================================================

function printRequisition(index){

    let list =
    JSON.parse(
        localStorage.getItem("requisitionList")
    ) || [];


    let req = list[index];


    if(!req){

        return;

    }


    let items =
    req.items || [];


    if(!Array.isArray(items)){

        items = [{

            name:req.name || "",

            qty:req.qty || 0

        }];

    }


    let rows = "";


    items.forEach((item,i)=>{

        rows += `

        <tr>

            <td>${i + 1}</td>

            <td>${item.name || ""}</td>

            <td>${item.qty || 0}</td>

        </tr>

        `;

    });


    let win =
    window.open(
        "",
        "_blank"
    );


    win.document.write(`

    <!DOCTYPE html>

    <html>

    <head>

        <title>
            Material Requisition
        </title>


        <style>

            body{

                font-family:Arial;

                padding:30px;

            }


            h1,
            h2{

                text-align:center;

            }


            .info{

                margin:20px 0;

                line-height:1.8;

            }


            table{

                width:100%;

                border-collapse:collapse;

                margin-top:20px;

            }


            th,
            td{

                border:1px solid #000;

                padding:10px;

            }


            th{

                background:#eee;

            }


            .signature{

                display:flex;

                justify-content:space-between;

                margin-top:80px;

            }

        </style>

    </head>


    <body>


        <h1>
            SH GLOBAL TECHNOLOGY
        </h1>


        <h2>
            MATERIAL REQUISITION
        </h2>


        <div class="info">

            <b>Requisition No:</b>
            ${req.reqNo || ""}

            <br>


            <b>User:</b>
            ${req.userName || req.user || ""}

            <br>


            <b>Department:</b>
            ${req.department || ""}

            <br>


            <b>Date:</b>
            ${req.date || ""}

            <br>


            <b>Status:</b>
            ${req.status || "Pending"}

        </div>


        <table>

            <thead>

                <tr>

                    <th>SL</th>

                    <th>Item Name</th>

                    <th>Required Qty</th>

                </tr>

            </thead>


            <tbody>

                ${rows}

            </tbody>

        </table>


        <div class="signature">

            <div>
                Requested By
            </div>

            <div>
                Approved By
            </div>

        </div>


    </body>

    </html>

    `);


    win.document.close();


    win.focus();


    setTimeout(()=>{

        win.print();

    },500);

}


//==================================================
// DOWNLOAD PDF
//==================================================

function downloadRequisitionPDF(index){

    if(!window.jspdf){

        alert(
            "PDF Library Not Loaded."
        );

        return;

    }


    let list =
    JSON.parse(
        localStorage.getItem("requisitionList")
    ) || [];


    let req = list[index];


    if(!req){

        return;

    }


    const {jsPDF} =
    window.jspdf;


    let doc =
    new jsPDF(
        "p",
        "mm",
        "a4"
    );


    doc.setFontSize(16);


    doc.text(

        "SH GLOBAL TECHNOLOGY",

        105,

        15,

        {
            align:"center"
        }

    );


    doc.setFontSize(13);


    doc.text(

        "MATERIAL REQUISITION",

        105,

        24,

        {
            align:"center"
        }

    );


    doc.setFontSize(10);


    doc.text(

        "Requisition No: " +
        (req.reqNo || ""),

        15,

        38

    );


    doc.text(

        "User: " +
        (req.userName || req.user || ""),

        15,

        45

    );


    doc.text(

        "Department: " +
        (req.department || ""),

        15,

        52

    );


    doc.text(

        "Date: " +
        (req.date || ""),

        15,

        59

    );


    doc.text(

        "Status: " +
        (req.status || "Pending"),

        15,

        66

    );


    let items =
    req.items || [];


    if(!Array.isArray(items)){

        items = [{

            name:req.name || "",

            qty:req.qty || 0

        }];

    }


    let rows = [];


    items.forEach((item,i)=>{

        rows.push([

            i + 1,

            item.name || "",

            item.qty || 0

        ]);

    });


    if(
        typeof doc.autoTable ===
        "function"
    ){

        doc.autoTable({

            startY:75,

            head:[[

                "SL",

                "Item Name",

                "Required Qty"

            ]],

            body:rows,

            theme:"grid"

        });

    }


    doc.save(

        "SH-Requisition-" +

        (req.reqNo || index + 1) +

        ".pdf"

    );

}


//==================================================
// SHOW USER
//==================================================

function showUser(){

    let user =
    JSON.parse(
        localStorage.getItem(
            "loginUser"
        )
    );


    let box =
    document.getElementById(
        "loginUser"
    );


    if(user && box){

        box.innerHTML =
        user.name || "";

    }

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
