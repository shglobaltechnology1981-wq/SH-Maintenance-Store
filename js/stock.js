/*==================================================
SH STORE
Stock Management
stock.js
==================================================*/


let stockItems =
JSON.parse(localStorage.getItem("stockItems")) || [];




//==============================
// PAGE LOAD
//==============================

window.onload=function(){

loadStock();

};





//==============================
// ADD ITEM
//==============================

function addItem(){



let code =
document.getElementById("itemCode").value.trim();



let name =
document.getElementById("itemName").value.trim();



let category =
document.getElementById("itemCategory").value;



let stock =
Number(document.getElementById("itemStock").value);



let unit =
document.getElementById("itemUnit").value.trim();





if(code==="" || name==="" || stock<=0 || unit===""){


alert("Please fill all information");


return;


}




// DUPLICATE CHECK


let exist =
stockItems.find(item=>item.code===code);



if(exist){


alert("Item Code Already Exists");


return;


}




stockItems.push({


code:code,

name:name,

category:category,

stock:stock,

unit:unit


});





localStorage.setItem(

"stockItems",

JSON.stringify(stockItems)

);





clearForm();


loadStock();



alert("Item Added Successfully");



}





//==============================
// LOAD STOCK TABLE
//==============================


function loadStock(){


let table =
document.getElementById("stockTable");



if(!table) return;



table.innerHTML="";



stockItems.forEach((item,index)=>{



let status="Available";



if(item.stock<=10 && item.stock>0){

status="Low Stock";

}


if(item.stock<=0){

status="Out Of Stock";

}





table.innerHTML +=`


<tr>


<td>${item.code}</td>


<td>${item.name}</td>


<td>${item.category}</td>


<td>${item.stock}</td>


<td>${item.unit}</td>


<td>${status}</td>


<td>

<button onclick="deleteItem(${index})">

Delete

</button>

</td>


</tr>


`;



});



}





//==============================
// SEARCH ITEM
//==============================


function searchItem(){


let search =

document.getElementById("searchItem").value.toLowerCase();



let rows =
document.querySelectorAll("#stockTable tr");



rows.forEach(row=>{


let text=row.innerText.toLowerCase();



if(text.includes(search)){


row.style.display="";


}

else{


row.style.display="none";


}



});



}






//==============================
// DELETE ITEM
//==============================


function deleteItem(index){


if(confirm("Delete this Item?")){


stockItems.splice(index,1);



localStorage.setItem(

"stockItems",

JSON.stringify(stockItems)

);



loadStock();


}



}







//==============================
// CLEAR FORM
//==============================


function clearForm(){


document.getElementById("itemCode").value="";


document.getElementById("itemName").value="";


document.getElementById("itemStock").value="";


document.getElementById("itemUnit").value="";


}
