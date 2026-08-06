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

window.onload = function(){

    loadSummary();

    loadReport();

};


//==============================
// SUMMARY
//==============================

function loadSummary(){

    document.getElementById("rTotalItems").innerHTML =
    stockItems.length;


    let totalStock = 0;

    stockItems.forEach(item=>{

        totalStock += Number(item.stock);

    });

    document.getElementById("rTotalStock").innerHTML =
    totalStock;


    let totalPurchase = 0;

    purchaseList.forEach(item=>{

        totalPurchase += Number(item.qty);

    });

    document.getElementById("rTotalPurchase").innerHTML =
    totalPurchase;


    let totalIssue = 0;

    issueList.forEach(item=>{

        totalIssue += Number(item.qty);

    });

    document.getElementById("rTotalIssue").innerHTML =
    totalIssue;

}

//==============================
// SHOW USER
//==============================

function showUser(){

let user =
JSON.parse(localStorage.getItem("loginUser"));


let box =
document.getElementById("loginUser");


if(user && box){

box.innerHTML =
user.name;

}

}

function showUser(){

let user =
JSON.parse(localStorage.getItem("loginUser"));


let box =
document.getElementById("loginUser");


if(user && box){

box.innerHTML =
user.name;

}

}

//==============================
// LOAD REPORT TABLE
//==============================

function loadReport(){

    let table =
    document.getElementById("reportTable");

    table.innerHTML = "";

    stockItems.forEach(item=>{

        let status = "";

        let css = "";

        if(item.stock<=0){

            status="Out of Stock";

            css="out-stock";

        }

        else if(item.stock<=10){

            status="Low Stock";

            css="low-stock";

        }

        else{

            status="Available";

            css="in-stock";

        }

        table.innerHTML += `

<tr>

<td>${item.code}</td>

<td>${item.name}</td>

<td>${item.category}</td>

<td>${item.stock}</td>

<td>${item.unit}</td>

<td>

<span class="status ${css}">

${status}

</span>

</td>

</tr>

`;

    });

}
//==================================================
// SEARCH REPORT
//==================================================

function searchReport(){

    let keyword =

    document.getElementById("searchReport")
    .value
    .toLowerCase();


    let rows =

    document.querySelectorAll("#reportTable tr");


    rows.forEach(row=>{


        if(row.innerText.toLowerCase().includes(keyword)){


            row.style.display="";


        }

        else{


            row.style.display="none";


        }


    });


}



//==================================================
// EXPORT CSV
//==================================================

function exportReport(){


    let csv = "Item Code,Item Name,Category,Stock,Unit\n";


    stockItems.forEach(item=>{


        csv +=

        item.code + "," +

        item.name + "," +

        item.category + "," +

        item.stock + "," +

        item.unit + "\n";


    });



    let blob = new Blob(

        [csv],

        {type:"text/csv"}

    );



    let url = URL.createObjectURL(blob);



    let a = document.createElement("a");


    a.href=url;


    a.download="Stock_Report.csv";


    a.click();


    URL.revokeObjectURL(url);


}



//==================================================
// REFRESH REPORT
//==================================================

function refreshReport(){

    loadSummary();

    loadReport();

}





//==================================================
// DOWNLOAD STOCK EXCEL
//==================================================

function exportExcel(){

    let data = [];


    data.push([
        "SH Maintenance Store - Stock Report"
    ]);


    data.push([
        "Report Date",
        new Date().toLocaleDateString()
    ]);


    data.push([]);


    data.push([
        "Total Items",
        stockItems.length
    ]);


    let totalStock = 0;


    stockItems.forEach(item=>{

        totalStock += Number(item.stock);

    });


    data.push([
        "Total Stock",
        totalStock
    ]);


    data.push([]);


    data.push([

        "Item Code",
        "Item Name",
        "Category",
        "Stock",
        "Unit",
        "Status"

    ]);



    stockItems.forEach(item=>{


        let status;


        if(Number(item.stock)<=0){

            status="Out of Stock";

        }
        else if(Number(item.stock)<=10){

            status="Low Stock";

        }
        else{

            status="Available";

        }



        data.push([

            item.code,

            item.name,

            item.category,

            item.stock,

            item.unit,

            status

        ]);


    });



    let ws =
    XLSX.utils.aoa_to_sheet(data);


    let wb =
    XLSX.utils.book_new();


    XLSX.utils.book_append_sheet(
        wb,
        ws,
        "Stock Report"
    );


    XLSX.writeFile(
        wb,
        "SH_Stock_Report.xlsx"
    );

}



