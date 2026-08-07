alert("Stock JS Loaded");
/*==================================================
SH Maintenance Store
stock.js
==================================================*/


let stockItems =

JSON.parse(

localStorage.getItem("stockItems")

) || [];





window.onload=function(){

loadStock();

showUser();

};





//==============================================
// ADD STOCK ITEM
//==============================================


function addStockItem(){


let code =

document.getElementById("itemCode").value.trim();



let name =

document.getElementById("itemName").value.trim();



let category =

document.getElementById("category").value.trim();



let unit =

document.getElementById("unit").value.trim();



let qty =

Number(
document.getElementById("stockQty").value
);



let min =

Number(
document.getElementById("minStock").value
);



let imageInput =

document.getElementById("itemImage");



if(
code=="" ||
name=="" ||
qty<=0
){


alert("Please fill required fields");

return;


}





let image="";



// Image Save

if(imageInput.files.length>0){


let reader=new FileReader();


reader.onload=function(e){


image=e.target.result;



saveStock(

code,
name,
category,
unit,
qty,
min,
image

);


};


reader.readAsDataURL(

imageInput.files[0]

);



}

else{


saveStock(

code,
name,
category,
unit,
qty,
min,
image

);


}



}







//==============================================
// SAVE STOCK
//==============================================


function saveStock(

code,
name,
category,
unit,
qty,
min,
image

){



stockItems.push({

code:code,

name:name,

category:category,

unit:unit,

stock:qty,

minStock:min,

image:image


});




localStorage.setItem(

"stockItems",

JSON.stringify(stockItems)

);



clearForm();


loadStock();


alert(

"Stock Item Added Successfully"

);



}







//==============================================
// LOAD STOCK TABLE
//==============================================


function loadStock(){


let table =

document.getElementById("stockTable");



if(!table)return;



table.innerHTML="";



let low=0;



stockItems.forEach(function(item,index){



let status="";



if(

Number(item.stock)

<=

Number(item.minStock)

){


status=

`
<span class="stock-low">

Low Stock

</span>
`;


low++;


}

else{


status=

`
<span class="stock-ok">

Available

</span>
`;



}







table.innerHTML += `


<tr>


<td>


${
item.image

?

`

<img src="${item.image}"

class="stock-image">

`

:

""

}


</td>



<td>

${item.code}

</td>



<td>

${item.name}

</td>



<td>

${item.category}

</td>



<td>

${item.stock}

</td>



<td>

${item.unit}

</td>



<td>

${status}

</td>




<td>



<button

class="action-btn delete-btn"

onclick="deleteStock(${index})">

<i class="fa fa-trash"></i>

</button>



</td>



</tr>


`;



});





document.getElementById("totalItems").innerHTML=

stockItems.length;



let total=0;


stockItems.forEach(x=>{


total += Number(x.stock);


});



document.getElementById("totalStock").innerHTML=

total;



document.getElementById("lowStock").innerHTML=

low;



}









//==============================================
// DELETE STOCK
//==============================================


function deleteStock(index){



if(

!confirm(
"Delete this item?"
)

){

return;

}




stockItems.splice(

index,

1

);



localStorage.setItem(

"stockItems",

JSON.stringify(stockItems)

);



loadStock();



}








//==============================================
// SEARCH STOCK
//==============================================


function searchStock(){



let key =

document

.getElementById("searchStock")

.value

.toLowerCase();





document

.querySelectorAll(

"#stockTable tr"

)

.forEach(row=>{


if(

row.innerText

.toLowerCase()

.includes(key)

){


row.style.display="";


}

else{


row.style.display="none";


}



});



}








//==============================================
// CLEAR FORM
//==============================================


function clearForm(){


document.getElementById("itemCode").value="";

document.getElementById("itemName").value="";

document.getElementById("category").value="";

document.getElementById("unit").value="";

document.getElementById("stockQty").value="";

document.getElementById("minStock").value="";

document.getElementById("itemImage").value="";


}







//==============================================
// SHOW USER
//==============================================


function showUser(){


let user =

JSON.parse(

localStorage.getItem("loginUser")

);



let box=

document.getElementById("loginUser");



if(user && box){


box.innerHTML=user.name;


}


}
let qty =

Number(
document.getElementById("stockQty").value
);



let min =

Number(
document.getElementById("minStock").value
);



let imageInput =

document.getElementById("itemImage");



if(
code=="" ||
name=="" ||
qty<=0
){


alert("Please fill required fields");

return;


}





let image="";



// Image Save

if(imageInput.files.length>0){


let reader=new FileReader();


reader.onload=function(e){


image=e.target.result;



saveStock(

code,
name,
category,
unit,
qty,
min,
image

);


};


reader.readAsDataURL(

imageInput.files[0]

);



}

else{


saveStock(

code,
name,
category,
unit,
qty,
min,
image

);


}



}







//==============================================
// SAVE STOCK
//==============================================


function saveStock(

code,
name,
category,
unit,
qty,
min,
image

){



stockItems.push({

code:code,

name:name,

category:category,

unit:unit,

stock:qty,

minStock:min,

image:image


});




localStorage.setItem(

"stockItems",

JSON.stringify(stockItems)

);



clearForm();


loadStock();


alert(

"Stock Item Added Successfully"

);



}







//==============================================
// LOAD STOCK TABLE
//==============================================


