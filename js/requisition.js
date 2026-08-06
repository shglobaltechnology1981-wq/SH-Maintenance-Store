/*==================================================
SH Maintenance Store
USER REQUISITION SYSTEM
requisition.js
==================================================*/


//==============================
// LOAD LOGIN USER
//==============================

let loginUser =

JSON.parse(

localStorage.getItem("loginUser")

) || null;




let requisitionList =

JSON.parse(

localStorage.getItem("requisitionList")

) || [];





//==============================
// PAGE LOAD
//==============================

window.onload = function(){



    if(!loginUser){


        alert("Please Login First");


        window.location.href="login.html";


        return;


    }




    let userBox =

    document.getElementById("userName");



    if(userBox){


        userBox.innerHTML =

        loginUser.name +

        " (" +

        loginUser.department +

        ")";


    }




    loadRequisition();



};







//==============================
// SAVE REQUISITION
//==============================

function saveRequisition(){



    let itemName =

    document.getElementById("itemName").value.trim();




    let qty =

    document.getElementById("qty").value;




    let purpose =

    document.getElementById("purpose").value.trim();





    if(itemName==="" || qty===""){


        alert(
        "Please Enter Item & Quantity"
        );


        return;


    }






    let req = {


        reqNo:

        "REQ-" + Date.now(),



        userId:

        loginUser.id,



        userName:

        loginUser.name,



        department:

        loginUser.department,



        itemName:

        itemName,



        qty:

        Number(qty),



        purpose:

        purpose,



        date:

        new Date().toLocaleDateString(),



        status:

        "Pending"


    };







    requisitionList.push(req);






    localStorage.setItem(

    "requisitionList",

    JSON.stringify(requisitionList)

    );







    alert(
    "Requisition Submitted Successfully"
    );







    document.getElementById("itemName").value="";


    document.getElementById("qty").value="";


    document.getElementById("purpose").value="";





    loadRequisition();



}







//==============================
// USER REQUISITION HISTORY
//==============================

function loadRequisition(){



    let table =

    document.getElementById("reqTable");



    if(!table){

        return;

    }





    table.innerHTML="";






    requisitionList.forEach(item=>{





        if(item.userId === loginUser.id){





            let statusClass="";



            if(item.status==="Pending"){


                statusClass="pending";


            }

            else if(item.status==="Issued"){


                statusClass="issued";


            }

            else if(item.status==="Rejected"){


                statusClass="rejected";


            }






            table.innerHTML += `



<tr>



<td>

${item.reqNo}

</td>



<td>

${item.itemName}

</td>



<td>

${item.qty}

</td>



<td>

${item.date}

</td>



<td>

<span class="${statusClass}">

${item.status}

</span>

</td>



</tr>



`;



        }



    });




}
