/*==================================================
SH Maintenance Store
purchase.js
==================================================*/

let purchaseList =
JSON.parse(localStorage.getItem("purchaseList")) || [];

let stockItems =
JSON.parse(localStorage.getItem("stockItems")) || [];


//==============================
// PAGE LOAD
//==============================

window.onload = function(){

    loadPurchase();

};


//==============================
// SAVE PURCHASE
//==============================

function purchaseItem(){

    let code =
    document.getElementById("purchaseCode").value.trim();

    let qty =
    Number(document.getElementById("purchaseQty").value);

    let supplier =
    document.getElementById("supplier").value.trim();


    if(code==="" || qty<=0 || supplier===""){

        alert("Please fill all fields.");

        return;

    }


    let found = false;


    stockItems.forEach(item=>{

        if(item.code===code){

            item.stock += qty;

            purchaseList.push({

                code:item.code,

                name:item.name,

                qty:qty,

                supplier:supplier,

                date:new Date().toLocaleDateString()

            });

            found = true;

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

        "purchaseList",

        JSON.stringify(purchaseList)

    );


    clearForm();

    loadPurchase();

    alert("Purchase Saved Successfully.");

}

//==================================================
// LOAD PURCHASE TABLE
//==================================================

function loadPurchase(){

    let table =
    document.getElementById("purchaseTable");

    table.innerHTML = "";

    purchaseList.forEach((item,index)=>{

        table.innerHTML += `

<tr>

<td>${item.code}</td>

<td>${item.name}</td>

<td>${item.qty}</td>

<td>${item.supplier}</td>

<td>${item.date}</td>

<td>

<button
class="action-btn delete-btn"
onclick="deletePurchase(${index})">

<i class="fa fa-trash"></i>

</button>

</td>

</tr>

`;

    });

}



//==================================================
// DELETE PURCHASE
//==================================================

function deletePurchase(index){

    if(!confirm("Delete this purchase record?")){

        return;

    }

    purchaseList.splice(index,1);

    localStorage.setItem(

        "purchaseList",

        JSON.stringify(purchaseList)

    );

    loadPurchase();

}



//==================================================
// SEARCH PURCHASE
//==================================================

function searchPurchase(){

    let keyword =
    document.getElementById("searchPurchase")
    .value
    .toLowerCase();

    let rows =
    document.querySelectorAll("#purchaseTable tr");

    rows.forEach(row=>{

        if(row.innerText.toLowerCase().includes(keyword)){

            row.style.display="";

        }else{

            row.style.display="none";

        }

    });

}



//==================================================
// CLEAR FORM
//==================================================

function clearForm(){

    document.getElementById("purchaseCode").value="";

    document.getElementById("purchaseQty").value="";

    document.getElementById("supplier").value="";

}



//==================================================
// REFRESH
//==================================================

function refreshPurchase(){

    loadPurchase();

}
