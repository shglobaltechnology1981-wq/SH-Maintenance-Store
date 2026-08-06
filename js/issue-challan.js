let issuedItem =
JSON.parse(localStorage.getItem("lastIssue")) || {};



document.getElementById("issueNo").innerHTML =
issuedItem.issueNo || "";



document.getElementById("issueDate").innerHTML =
issuedItem.date || "";



document.getElementById("department").innerHTML =
issuedItem.department || "";




let html="";


if(issuedItem.items){


issuedItem.items.forEach((x,i)=>{


html+=`

<tr>

<td>${i+1}</td>

<td>${x.name}</td>

<td>${x.qty}</td>

</tr>

`;

});


}


document.getElementById("challanTable").innerHTML=html;
