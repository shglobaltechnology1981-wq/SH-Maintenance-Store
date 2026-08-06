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


    showUser();


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




    //==============================
    // TOTAL ITEMS
    //==============================

    let totalItems =
    document.getElementById("totalItems");


    if(totalItems){

        totalItems.innerHTML =
        stockItems.length;

    }




    //==============================
    // TOTAL STOCK
    //==============================

    let totalStock = 0;


    stockItems.forEach(item => {


        totalStock += Number(item.stock);


    });



    let stockBox =
    document.getElementById("totalStock");


    if(stockBox){

        stockBox.innerHTML =
        totalStock;

    }





    //==============================
    // TOTAL PURCHASE
    //==============================

    let totalPurchase = 0;


    purchaseList.forEach(item => {


        totalPurchase += Number(item.qty);


    });



    let purchaseBox =
    document.getElementById("totalPurchase");


    if(purchaseBox){

        purchaseBox.innerHTML =
        totalPurchase;

    }





    //==============================
    // TOTAL ISSUE
    //==============================

    let totalIssue = 0;


    issueList.forEach(item => {


        totalIssue += Number(item.qty);


    });



    let issueBox =
    document.getElementById("totalIssue");


    if(issueBox){

        issueBox.innerHTML =
        totalIssue;

    }





    //==============================
    // PENDING REQUISITION
    //==============================

    let requisitionList =

JSON.parse(
localStorage.getItem("requisition")
) || [];



    let pending = 0;



    requisitionList.forEach(item=>{


        if(item.status=="Pending"){


            pending++;


        }


    });



    let reqBox =
    document.getElementById("pendingReq");


    if(reqBox){


        reqBox.innerHTML =
        pending;


    }



}






//==============================
// SHOW LOGIN USER
//==============================

function showUser(){


    let user =

    JSON.parse(
    localStorage.getItem("loginUser")
    );



    let userBox =

    document.getElementById("loginUser");



    if(user && userBox){


        userBox.innerHTML =
        user.name;


    }


}






//==============================
// DATE
//==============================

function showDate() {


    let today =
    new Date();



    let dateBox =
    document.getElementById("todayDate");



    if(dateBox){


        dateBox.innerHTML =
        today.toLocaleDateString();


    }


}






//==============================
// CLOCK
//==============================

function showClock() {


    let now =
    new Date();



    let clockBox =
    document.getElementById("clock");



    if(clockBox){


        clockBox.innerHTML =
        now.toLocaleTimeString();


    }


}






//==============================
// STOCK CHART
//==============================

function loadChart() {


    let stockItems =

    JSON.parse(
    localStorage.getItem("stockItems")
    ) || [];



    let purchaseList =

    JSON.parse(
    localStorage.getItem("purchaseList")
    ) || [];



    let issueList =

    JSON.parse(
    localStorage.getItem("issueList")
    ) || [];




    let totalStock = 0;



    stockItems.forEach(item=>{


        totalStock += Number(item.stock);


    });





    let ctx =

    document.getElementById("stockChart");



    if(!ctx){

        return;

    }




    new Chart(ctx,{


        type:"bar",



        data:{


            labels:[

                "Stock",

                "Purchase",

                "Issue"

            ],



            datasets:[{


                label:"Quantity",



                data:[


                    totalStock,


                    purchaseList.reduce(

                    (sum,item)=>

                    sum + Number(item.qty),

                    0

                    ),



                    issueList.reduce(

                    (sum,item)=>

                    sum + Number(item.qty),

                    0

                    )


                ]


            }]


        },



        options:{


            responsive:true,



            plugins:{


                legend:{


                    display:false


                }


            }


        }


    });



}






//==============================
// LOGOUT
//==============================

function logout(){


    localStorage.removeItem("loginUser");


    window.location.href="login.html";


}
