/*=====================================
SH Maintenance Store
Stock Module
=====================================*/

let stockItems = JSON.parse(localStorage.getItem("stockItems")) || [];

// Load Data
window.onload = function () {
    loadStock();
};

// Add Item
function addItem() {

    let code = document.getElementById("itemCode").value.trim();
    let name = document.getElementById("itemName").value.trim();
    let category = document.getElementById("itemCategory").value;
    let stock = document.getElementById("itemStock").value;
    let unit = document.getElementById("itemUnit").value.trim();

    if(code==="" || name==="" || stock==="" || unit===""){
        alert("Please fill all fields.");
        return;
    }

    stockItems.push({
        code:code,
        name:name,
        category:category,
        stock:Number(stock),
        unit:unit
    });

    localStorage.setItem(
        "stockItems",
        JSON.stringify(stockItems)
    );

    clearForm();

    loadStock();

}

// Load Table
function loadStock(){

    let table=document.getElementById("stockTable");

    table.innerHTML="";

    stockItems.forEach((item,index)=>{

        let status=item.stock<=10
        ? "<span class='low'>LOW</span>"
        : "<span class='available'>OK</span>";

        table.innerHTML+=`
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

// Delete Item
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

// Clear Form
function clearForm(){

document.getElementById("itemCode").value="";
document.getElementById("itemName").value="";
document.getElementById("itemStock").value="";
document.getElementById("itemUnit").value="";

}
