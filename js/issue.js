/*==================================================
SH Maintenance Store
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

        alert("Please fill all fields.");

        return;

    }


    let found = false;


    stockItems.forEach(item=>{

        if(item.code===code){

            found = true;

            if(item.stock < qty){

                alert("Insufficient Stock.");

                return;

            }

            item.stock -= qty;

            issueList.push({

                code:item.code,

                name:item.name,

                qty:qty,

                issueTo:issueTo,

                date:new Date().toLocaleDateString()

            });

        }

    });


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


    clearForm();

    loadIssue();

    alert("Item Issued Successfully.");

}
//==================================================
// LOAD ISSUE TABLE
//==================================================

function loadIssue(){

    let table =
    document.getElementById("issueTable");

    table.innerHTML = "";

    issueList.forEach((item,index)=>{

        table.innerHTML += `

<tr>

<td>${item.code}</td>

<td>${item.name}</td>

<td>${item.qty}</td>

<td>${item.issueTo}</td>

<td>${item.date}</td>

<td>

<button
class="action-btn delete-btn"
onclick="deleteIssue(${index})">

<i class="fa fa-trash"></i>

</button>

</td>

</tr>

`;

    });

}



//==================================================
// DELETE ISSUE
//==================================================

function deleteIssue(index){

    if(!confirm("Delete this issue record?")){

        return;

    }

    // Restore Stock

    let issue = issueList[index];

    stockItems.forEach(item=>{

        if(item.code === issue.code){

            item.stock += Number(issue.qty);

        }

    });

    issueList.splice(index,1);

    localStorage.setItem(
        "stockItems",
        JSON.stringify(stockItems)
    );

    localStorage.setItem(
        "issueList",
        JSON.stringify(issueList)
    );

    loadIssue();

}



//==================================================
// SEARCH ISSUE
//==================================================

function searchIssue(){

    let keyword = document
        .getElementById("searchIssue")
        .value
        .toLowerCase();

    let rows = document.querySelectorAll("#issueTable tr");

    rows.forEach(row=>{

        if(row.innerText.toLowerCase().includes(keyword)){

            row.style.display = "";

        }else{

            row.style.display = "none";

        }

    });

}



//==================================================
// CLEAR FORM
//==================================================

function clearForm(){

    document.getElementById("issueCode").value = "";

    document.getElementById("issueQty").value = "";

    document.getElementById("issueTo").value = "";

}



//==================================================
// REFRESH
//==================================================

function refreshIssue(){

    loadIssue();

}
//==================================================
// PRINT ISSUE REPORT
//==================================================

function printIssueReport(){

let win = window.open("");


let html = `

<html>

<head>

<title>Issue Report</title>

<style>

body{

font-family:Arial;

padding:20px;

}

table{

width:100%;

border-collapse:collapse;

}

th,td{

border:1px solid #000;

padding:8px;

text-align:center;

}

h2{

text-align:center;

}

</style>

</head>

<body>

<h2>

SH Maintenance Store

<br>

Issue Report

</h2>

<table>

<tr>

<th>Code</th>

<th>Item Name</th>

<th>Qty</th>

<th>Issue To</th>

<th>Date</th>

</tr>
`;


issueList.forEach(item=>{

html += `

<tr>

<td>${item.code}</td>

<td>${item.name}</td>

<td>${item.qty}</td>

<td>${item.issueTo}</td>

<td>${item.date}</td>

</tr>

`;

});


html += `

</table>

</body>

</html>

`;


win.document.write(html);

win.document.close();

win.print();

}
