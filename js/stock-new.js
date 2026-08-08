```javascript
let stockItems = JSON.parse(
    localStorage.getItem("stockItems") || "[]"
);

if (!Array.isArray(stockItems)) {
    stockItems = [];
}


// PAGE LOAD
window.addEventListener("DOMContentLoaded", function () {

    loadStock();

    const imageInput =
        document.getElementById("itemImage");

    const preview =
        document.getElementById("imagePreview");

    if (imageInput && preview) {

        imageInput.addEventListener("change", function () {

            const file = this.files[0];

            if (!file) {
                preview.style.display = "none";
                return;
            }

            const reader = new FileReader();

            reader.onload = function (e) {

                preview.src = e.target.result;
                preview.style.display = "block";

            };

            reader.readAsDataURL(file);

        });

    }

});


// ADD ITEM
function addStockItem() {

    const code =
        document.getElementById("itemCode").value.trim();

    const name =
        document.getElementById("itemName").value.trim();

    const category =
        document.getElementById("category").value.trim();

    const unit =
        document.getElementById("unit").value.trim();

    const stock =
        Number(
            document.getElementById("stockQty").value
        );

    const minStock =
        Number(
            document.getElementById("minStock").value || 0
        );

    const imageInput =
        document.getElementById("itemImage");


    if (code === "") {
        alert("Please enter Item Code.");
        return;
    }


    if (name === "") {
        alert("Please enter Item Name.");
        return;
    }


    if (isNaN(stock) || stock < 0) {
        alert("Please enter valid Stock.");
        return;
    }


    const exists =
        stockItems.some(function (item) {

            return String(item.code || "")
                .toLowerCase() ===
                code.toLowerCase();

        });


    if (exists) {

        alert("Item Code already exists.");

        return;
    }


    if (
        imageInput &&
        imageInput.files &&
        imageInput.files.length > 0
    ) {

        const reader =
            new FileReader();

        reader.onload = function (event) {

            saveItem(
                code,
                name,
                category,
                unit,
                stock,
                minStock,
                event.target.result
            );

        };

        reader.readAsDataURL(
            imageInput.files[0]
        );

    }

    else {

        saveItem(
            code,
            name,
            category,
            unit,
            stock,
            minStock,
            ""
        );

    }

}


// SAVE ITEM
function saveItem(
    code,
    name,
    category,
    unit,
    stock,
    minStock,
    image
) {

    const item = {

        id: Date.now(),

        code: code,

        name: name,

        category: category,

        unit: unit,

        stock: stock,

        minStock: minStock,

        image: image

    };


    stockItems.push(item);


    try {

        localStorage.setItem(
            "stockItems",
            JSON.stringify(stockItems)
        );

    }

    catch (error) {

        stockItems.pop();

        alert(
            "Unable to save. The image may be too large."
        );

        return;
    }


    loadStock();

    clearForm();


    alert(
        image
        ? "Item + Picture Added Successfully."
        : "Item Added Successfully."
    );

}


// LOAD STOCK
function loadStock() {

    const table =
        document.getElementById("stockTable");

    if (!table) {
        return;
    }


    table.innerHTML = "";


    let total = 0;

    let low = 0;


    stockItems.forEach(function (item, index) {

        const qty =
            Number(item.stock) || 0;

        const minimum =
            Number(item.minStock) || 0;


        total += qty;


        let status = "Available";


        if (qty <= 0) {

            status = "Out of Stock";

            low++;

        }

        else if (qty <= minimum) {

            status = "Low Stock";

            low++;

        }


        let imageHTML =
            "No Image";


        if (
            item.image &&
            item.image.indexOf("data:image") === 0
        ) {

            imageHTML = `

                <img

                    src="${item.image}"

                    class="stock-image"

                    alt="Item Picture"

                >

            `;

        }


        table.innerHTML += `

            <tr>

                <td>
                    ${imageHTML}
                </td>

                <td>
                    ${item.code || ""}
                </td>

                <td>
                    ${item.name || ""}
                </td>

                <td>
                    ${item.category || ""}
                </td>

                <td>
                    ${qty}
                </td>

                <td>
                    ${item.unit || ""}
                </td>

                <td>
                    ${status}
                </td>

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


    const totalItems =
        document.getElementById("totalItems");

    const totalStock =
        document.getElementById("totalStock");

    const lowStock =
        document.getElementById("lowStock");


    if (totalItems) {
        totalItems.innerText =
            stockItems.length;
    }


    if (totalStock) {
        totalStock.innerText =
            total;
    }


    if (lowStock) {
        lowStock.innerText =
            low;
    }

}


// DELETE
function deleteStock(index) {

    if (!confirm("Delete this item?")) {
        return;
    }


    stockItems.splice(index, 1);


    localStorage.setItem(
        "stockItems",
        JSON.stringify(stockItems)
    );


    loadStock();

}


// SEARCH
function searchStock() {

    const input =
        document.getElementById("searchStock");

    if (!input) {
        return;
    }


    const keyword =
        input.value.toLowerCase();


    document
        .querySelectorAll("#stockTable tr")
        .forEach(function (row) {

            row.style.display =
                row.innerText
                    .toLowerCase()
                    .includes(keyword)
                ? ""
                : "none";

        });

}


// CLEAR
function clearForm() {

    const fields = [
        "itemCode",
        "itemName",
        "category",
        "unit",
        "stockQty",
        "minStock"
    ];


    fields.forEach(function (id) {

        const element =
            document.getElementById(id);

        if (element) {
            element.value = "";
        }

    });


    const image =
        document.getElementById("itemImage");

    if (image) {
        image.value = "";
    }


    const preview =
        document.getElementById("imagePreview");

    if (preview) {

        preview.src = "";

        preview.style.display = "none";

    }

}
```

