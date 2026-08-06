/*==================================================
SH STORE
Purchase Management
purchase.js
==================================================*/


let purchaseList =
JSON.parse(localStorage.getItem("purchaseList")) || [];


let stockItems =
JSON.parse(localStorage.getItem("stockItems")) || [];




//==============================
// PAGE LOAD
//==============================

window.onload=function(){

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
document.getElementById("supplierName").value.trim();



let date =
document.getElementById("purchaseDate").value;



if(code==="" || qty<=0 || supplier===""){


alert("Please fill all information");


return;

}



let found=false;



for(let i=0;i<stockItems.length;i++){


if(stockItems[i].code===code){


stockItems[i].stock =
Number(stockItems[i].stock)+qty;



purchaseList.push({


code:stockItems[i].code,


name:stockItems[i].name,


qty:qty,


supplier:supplier,


date:date || new Date().toLocaleDateString()



});



found=true;


break;


}



}




if(!found){


alert("Item Code Not Found");


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



clearPurchase();


loadPurchase();


alert("Purchase Saved Successfully");


}








//==============================
// LOAD PURCHASE
//==============================

function loadPurchase(){


let table =
document.getElementById("purchaseTable");



if(!table) return;



table.innerHTML="";



purchaseList.forEach((item,index)=>{



table.innerHTML += `


<tr>


<td>${item.code}</td>


<td>${item.name}</td>


<td>${item.qty}</td>


<td>${item.supplier || "-"}</td>


<td>${item.date}</td>



<td>


<button onclick="deletePurchase(${index})">

Delete

</button>


</td>


</tr>


`;



});



}








//==============================
// DELETE PURCHASE
//==============================

function deletePurchase(index){


if(confirm("Delete Purchase?")){


purchaseList.splice(index,1);



localStorage.setItem(

"purchaseList",

JSON.stringify(purchaseList)

);



loadPurchase();


}


}







//==============================
// CLEAR FORM
//==============================

function clearPurchase(){


document.getElementById("purchaseCode").value="";


document.getElementById("purchaseQty").value="";


document.getElementById("supplierName").value="";


document.getElementById("purchaseDate").value="";


}
