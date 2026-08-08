```javascript
let stockItems = JSON.parse(
    localStorage.getItem("stockItems") || "[]"
);

if (!Array.isArray(stockItems)) {
    stockItems = [];
}


// PAGE LOAD
document.addEventListener("DOMContentLoaded", function () {

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


    // CHECK DUPLICATE

    const duplicate =
        stockItems.some(function (item) {

            return String(item.code)
                .toLowerCase()
                === code.toLowerCase();

        });


    if (duplicate) {

        alert("Item Code already exists.");

        return;
    }


    // IMAGE

    if (
        imageInput &&
        imageInput.files.length > 0
    ) {

        const reader =
            new FileReader();

        reader.onload = function (e) {

            saveItem(
                code,
                name,
                category,
                unit,
                stock,
                minStock,
                e.target.result
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


// SAVE
function saveItem(
    code,
    name,
    category,
    unit,
    stock,
    minStock,
    image
) {

    stockItems.push({

        id: Date.now(),

        code: code,

        name: name,

        category: category,

        unit: unit,

        stock: stock,

        minStock: minStock,

        image: image

    });


    localStorage.setItem(
        "stockItems",
        JSON.stringify(stockItems)
    );


    loadStock();

    clearForm();


    alert(
        image
        ? "Item + Picture Added Successfully."
        : "Item Added Successfully."
    );

}


// LOAD TABLE
function loadStock() {

    const table =
        document.getElementById("stockTable");

    if (!table) return;


    table.innerHTML = "";


    let total = 0;

    let low = 0;


    stockItems.forEach(function (item, index) {

        const stock =
            Number(item.stock) || 0;

        const minimum =
            Number(item.minStock) || 0;


        total += stock;


        let status = "Available";


        if (stock <= 0) {

            status = "Out of Stock";

            low++;

        }

        else if (stock <= minimum) {

            status = "Low Stock";

            low++;

        }


        let image = "No Image";


        if (
            item.image &&
            item.image.startsWith("data:image")
        ) {

            image = `

                <img

                    src="${item.image}"

                    class="stock-image"

                    alt="Item"

                >

            `;

        }


        table.innerHTML += `

            <tr>

                <td>
                    ${image}
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
                    ${stock}
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

    if (!input) return;


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

    document.getElementById("itemCode").value = "";

    document.getElementById("itemName").value = "";

    document.getElementById("category").value = "";

    document.getElementById("unit").value = "";

    document.getElementById("stockQty").value = "";

    document.getElementById("minStock").value = "";


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
