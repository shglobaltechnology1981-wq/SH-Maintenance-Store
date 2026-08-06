let data =
JSON.parse(localStorage.getItem("requisition")) || [];



function loadRequest(){


let html="";


data.forEach((x,i)=>{


html+=`

<tr>

<td>${i+1}</td>

<td>${x.user}</td>

<td>${x.department}</td>

<td>${x.item}</td>

<td>${x.qty}</td>

<td>${x.status}</td>


<td>


<button class="approve"
onclick="approveReq(${i})">

Approve

</button>


<button class="reject"
onclick="rejectReq(${i})">

Reject

</button>


</td>


</tr>

`;

});


document.getElementById("adminTable").innerHTML=html;


}





function approveReq(i){

data[i].status="Approved";

save();

}



function rejectReq(i){

data[i].status="Rejected";

save();

}




function save(){

localStorage.setItem(

"requisition",

JSON.stringify(data)

);


loadRequest();

}



loadRequest();
