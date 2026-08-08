let stockItems = JSON.parse(
    localStorage.getItem("stockItems") || "[]"
);

function addStockItem() {

    alert("ADD BUTTON WORKING");

    const code = document.getElementById("itemCode").value.trim();
    const name = document.getElementById("itemName").value.trim();
    const category = document.getElementById("category").value.trim();
    const unit = document.getElementById("unit").value.trim();
    const qty = Number(document.getElementById("stockQty").value);
    const minStock = Number(document.getElementById("minStock").value);

    if (!code || !name || isNaN(qty)) {
        alert("Please fill Code, Name and Stock.");
        return;
    }

    stockItems.push({
        id: Date.now(),
        code: code,
        name: name,
        category: category,
        unit: unit,
        stock: qty,
        minStock: minStock
    });

    localStorage.setItem(
        "stockItems",
        JSON.stringify(stockItems)
    );

    alert("Item Added Successfully");

    loadStock();
    clearForm();
}


function loadStock() {

    const table = document.getElementById("stockTable");

    if (!table) return;

    table.innerHTML = "";

    let total = 0;
    let low = 0;

    stockItems.forEach((item, index) => {

        total += Number(item.stock);

        let status = "Available";

        if (Number(item.stock) <= Number(item.minStock)) {
            status = "Low Stock";
            low++;
        }

        table.innerHTML += `
            <tr>

                <td>No Image</td>

                <td>${item.code}</td>

                <td>${item.name}</td>

                <td>${item.category}</td>

                <td>${item.stock}</td>

                <td>${item.unit}</td>

                <td>${status}</td>

                <td>
                    <button
                        type="button"
                        onclick="deleteStock(${index})">
                        Delete
                    </button>
                </td>

            </tr>
        `;
    });

    document.getElementById("totalItems").innerText =
        stockItems.length;

    document.getElementById("totalStock").innerText =
        total;

    document.getElementById("lowStock").innerText =
        low;
}


function deleteStock(index) {

    if (!confirm("Delete this item?")) return;

    stockItems.splice(index, 1);

    localStorage.setItem(
        "stockItems",
        JSON.stringify(stockItems)
    );

    loadStock();
}


function searchStock() {

    const keyword =
        document.getElementById("searchStock")
        .value
        .toLowerCase();

    document.querySelectorAll("#stockTable tr")
        .forEach(row => {

            row.style.display =
                row.innerText.toLowerCase()
                .includes(keyword)
                ? ""
                : "none";

        });
}


function clearForm() {

    document.getElementById("itemCode").value = "";
    document.getElementById("itemName").value = "";
    document.getElementById("category").value = "";
    document.getElementById("unit").value = "";
    document.getElementById("stockQty").value = "";
    document.getElementById("minStock").value = "";
}


window.addEventListener("load", function () {

    loadStock();

});
document.addEventListener("DOMContentLoaded", function () {

    const imageInput =
        document.getElementById("itemImage");

    const preview =
        document.getElementById("imagePreview");

    if (!imageInput || !preview) return;

    imageInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) {
            preview.style.display = "none";
            preview.src = "";
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert("Please select an image.");
            this.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {

            preview.src = e.target.result;

            preview.style.display = "block";

        };

        reader.readAsDataURL(file);

    });

});
