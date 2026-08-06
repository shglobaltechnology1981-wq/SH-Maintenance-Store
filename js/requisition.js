let user =
JSON.parse(localStorage.getItem("loginUser"));


if(!user){

window.location.href="login.html";

}



document.getElementById("userName").innerHTML =
user.name;


document.getElementById("department").innerHTML =
user.department;



let items=[];



function addItem(){


let name =
document.getElementById("itemName").value;


let qty =
document.getElementById("qty").value;



items.push({

name:name,
qty:qty,
status:"Pending"

});


showItems();


}



function showItems(){


let html="";


items.forEach((x,i)=>{


html+=`

<tr>

<td>${i+1}</td>

<td>${x.name}</td>

<td>${x.qty}</td>

<td class="pending">
${x.status}
</td>

</tr>


`;


});


document.getElementById("reqTable").innerHTML=html;


}



function saveRequisition(){


localStorage.setItem(

"requisition",

JSON.stringify(items)

);


alert("Requisition Saved");


}



function logout(){

localStorage.clear();

window.location.href="login.html";


}
