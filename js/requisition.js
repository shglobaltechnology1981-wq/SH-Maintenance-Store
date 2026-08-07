/*==================================================
SH Maintenance Store
requisition.js

Features:
- Login User
- Department
- Item Picture
- Multiple Items
- Requisition Number
- Save Requisition
- Requisition History
- Delete Requisition
- Print Requisition
==================================================*/


//==================================================
// LOGIN USER CHECK
//==================================================

let user =
JSON.parse(
    localStorage.getItem("loginUser")
);


if(!user){

    window.location.href = "login.html";

}


//==================================================
// CURRENT REQUISITION ITEMS
//==================================================

let items = [];


//==================================================
// CURRENT PICTURE
//==================================================

let currentPicture = "";


//==================================================
// PAGE LOAD
//==================================================

window.onload = function(){

    showUser();

    showItems();

    loadRequisitionHistory();

};


//==================================================
// SHOW USER
//==================================================

function showUser(){

    let userNameBox =
    document.getElementById("userName");


    let departmentBox =
    document.getElementById("department");


    if(userNameBox){

        userNameBox.innerHTML =
        user.name || "";

    }


    if(departmentBox){

        departmentBox.innerHTML =
        user.department || "";

    }

}


//==================================================
// PICTURE PREVIEW
//==================================================

function previewPicture(event){

    let file =
    event.target.files[0];


    if(!file){

        currentPicture = "";

        return;

    }


    // Maximum 2 MB
    if(file.size > 2 * 1024 * 1024){

        alert(
            "Picture size must be less than 2 MB."
        );

        event.target.value = "";

        currentPicture = "";

        return;

    }


    let reader =
    new FileReader();


    reader.onload = function(e){

        currentPicture =
        e.target.result;


        let preview =
        document.getElementById(
            "picturePreview"
        );


        if(preview){

            preview.src =
            currentPicture;

            preview.style.display =
            "block";

        }

    };


    reader.readAsDataURL(file);

}


//==================================================
// ADD ITEM
//==================================================

function addItem(){

    let name =
    document.getElementById(
        "itemName"
    ).value.trim();


    let qty =
    Number(
        document.getElementById(
            "qty"
        ).value
    );


    // Validation

    if(name === ""){

        alert(
            "Please enter Item Name."
        );

        return;

    }


    if(qty <= 0){

        alert(
            "Please enter valid Quantity."
        );

        return;

    }


    // Add item

    items.push({

        name:name,

        qty:qty,

        picture:currentPicture,

        status:"Pending"

    });


    // Clear form

    document.getElementById(
        "itemName"
    ).value = "";


    document.getElementById(
        "qty"
    ).value = "";


    document.getElementById(
        "itemPicture"
    ).value = "";


    currentPicture = "";


    let preview =
    document.getElementById(
        "picturePreview"
    );


    if(preview){

        preview.src = "";

        preview.style.display =
        "none";

    }


    showItems();

}


//==================================================
// SHOW CURRENT ITEMS
//==================================================

function showItems(){

    let table =
    document.getElementById(
        "reqTable"
    );


    if(!table){

        return;

    }


    table.innerHTML = "";


    if(items.length === 0){

        table.innerHTML = `

        <tr>

            <td colspan="5">

                No items added

            </td>

        </tr>

        `;

        return;

    }


    items.forEach((item,index)=>{


        let pictureHTML = "";


        if(item.picture){

            pictureHTML = `

            <img

                src="${item.picture}"

                class="req-picture"

                alt="Item">

            `;

        }else{

            pictureHTML = `

            <span>
                No Picture
            </span>

            `;

        }


        table.innerHTML += `

        <tr>

            <td>
                ${index + 1}
            </td>


            <td>

                ${pictureHTML}

            </td>


            <td>
                ${item.name}
            </td>


            <td>
                ${item.qty}
            </td>


            <td>

                <span class="pending">

                    ${item.status}

                </span>

            </td>

        </tr>

        `;

    });

}


//==================================================
// SAVE REQUISITION
//==================================================

function saveRequisition(){

    if(items.length === 0){

        alert(
            "Please add at least one item."
        );

        return;

    }


    // Existing requisitions

    let requisitionList =

    JSON.parse(

        localStorage.getItem(
            "requisitionList"
        )

    ) || [];


    // Requisition Number

    let requisitionNo =

        "REQ-" +

        new Date().getTime();


    // Requisition Object

    let requisition = {

        requisitionNo:

            requisitionNo,


        user:

            user.name || "",


        department:

            user.department || "",


        date:

            new Date()
            .toLocaleDateString(),


        time:

            new Date()
            .toLocaleTimeString(),


        status:

            "Pending",


        items:

            JSON.parse(
                JSON.stringify(items)
            )

    };


    // Save

    requisitionList.push(
        requisition
    );


    localStorage.setItem(

        "requisitionList",

        JSON.stringify(
            requisitionList
        )

    );


    // Keep old storage for compatibility

    localStorage.setItem(

        "requisition",

        JSON.stringify(items)

    );


    alert(

        "Requisition Saved Successfully!\n\n" +

        "Requisition No: " +

        requisitionNo

    );


    // Reset

    items = [];


    showItems();

    loadRequisitionHistory();

}


