/*==================================================
SH Maintenance Store
purchase.js
==================================================*/

let purchaseList =
JSON.parse(localStorage.getItem("purchaseList")) || [];

let stockItems =
JSON.parse(localStorage.getItem("stockItems")) || [];

//==============================
// Page Load
//==============================

window.onload = function(){

    loadPurchase();

};

//==============================
// Save Purchase
//==============================

function purchaseItem(){

    let code =
    document.getElementById("purchaseCode").value.trim();

    let qty =
    Number(document.getElementById("purchaseQty").value);

    if(code==="" || qty<=0){

        alert("Please enter Item Code and Quantity");

        return;

    }

    let found=false;

    stockItems.forEach(item=>{

        if(item.code===code){

            item.stock += qty;

            purchaseList.push({

                code:item.code,

                name:item.name,

                qty:qty,

                date:new Date().toLocaleDateString()

            });

            found=true;

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

    document.getElementById("purchaseCode").value="";
    document.getElementById("purchaseQty").value="";

    loadPurchase();

    alert("Purchase Saved Successfully.");

}

//==============================
// Load Purchase Table
//==============================

function loadPurchase(){

    let table =
    document.getElementById("purchaseTable");

    table.innerHTML="";

    purchaseList.forEach(item=>{

        table.innerHTML += `

<tr>

<td>${item.code}</td>

<td>${item.name}</td>

<td>${item.qty}</td>

<td>${item.date}</td>

</tr>

`;

    });

}
