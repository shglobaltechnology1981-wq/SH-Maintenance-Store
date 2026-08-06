/*==================================================
SH Maintenance Store
issue.js
==================================================*/

let issueList =
JSON.parse(localStorage.getItem("issueList")) || [];

let stockItems =
JSON.parse(localStorage.getItem("stockItems")) || [];

//==============================
// PAGE LOAD
//==============================

window.onload = function () {
    loadIssue();
};

//==============================
// ISSUE ITEM
//==============================

function issueItem() {

    let code = document.getElementById("issueCode").value.trim();
    let qty = Number(document.getElementById("issueQty").value);
    let issueTo = document.getElementById("issueTo").value.trim();

    if (code === "" || qty <= 0 || issueTo === "") {
        alert("Please fill all fields.");
        return;
    }

    let found = false;

    for (let i = 0; i < stockItems.length; i++) {

        if (stockItems[i].code === code) {

            found = true;

            if (stockItems[i].stock < qty) {
                alert("Insufficient Stock!");
                return;
            }

            stockItems[i].stock -= qty;

            issueList.push({
                code: stockItems[i].code,
                name: stockItems[i].name,
                qty: qty,
                issueTo: issueTo,
                date: new Date().toLocaleDateString()
            });

            break;
        }
    }

    if (!found) {
        alert("Item Code Not Found.");
        return;
    }

    localStorage.setItem(
        "stockItems",
        JSON.stringify(stockItems)
    );

    localStorage.setItem(
        "issueList",
        JSON.stringify(issueList)
    );

    clearForm();

    loadIssue();

    alert("Item Issued Successfully.");

}

//==============================
// LOAD ISSUE TABLE
//==============================

function loadIssue() {

    let table = document.getElementById("issueTable");

    table.innerHTML = "";

    issueList.forEach(item => {

        table.innerHTML += `

<tr>

<td>${item.code}</td>

<td>${item.name}</td>

<td>${item.qty}</td>

<td>${item.issueTo}</td>

<td>${item.date}</td>

</tr>

`;

    });

}

//==============================
// CLEAR FORM
//==============================

function clearForm() {

    document.getElementById("issueCode").value = "";
    document.getElementById("issueQty").value = "";
    document.getElementById("issueTo").value = "";

}