//==================================================
// LOAD REQUISITION HISTORY
//==================================================

function loadRequisitionHistory(){

    let table =
    document.getElementById(
        "requisitionHistory"
    );


    if(!table){

        return;

    }


    let requisitionList =

    JSON.parse(

        localStorage.getItem(
            "requisitionList"
        )

    ) || [];


    table.innerHTML = "";


    if(requisitionList.length === 0){

        table.innerHTML = `

        <tr>

            <td colspan="7">

                No Requisition Found

            </td>

        </tr>

        `;

        return;

    }


    requisitionList
    .slice()
    .reverse()
    .forEach((req,index)=>{


        let itemCount =
        req.items
        ? req.items.length
        : 0;


        table.innerHTML += `

        <tr>

            <td>
                ${req.requisitionNo || ""}
            </td>


            <td>
                ${req.user || ""}
            </td>


            <td>
                ${req.department || ""}
            </td>


            <td>
                ${req.date || ""}
            </td>


            <td>
                ${itemCount}
            </td>


            <td>

                <span class="pending">

                    ${req.status || "Pending"}

                </span>

            </td>


            <td>

                <button

                    type="button"

                    onclick="printRequisition(
                        '${req.requisitionNo}'
                    )">

                    <i class="fa fa-print"></i>

                </button>


                <button

                    type="button"

                    onclick="deleteRequisition(
                        '${req.requisitionNo}'
                    )">

                    <i class="fa fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}


//==================================================
// DELETE REQUISITION
//==================================================

function deleteRequisition(
    requisitionNo
){

    if(

        !confirm(
            "Delete this requisition?"
        )

    ){

        return;

    }


    let requisitionList =

    JSON.parse(

        localStorage.getItem(
            "requisitionList"
        )

    ) || [];


    requisitionList =

    requisitionList.filter(

        req =>

        req.requisitionNo !==
        requisitionNo

    );


    localStorage.setItem(

        "requisitionList",

        JSON.stringify(
            requisitionList
        )

    );


    loadRequisitionHistory();


    alert(
        "Requisition Deleted."
    );

}


//==================================================
// PRINT REQUISITION
//==================================================

function printRequisition(
    requisitionNo
){

    let requisitionList =

    JSON.parse(

        localStorage.getItem(
            "requisitionList"
        )

    ) || [];


    let req =

    requisitionList.find(

        item =>

        item.requisitionNo ===
        requisitionNo

    );


    if(!req){

        alert(
            "Requisition not found."
        );

        return;

    }


    let win =
    window.open(
        "",
        "_blank"
    );


    if(!win){

        alert(
            "Please allow popup window."
        );

        return;

    }


    let html = `

    <!DOCTYPE html>

    <html>

    <head>

        <title>
            ${req.requisitionNo}
        </title>


        <style>

            body{

                font-family:Arial;

                padding:30px;

            }


            h1,h2{

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


            th,td{

                border:1px solid #000;

                padding:8px;

                text-align:center;

            }


            th{

                background:#eee;

            }


            .picture{

                width:60px;

                height:60px;

                object-fit:cover;

            }


            .signature{

                margin-top:60px;

                display:flex;

                justify-content:space-between;

            }


        </style>

    </head>


    <body>


        <h1>
            SH GLOBAL TECHNOLOGY
        </h1>


        <h2>
            SH Maintenance Store
        </h2>


        <h2>
            MATERIAL REQUISITION
        </h2>


        <div class="info">

            <strong>
                Requisition No:
            </strong>

            ${req.requisitionNo}

            <br>


            <strong>
                User:
            </strong>

            ${req.user || ""}

            <br>


            <strong>
                Department:
            </strong>

            ${req.department || ""}

            <br>


            <strong>
                Date:
            </strong>

            ${req.date || ""}

            <br>


            <strong>
                Status:
            </strong>

            ${req.status || ""}

        </div>


        <table>

            <thead>

                <tr>

                    <th>SL</th>

                    <th>Picture</th>

                    <th>Item Name</th>

                    <th>Qty</th>

                    <th>Status</th>

                </tr>

            </thead>


            <tbody>

    `;


    if(req.items){

        req.items.forEach(
            (item,index)=>{

                let picture =

                    item.picture

                    ?

                    `<img
                        src="${item.picture}"
                        class="picture"
                    >`

                    :

                    "No Picture";


                html += `

                    <tr>

                        <td>
                            ${index + 1}
                        </td>

                        <td>
                            ${picture}
                        </td>

                        <td>
                            ${item.name}
                        </td>

                        <td>
                            ${item.qty}
                        </td>

                        <td>
                            ${item.status}
                        </td>

                    </tr>

                `;

            }
        );

    }


    html += `

            </tbody>

        </table>


        <div class="signature">

            <div>

                ____________________<br>

                Requested By

            </div>


            <div>

                ____________________<br>

                Store Officer

            </div>


            <div>

                ____________________<br>

                Approved By

            </div>

        </div>


    </body>

    </html>

    `;


    win.document.write(html);

    win.document.close();


    win.onload = function(){

        win.print();

    };

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
