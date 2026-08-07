/*==================================================
SH Maintenance Store
requisition.js
==================================================*/


// LOGIN USER

let user =

JSON.parse(
localStorage.getItem("loginUser")
);



if(!user){

window.location.href="login.html";

}




// SHOW USER


document.getElementById("userName").innerHTML =

user.name || "";



document.getElementById("department").innerHTML =

user.department || "";




// ITEMS ARRAY

let items=[];




// ADD ITEM FUNCTION

function addItem(){


let name =

document
.getElementById("itemName")
.value
.trim();



let qty =

Number(

document
.getElementById("qty")
.value

);





if(name==""){


alert("Enter Item Name");

return;

}



if(qty<=0){


alert("Enter Quantity");

return;

}





items.push({

name:name,

qty:qty,

status:"Pending"

});





showItems();





document.getElementById("itemName").value="";

document.getElementById("qty").value="";



}





// SHOW TABLE


function showItems(){


let table =

document.getElementById("reqTable");



table.innerHTML="";




items.forEach(function(item,index){



table.innerHTML += `


<tr>


<td>

${index+1}

</td>


<td>

${item.name}

</td>


<td>

${item.qty}

</td>


<td>

<span class="pending">

${item.status}

</span>

</td>


</tr>


`;



});



}





// SAVE REQUISITION


function saveRequisition(){


if(items.length==0){


alert("Add Item First");

return;

}




let list =

JSON.parse(

localStorage.getItem("requisitionList")

)

|| [];





let requisition={


reqNo:

"REQ-"+Date.now(),


userName:

user.name,


department:

user.department,


date:

new Date()
.toLocaleDateString(),


status:

"Pending",


items:

items



};





list.push(requisition);





localStorage.setItem(

"requisitionList",

JSON.stringify(list)

);





alert(

"Requisition Saved Successfully"

);




items=[];


showItems();



}





// LOGOUT


function logout(){


localStorage.removeItem("loginUser");


window.location.href="login.html";


}
