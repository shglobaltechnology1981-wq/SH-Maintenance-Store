//==================================================
// SH Maintenance Store
// PURCHASE MANAGEMENT
//==================================================


let purchaseList =
JSON.parse(localStorage.getItem("purchaseList")) || [];


let stockItems =
JSON.parse(localStorage.getItem("stockItems")) || [];



// PAGE LOAD

window.onload=function(){

loadPurchase();


showUser();

};




// SHOW USER

function showUser(){

let user =
JSON.parse(localStorage.getItem("loginUser"));


if(user){

document.getElementById("loginUser").innerHTML =
user.name;

}

}



// PURCHASE ITEM

function purchaseItem(){


let code =
document.getElementById("purchaseCode").value.trim();


let qty =
Number(document.getElementById("purchaseQty").value);


let supplier =
document.getElementById("supplier").value.trim();



if(code=="" || qty<=0 || supplier==""){

alert("Please fill all fields");

return;

}



// FIND STOCK ITEM

let item =
stockItems.find(x=>x.code==code);



if(!item){

alert("Item code not found in Stock");

return;

}



// ADD STOCK

item.stock =
Number(item.stock) + qty;



// PURCHASE SAVE

purchaseList.push({

code:item.code,

name:item.name,

qty:qty,

supplier:supplier,

date:new Date().toLocaleDateString()

});




// SAVE

localStorage.setItem(

"stockItems",

JSON.stringify(stockItems)

);



localStorage.setItem(

"purchaseList",

JSON.stringify(purchaseList)

);



alert("Purchase Added Successfully");


clearPurchase();


loadPurchase();


}





// LOAD PURCHASE

function loadPurchase(){


let html="";


purchaseList.forEach((item,index)=>{


html+=`

<tr>

<td>${item.code}</td>

<td>${item.name}</td>

<td>${item.qty}</td>

<td>${item.supplier}</td>

<td>${item.date}</td>


<td>

<button onclick="deletePurchase(${index})">

Delete

</button>

</td>


</tr>

`;

});


document.getElementById("purchaseTable").innerHTML=html;


}





// DELETE

function deletePurchase(index){

purchaseList.splice(index,1);


localStorage.setItem(

"purchaseList",

JSON.stringify(purchaseList)

);


loadPurchase();

}





// SEARCH

function searchPurchase(){


let text =
document.getElementById("searchPurchase")
.value.toLowerCase();



let rows =
document.querySelectorAll("#purchaseTable tr");



rows.forEach(row=>{


if(row.innerText.toLowerCase().includes(text)){

row.style.display="";

}

else{

row.style.display="none";

}


});


}





// CLEAR

function clearPurchase(){

document.getElementById("purchaseCode").value="";

document.getElementById("purchaseQty").value="";

document.getElementById("supplier").value="";

}
