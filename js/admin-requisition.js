//==================================================
// APPROVE REQUISITION WITH STOCK DEDUCTION
//==================================================

function approveRequisition(index){


    let requisitionList =

    JSON.parse(
        localStorage.getItem("requisitionList")
    ) || [];



    let stockItems =

    JSON.parse(
        localStorage.getItem("stockItems")
    ) || [];



    let req =
    requisitionList[index];



    if(!req){

        alert("Requisition Not Found");

        return;

    }



    if(req.status === "Approved"){

        alert("Already Approved");

        return;

    }



    if(
        !confirm(
            "Approve this requisition and deduct stock?"
        )
    ){

        return;

    }




    let items =
    req.items || [];



    let stockError = false;



    //==============================
    // CHECK STOCK
    //==============================

    items.forEach(reqItem=>{


        let stockItem =

        stockItems.find(

            stock =>

            stock.name === reqItem.name

        );



        if(!stockItem){

            alert(
            reqItem.name +
            " not found in stock"
            );


            stockError = true;


        }

        else if(
            Number(stockItem.stock)
            <
            Number(reqItem.qty)
        ){


            alert(

            "Insufficient Stock : "

            +

            reqItem.name

            );


            stockError = true;


        }


    });



    if(stockError){

        return;

    }





    //==============================
    // DEDUCT STOCK
    //==============================


    items.forEach(reqItem=>{


        stockItems.forEach(stock=>{


            if(
                stock.name === reqItem.name
            ){


                stock.stock -=

                Number(reqItem.qty);


            }


        });


    });





    //==============================
    // UPDATE STATUS
    //==============================


    req.status =
    "Approved";


    req.approvedDate =
    new Date()
    .toLocaleDateString();




    req.approvedBy =

    JSON.parse(
        localStorage.getItem("loginUser")
    ).name;





    //==============================
    // SAVE DATA
    //==============================


    requisitionList[index] = req;



    localStorage.setItem(

        "requisitionList",

        JSON.stringify(
            requisitionList
        )

    );



    localStorage.setItem(

        "stockItems",

        JSON.stringify(
            stockItems
        )

    );




    loadRequisitions();

    loadSummary();



    alert(

    "Requisition Approved Successfully"

    );


} 
