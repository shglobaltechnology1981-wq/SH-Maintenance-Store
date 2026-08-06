/*==================================================
SH Maintenance Store
report.js
Final Version
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

window.onload = function(){

    updateSummary();

    showStockReport();

};


//==============================
// SUMMARY
//==============================

function updateSummary(){

    let totalItems = stockItems.length;

    let totalStock = 0;

    let lowStock = 0;

    let outStock = 0;


    stockItems.forEach(item=>{

        totalStock += Number(item.stock);


        if(item.stock <= 10 && item.stock > 0){

            lowStock++;

        }


        if(item.stock <= 0){

            outStock++;

        }

    });


    if(document.getElementById("totalItems"))
    document.getElementById("totalItems").innerText = totalItems;


    if(document.getElementById("totalStock"))
    document.getElementById("totalStock").innerText = totalStock;


    if(document.getElementById("lowStock"))
    document.getElementById("lowStock").innerText = lowStock;


    if(document.getElementById("outStock"))
    document.getElementById("outStock").innerText = outStock;

}



//==============================
// STOCK REPORT
//==============================

function showStockReport(){

let table=document.getElementById("reportTable");

table.innerHTML="";


stockItems.forEach(item=>{


table.innerHTML +=`

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

function showPurchaseReport(){

let table=document.getElementById("reportTable");

table.innerHTML="";


purchaseList.forEach(item=>{


table.innerHTML +=`

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

function showIssueReport(){

let table=document.getElementById("reportTable");

table.innerHTML="";


issueList.forEach(item=>{


table.innerHTML +=`

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

function searchReport(){

let value =
document.getElementById("searchReport")
.value
.toLowerCase();


let rows =
document.querySelectorAll("#reportTable tr");


rows.forEach(row=>{


row.style.display =

row.innerText.toLowerCase().includes(value)

?

""

:

"none";


});


}



//==============================
// FILTER REPORT
//==============================

function filterReport(){

alert("Date Filter Coming Next Version");

}



//==============================
// EXCEL DOWNLOAD
//==============================

function downloadExcel(){

let table=document.querySelector("table");

let wb=XLSX.utils.table_to_book(table);

XLSX.writeFile(
wb,
"SH_Inventory_Report.xlsx"
);

}



//==============================
// PDF DOWNLOAD
//==============================

async function downloadPDF(){

const {jsPDF}=window.jspdf;


const pdf=new jsPDF(
"p",
"mm",
"a4"
);


const canvas =
await html2canvas(
document.querySelector(".main")
);


const img =
canvas.toDataURL("image/png");


const width=190;

const height=
(canvas.height*width)
/
canvas.width;


pdf.addImage(
img,
"PNG",
10,
10,
width,
height
);


pdf.save(
"SH_Inventory_Report.pdf"
);


}
