/*=========================================
SH Maintenance Store
Stock Module
=========================================*/

let stockItems = [

{
code:"SP001",
name:"Bearing 6205",
category:"Mechanical",
stock:50,
unit:"PCS"
}

];

// Load

window.onload=function(){

loadStock();

};

// Load Table

function loadStock(){

let table=document.getElementById("stockTable");

if(!table)return;

table.innerHTML="";

stockItems.forEach((item,index)=>{

let status=item.stock<=10?

"<span class='low'>LOW</span>":

"<span class='available'>OK</span>";

table.innerHTML+=`

<tr>

<td>${item.code}</td>

<td>${item.name}</td>

<td>${item.category}</td>

<td>${item.stock}</td>

<td>${item.unit}</td>

<td>${status}</td>

<td>

<button onclick="editItem(${index})">

Edit

</button>

<button onclick="deleteItem(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

// Add

function addItem(){

alert("Part-11 এ Database Save যোগ হবে");

}

// Edit

function editItem(index){

alert("Edit : "+stockItems[index].name);

}

// Delete

function deleteItem(index){

if(confirm("Delete Item?")){

stockItems.splice(index,1);

loadStock();

}

}

// Search

function searchItem(){

let name=prompt("Item Name");

alert("Search : "+name);

}