function loadStock(){


let table =

document.getElementById("stockTable");



if(!table)return;



table.innerHTML="";



let low=0;



stockItems.forEach(function(item,index){



let status="";



if(

Number(item.stock)

<=

Number(item.minStock)

){


status=

`
<span class="stock-low">

Low Stock

</span>
`;


low++;


}

else{


status=

`
<span class="stock-ok">

Available

</span>
`;



}







table.innerHTML += `


<tr>


<td>


${
item.image

?

`

<img src="${item.image}"

class="stock-image">

`

:

""

}


</td>



<td>

${item.code}

</td>



<td>

${item.name}

</td>



<td>

${item.category}

</td>



<td>

${item.stock}

</td>



<td>

${item.unit}

</td>



<td>

${status}

</td>




<td>



<button

class="action-btn delete-btn"

onclick="deleteStock(${index})">

<i class="fa fa-trash"></i>

</button>



</td>



</tr>


`;



});





document.getElementById("totalItems").innerHTML=

stockItems.length;



let total=0;


stockItems.forEach(x=>{


total += Number(x.stock);


});



document.getElementById("totalStock").innerHTML=

total;



document.getElementById("lowStock").innerHTML=

low;



}









//==============================================
// DELETE STOCK
//==============================================


function deleteStock(index){



if(

!confirm(
"Delete this item?"
)

){

return;

}




stockItems.splice(

index,

1

);



localStorage.setItem(

"stockItems",

JSON.stringify(stockItems)

);



loadStock();



}








//==============================================
// SEARCH STOCK
//==============================================


function searchStock(){



let key =

document

.getElementById("searchStock")

.value

.toLowerCase();





document

.querySelectorAll(

"#stockTable tr"

)

.forEach(row=>{


if(

row.innerText

.toLowerCase()

.includes(key)

){


row.style.display="";


}

else{


row.style.display="none";


}



});



}








//==============================================
// CLEAR FORM
//==============================================


function clearForm(){


document.getElementById("itemCode").value="";

document.getElementById("itemName").value="";

document.getElementById("category").value="";

document.getElementById("unit").value="";

document.getElementById("stockQty").value="";

document.getElementById("minStock").value="";

document.getElementById("itemImage").value="";


}







//==============================================
// SHOW USER
//==============================================


function showUser(){


let user =

JSON.parse(

localStorage.getItem("loginUser")

);



let box=

document.getElementById("loginUser");



if(user && box){


box.innerHTML=user.name;


}


}
    let stock =
    Number(document.getElementById("itemStock").value);

    let unit =
    document.getElementById("itemUnit").value.trim();



    if(code==="" ||
       name==="" ||
       stock<0 ||
       unit===""){

        alert("Please fill all fields.");

        return;

    }



    if(editIndex==-1){

        let exist =
        stockItems.find(item=>item.code===code);

        if(exist){

            alert("Item Code already exists.");

            return;

        }

        stockItems.push({

            code:code,

            name:name,

            category:category,

            stock:stock,

            unit:unit

        });

    }

    else{

        stockItems[editIndex]={

            code:code,

            name:name,

            category:category,

            stock:stock,

            unit:unit

        };

        editIndex=-1;

    }



    localStorage.setItem(

        "stockItems",

        JSON.stringify(stockItems)

    );



    clearForm();

    loadStock();

}



//==============================
// LOAD TABLE
//==============================

function loadStock(){

    let table =
    document.getElementById("stockTable");

    table.innerHTML="";



    stockItems.forEach((item,index)=>{

        let status="";

        let css="";



        if(item.stock<=0){

            status="Out of Stock";

            css="out-stock";

        }

        else if(item.stock<=10){

            status="Low Stock";

            css="low-stock";

        }

        else{

            status="Available";

            css="in-stock";

        }



        table.innerHTML += `

<tr>

<td>${item.code}</td>

<td>${item.name}</td>

<td>${item.category}</td>

<td>${item.stock}</td>

<td>${item.unit}</td>

<td>

<span class="status ${css}">

${status}

</span>

</td>

<td>

<button
class="action-btn edit-btn"
onclick="editItem(${index})">

<i class="fa fa-edit"></i>

</button>

<button
class="action-btn delete-btn"
onclick="deleteItem(${index})">

<i class="fa fa-trash"></i>

</button>

</td>

</tr>

`;

    });

}

//==============================
// EDIT ITEM
//==============================

function editItem(index){

    editIndex = index;

    let item = stockItems[index];

    document.getElementById("itemCode").value = item.code;
    document.getElementById("itemName").value = item.name;
    document.getElementById("itemCategory").value = item.category;
    document.getElementById("itemStock").value = item.stock;
    document.getElementById("itemUnit").value = item.unit;

}



//==============================
// DELETE ITEM
//==============================

function deleteItem(index){

    if(confirm("Delete this item?")){

        stockItems.splice(index,1);

        localStorage.setItem(

            "stockItems",

            JSON.stringify(stockItems)

        );

        loadStock();

    }

}



//==============================
// SEARCH ITEM
//==============================

function searchItem(){

    let keyword =

    document.getElementById("searchItem")

    .value

    .toLowerCase();

    let rows =

    document.querySelectorAll("#stockTable tr");

    rows.forEach(row=>{

        if(row.innerText.toLowerCase().includes(keyword)){

            row.style.display="";

        }

        else{

            row.style.display="none";

        }

    });

}



//==============================
// CLEAR FORM
//==============================

function clearForm(){

    document.getElementById("itemCode").value="";

    document.getElementById("itemName").value="";

    document.getElementById("itemCategory").selectedIndex=0;

    document.getElementById("itemStock").value="";

    document.getElementById("itemUnit").value="";

}



//==============================
// REFRESH TABLE
//==============================

function refreshStock(){

    loadStock();

}

