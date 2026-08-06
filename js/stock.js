/*==================================================
SH Maintenance Store
stock.js
==================================================*/

let stockItems =
JSON.parse(localStorage.getItem("stockItems")) || [];

let editIndex = -1;


//==============================
// PAGE LOAD
//==============================

window.onload = function(){

    loadStock();

};


//==============================
// ADD / UPDATE ITEM
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

