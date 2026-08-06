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

//==============================
// FILTER REPORT
//==============================

function filterReport(){

alert("Date Filter will be activated in Part-23.");

}

//==============================
// EXCEL
//==============================

function downloadExcel(){

let table=document.querySelector("table");

let wb=XLSX.utils.table_to_book(table);

XLSX.writeFile(wb,"SH_Report.xlsx");

}

//==============================
// PDF
//==============================

async function downloadPDF(){

const {jsPDF}=window.jspdf;

const pdf=new jsPDF("p","mm","a4");

const canvas=await html2canvas(document.querySelector(".main"));

const img=canvas.toDataURL("image/png");

const w=190;

const h=(canvas.height*w)/canvas.width;

pdf.addImage(img,"PNG",10,10,w,h);

pdf.save("SH_Report.pdf");

}
