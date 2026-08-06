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
// PRINT
//==================================================

function printReport(){

    window.print();

}
