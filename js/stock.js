/*==================================================
SH MAINTENANCE STORE
stock.js
Version 1.0
==================================================*/

let stockItems = JSON.parse(localStorage.getItem("stockItems")) || [];

//==============================
// PAGE LOAD
//==============================

window.onload = function () {
    loadStock();
};

//==============================
// ADD ITEM
//==============================

function addItem() {

    let code = document.getElementById("itemCode").value.trim();
    let name = document.getElementById("itemName").value.trim();
    let category = document.getElementById("itemCategory").value;
    let stock = document.getElementById("itemStock").value.trim();
    let unit = document.getElementById("itemUnit").value.trim();

    if (
        code === "" ||
        name === "" ||
        stock === "" ||
        unit === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    stockItems.push({
        code: code,
        name: name,
        category: category,
        stock: Number(stock),
        unit: unit
    });

    saveData();

    clearForm();

    loadStock();

}

//==============================
// LOAD TABLE
//==============================

function loadStock() {

    let table = document.getElementById("stockTable");

    table.innerHTML = "";

    stockItems.forEach((item, index) => {

        let status =
            item.stock <= 10
                ? "<span class='low'>LOW</span>"
                : "<span class='available'>AVAILABLE</span>";

        table.innerHTML += `

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

//==============================
// EDIT
//==============================

function editItem(index) {

    let item = stockItems[index];

    document.getElementById("itemCode").value = item.code;
    document.getElementById("itemName").value = item.name;
    document.getElementById("itemCategory").value = item.category;
    document.getElementById("itemStock").value = item.stock;
    document.getElementById("itemUnit").value = item.unit;

    stockItems.splice(index, 1);

    saveData();

    loadStock();

}

//==============================
// DELETE
//==============================

function deleteItem(index) {

    if (confirm("Delete this item?")) {

        stockItems.splice(index, 1);

        saveData();

        loadStock();

    }

}

//==============================
// SEARCH
//==============================

function searchItem() {

    let value =
        document
        .getElementById("searchItem")
        .value
        .toLowerCase();

    let rows =
        document.querySelectorAll("#stockTable tr");

    rows.forEach(row => {

        let text =
            row.innerText.toLowerCase();

        row.style.display =
            text.includes(value)
                ? ""
                : "none";

    });

}

//==============================
// CLEAR FORM
//==============================

function clearForm() {

    document.getElementById("itemCode").value = "";
    document.getElementById("itemName").value = "";
    document.getElementById("itemCategory").selectedIndex = 0;
    document.getElementById("itemStock").value = "";
    document.getElementById("itemUnit").value = "";

}

//==============================
// SAVE LOCAL STORAGE
//==============================

function saveData() {

    localStorage.setItem(
        "stockItems",
        JSON.stringify(stockItems)
    );

}
