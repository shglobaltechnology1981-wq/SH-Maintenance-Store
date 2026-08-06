/*==================================================
SH Maintenance Store
report.js
==================================================*/

let stockItems =
JSON.parse(localStorage.getItem("stockItems")) || [];

let purchaseList =
JSON.parse(localStorage.getItem("purchaseList")) || [];

let issueList =
JSON.parse(localStorage.getItem("issueList")) || [];

//==============================
// PAGE LOAD
//==============================

window.onload = function () {

    showStockReport();

};

//==============================
// STOCK REPORT
//==============================

function showStockReport() {

    let table = document.getElementById("reportTable");

    table.innerHTML = "";

    stockItems.forEach(item => {

        table.innerHTML += `
        <tr>
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.stock}</td>
            <td>-</td>
        </tr>
        `;

    });

}

//==============================
// PURCHASE REPORT
//==============================

function showPurchaseReport() {

    let table = document.getElementById("reportTable");

    table.innerHTML = "";

    purchaseList.forEach(item => {

        table.innerHTML += `
        <tr>
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>Purchase</td>
            <td>${item.qty}</td>
            <td>${item.date}</td>
        </tr>
        `;

    });

}

//==============================
// ISSUE REPORT
//==============================

function showIssueReport() {

    let table = document.getElementById("reportTable");

    table.innerHTML = "";

    issueList.forEach(item => {

        table.innerHTML += `
        <tr>
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${item.issueTo}</td>
            <td>${item.qty}</td>
            <td>${item.date}</td>
        </tr>
        `;

    });

}

//==============================
// SEARCH REPORT
//==============================

function searchReport() {

    let value =
    document.getElementById("searchReport")
    .value
    .toLowerCase();

    let rows =
    document.querySelectorAll("#reportTable tr");

    rows.forEach(row => {

        row.style.display =
        row.innerText.toLowerCase().includes(value)
        ? ""
        : "none";

    });

}
