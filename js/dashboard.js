/*==================================================
SH Maintenance Store
dashboard.js
==================================================*/

//==============================
// PAGE LOAD
//==============================

window.onload = function () {

    showDate();

    showClock();

    setInterval(showClock, 1000);

    loadDashboard();

    loadChart();

};


//==============================
// LOAD DASHBOARD
//==============================

function loadDashboard() {

    let stockItems =
        JSON.parse(localStorage.getItem("stockItems")) || [];

    let purchaseList =
        JSON.parse(localStorage.getItem("purchaseList")) || [];

    let issueList =
        JSON.parse(localStorage.getItem("issueList")) || [];



    // Total Items

    document.getElementById("totalItems").innerHTML =
        stockItems.length;



    // Total Stock

    let totalStock = 0;

    stockItems.forEach(item => {

        totalStock += Number(item.stock);

    });

    document.getElementById("totalStock").innerHTML =
        totalStock;



    // Total Purchase

    let totalPurchase = 0;

    purchaseList.forEach(item => {

        totalPurchase += Number(item.qty);

    });

    document.getElementById("totalPurchase").innerHTML =
        totalPurchase;



    // Total Issue

    let totalIssue = 0;

    issueList.forEach(item => {

        totalIssue += Number(item.qty);

    });

    document.getElementById("totalIssue").innerHTML =
        totalIssue;

}



//==============================
// DATE
//==============================

function showDate() {

    let today = new Date();

    document.getElementById("todayDate").innerHTML =
        today.toLocaleDateString();

}



//==============================
// CLOCK
//==============================

function showClock() {

    let now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString();

}



//==============================
// CHART
//==============================

function loadChart() {

    let stockItems =
        JSON.parse(localStorage.getItem("stockItems")) || [];

    let purchaseList =
        JSON.parse(localStorage.getItem("purchaseList")) || [];

    let issueList =
        JSON.parse(localStorage.getItem("issueList")) || [];

    let totalStock = 0;

    stockItems.forEach(item => {

        totalStock += Number(item.stock);

    });

    const ctx =
        document.getElementById("stockChart");

    if (!ctx) return;

    new Chart(ctx, {

        type: "bar",

        data: {

            labels: [

                "Stock",

                "Purchase",

                "Issue"

            ],

            datasets: [{

                label: "Quantity",

                data: [

                    totalStock,

                    purchaseList.length,

                    issueList.length

                ]

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    display: false

                }

            }

        }

    });

}