//==================================================
// PRINT REPORT
//==================================================

function printReport(){

    window.print();

}



//==================================================
// PURCHASE EXCEL
//==================================================

function exportPurchaseExcel(){

    let data=[];


    data.push([

        "Item Code",
        "Item Name",
        "Quantity",
        "Supplier",
        "Date"

    ]);



    purchaseList.forEach(item=>{


        data.push([

            item.code,

            item.name,

            item.qty,

            item.supplier || "",

            item.date

        ]);


    });



    let ws =
    XLSX.utils.aoa_to_sheet(data);


    let wb =
    XLSX.utils.book_new();


    XLSX.utils.book_append_sheet(
        wb,
        ws,
        "Purchase Report"
    );


    XLSX.writeFile(
        wb,
        "SH_Purchase_Report.xlsx"
    );

}



//==================================================
// ISSUE EXCEL
//==================================================

function exportIssueExcel(){

    let data=[];


    data.push([

        "Item Code",
        "Item Name",
        "Quantity",
        "Issue To",
        "Date"

    ]);



    issueList.forEach(item=>{


        data.push([

            item.code,

            item.name,

            item.qty,

            item.issueTo,

            item.date

        ]);


    });



    let ws =
    XLSX.utils.aoa_to_sheet(data);


    let wb =
    XLSX.utils.book_new();


    XLSX.utils.book_append_sheet(
        wb,
        ws,
        "Issue Report"
    );


    XLSX.writeFile(
        wb,
        "SH_Issue_Report.xlsx"
    );

}



//==================================================
// LOW STOCK EXCEL
//==================================================

function exportLowStockExcel(){

    let data=[];


    data.push([

        "Item Code",
        "Item Name",
        "Category",
        "Current Stock",
        "Unit"

    ]);



    stockItems.forEach(item=>{


        if(Number(item.stock)<=10){


            data.push([

                item.code,

                item.name,

                item.category,

                item.stock,

                item.unit

            ]);

        }


    });



    let ws =
    XLSX.utils.aoa_to_sheet(data);


    let wb =
    XLSX.utils.book_new();


    XLSX.utils.book_append_sheet(
        wb,
        ws,
        "Low Stock"
    );


    XLSX.writeFile(
        wb,
        "SH_Low_Stock_Report.xlsx"
    );

}
//==================================================
// PRINT PURCHASE REPORT
//==================================================

function printPurchaseReport(){

    let win = window.open("");

    let html = `

    <html>

    <head>

    <title>Purchase Report</title>

    <style>

    table{

        width:100%;
        border-collapse:collapse;

    }

    th,td{

        border:1px solid #000;
        padding:8px;

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
    Purchase Report
    </h2>


    <table>

    <tr>

    <th>Item Code</th>
    <th>Item Name</th>
    <th>Quantity</th>
    <th>Supplier</th>
    <th>Date</th>

    </tr>

    `;


    purchaseList.forEach(item=>{

        html += `

        <tr>

        <td>${item.code}</td>

        <td>${item.name}</td>

        <td>${item.qty}</td>

        <td>${item.supplier || ""}</td>

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

    win.print();

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

    table{

        width:100%;
        border-collapse:collapse;

    }

    th,td{

        border:1px solid #000;
        padding:8px;

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

    <th>Item Code</th>
    <th>Item Name</th>
    <th>Quantity</th>
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

    win.print();

}

//==================================================
// PDF REPORT
//==================================================


function downloadPDF(){

if(!window.jspdf){

alert("PDF Library Not Loaded");

return;

}

const {jsPDF} =
window.jspdf;



let doc =
new jsPDF("p","mm","a4");



doc.setFontSize(16);


doc.text(

"SH GLOBAL TECHNOLOGY",

105,

15,

{align:"center"}

);



doc.setFontSize(12);


doc.text(

"Maintenance Store Stock Report",

105,

25,

{align:"center"}

);



doc.setFontSize(10);


doc.text(

"Date : "+
new Date().toLocaleDateString(),

15,

35

);





let rows=[];



let stock =

JSON.parse(

localStorage.getItem("stockItems")

)||[];





stock.forEach(item=>{


rows.push([


item.code,

item.name,

item.category,

item.stock,

item.unit


]);


});





doc.autoTable({

startY:45,


head:[

[
"Code",
"Item Name",
"Category",
"Stock",
"Unit"
]

],


body:rows,


theme:"grid"



});





doc.save(

"SH-Stock-Report.pdf"

);


}
