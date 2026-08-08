```javascript
/*==================================================
SH Maintenance Store
Stock Management
CLEAN VERSION
Add + Picture + Preview + Search + Delete
==================================================*/


//==================================================
// LOAD STOCK DATA
//==================================================

let stockItems = [];

try {

    stockItems =
        JSON.parse(
            localStorage.getItem("stockItems") || "[]"
        );

    if (!Array.isArray(stockItems)) {

        stockItems = [];

    }

} catch (error) {

    console.error(error);

    stockItems = [];

}


//==================================================
// PAGE LOAD
//==================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadStock();

        setupImagePreview();

    }
);


//==================================================
// IMAGE PREVIEW
//==================================================

function setupImagePreview() {


    const imageInput =
        document.getElementById("itemImage");


    const preview =
        document.getElementById("imagePreview");


    if (!imageInput || !preview) {

        return;

    }


    imageInput.addEventListener(
        "change",
        function () {


            const file =
                this.files[0];


            if (!file) {

                preview.removeAttribute("src");

                preview.style.display =
                    "none";

                return;

            }


            // IMAGE CHECK

            if (!file.type.startsWith("image/")) {

                alert(
                    "Please select an image file."
                );

                this.value = "";

                return;

            }


            // MAX 1 MB

            if (file.size > 1024 * 1024) {

                alert(
                    "Please select an image below 1 MB."
                );

                this.value = "";

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    preview.src =
                        event.target.result;

                    preview.style.display =
                        "block";

                };


            reader.readAsDataURL(file);

        }
    );

}


//==================================================
// ADD ITEM
//==================================================

function addStockItem() {


    const code =
        document.getElementById(
            "itemCode"
        ).value.trim();


    const name =
        document.getElementById(
            "itemName"
        ).value.trim();


    const category =
        document.getElementById(
            "category"
        ).value.trim();


    const unit =
        document.getElementById(
            "unit"
        ).value.trim();


    const qtyInput =
        document.getElementById(
            "stockQty"
        );


    const minInput =
        document.getElementById(
            "minStock"
        );


    const imageInput =
        document.getElementById(
            "itemImage"
        );


    const qty =
        Number(qtyInput.value);


    const minStock =
        Number(minInput.value);


    //================================================
    // VALIDATION
    //================================================

    if (code === "") {

        alert("Please enter Item Code.");

        return;

    }


    if (name === "") {

        alert("Please enter Item Name.");

        return;

    }


    if (
        qtyInput.value === "" ||
        isNaN(qty) ||
        qty < 0
    ) {

        alert("Please enter valid Stock Quantity.");

        return;

    }


    if (
        minInput.value === "" ||
        isNaN(minStock) ||
        minStock < 0
    ) {

        alert("Please enter valid Minimum Stock.");

        return;

    }


    //================================================
    // DUPLICATE CODE
    //================================================

    const duplicate =
        stockItems.some(
            function (item) {

                return String(
                    item.code || ""
                ).toLowerCase()
                ===
                code.toLowerCase();

            }
        );


    if (duplicate) {

        alert(
            "This Item Code already exists."
        );

        return;

    }


    //================================================
    // IMAGE SAVE
    //================================================

    if (
        imageInput &&
        imageInput.files &&
        imageInput.files.length > 0
    ) {


        const file =
            imageInput.files[0];


        const reader =
            new FileReader();


        reader.onload =
            function (event) {


                saveItem(

                    code,
                    name,
                    category,
                    unit,
                    qty,
                    minStock,
                    event.target.result

                );

            };


        reader.readAsDataURL(file);


    }

    else {


        saveItem(

            code,
            name,
            category,
            unit,
            qty,
            minStock,
            ""

        );

    }

}


//==================================================
// SAVE ITEM
//==================================================

function saveItem(

    code,
    name,
    category,
    unit,
    qty,
    minStock,
    image

) {


    const item = {

        id: Date.now(),

        code: code,

        name: name,

        category: category,

        unit: unit,

        stock: qty,

        minStock: minStock,

        image: image || ""

    };


    stockItems.push(item);


    try {

        localStorage.setItem(

            "stockItems",

            JSON.stringify(stockItems)

        );

    }

    catch (error) {

        console.error(error);

        alert(
            "Could not save item. Storage may be full."
        );

        return;

    }


    loadStock();

    clearForm();


    alert(
        "Item Added Successfully."
    );

}


//==================================================
// LOAD TABLE
//==================================================

function loadStock() {


    const table =
        document.getElementById(
            "stockTable"
        );


    if (!table) {

        return;

    }


    table.innerHTML = "";


    let total =
        0;


    let low =
        0;


    stockItems.forEach(
        function (item, index) {


            const stock =
                Number(item.stock) || 0;


            const minStock =
                Number(item.minStock) || 0;


            total += stock;


            let status =
                "Available";


            if (stock <= 0) {

                status =
                    "Out of Stock";

                low++;

            }

            else if (stock <= minStock) {

                status =
                    "Low Stock";

                low++;

            }


            //================================================
            // IMAGE
            //================================================

            let imageHTML =
                `<span class="no-image">
                    No Image
                 </span>`;


            if (
                item.image &&
                String(item.image)
                    .startsWith("data:image")
            ) {


                imageHTML = `

                    <img

                        src="${item.image}"

                        alt="Item"

                        class="stock-image"

                        onclick="showImage(${index})"

                    >

                `;

            }


            //================================================
            // TABLE ROW
            //================================================

            table.innerHTML += `

                <tr>

                    <td>
                        ${imageHTML}
                    </td>


                    <td>
                        ${escapeHTML(item.code)}
                    </td>


                    <td>
                        ${escapeHTML(item.name)}
                    </td>


                    <td>
                        ${escapeHTML(
                            item.category || "-"
                        )}
                    </td>


                    <td>
                        ${stock}
                    </td>


                    <td>
                        ${escapeHTML(
                            item.unit || "-"
                        )}
                    </td>


                    <td>

                        <span class="stock-status">

                            ${status}

                        </span>

                    </td>


                    <td>

                        <button

                            type="button"

                            class="delete-btn"

                            onclick="deleteStock(${index})">

                            <i class="fa fa-trash"></i>

                            Delete

                        </button>

                    </td>

                </tr>

            `;

        }
    );


    //================================================
    // SUMMARY
    //================================================

    const totalItems =
        document.getElementById(
            "totalItems"
        );


    const totalStock =
        document.getElementById(
            "totalStock"
        );


    const lowStock =
        document.getElementById(
            "lowStock"
        );


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


//==================================================
// DELETE
//==================================================

function deleteStock(index) {


    if (
        !confirm(
            "Delete this item?"
        )
    ) {

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


//==================================================
// SEARCH
//==================================================

function searchStock() {


    const input =
        document.getElementById(
            "searchStock"
        );


    if (!input) {

        return;

    }


    const keyword =
        input.value
            .toLowerCase()
            .trim();


    document
        .querySelectorAll(
            "#stockTable tr"
        )
        .forEach(
            function (row) {

                row.style.display =
                    row.innerText
                        .toLowerCase()
                        .includes(keyword)
                        ? ""
                        : "none";

            }
        );

}


//==================================================
// CLEAR FORM
//==================================================

function clearForm() {


    document.getElementById(
        "itemCode"
    ).value = "";


    document.getElementById(
        "itemName"
    ).value = "";


    document.getElementById(
        "category"
    ).value = "";


    document.getElementById(
        "unit"
    ).value = "";


    document.getElementById(
        "stockQty"
    ).value = "";


    document.getElementById(
        "minStock"
    ).value = "";


    const imageInput =
        document.getElementById(
            "itemImage"
        );


    if (imageInput) {

        imageInput.value = "";

    }


    const preview =
        document.getElementById(
            "imagePreview"
        );


    if (preview) {

        preview.removeAttribute(
            "src"
        );

        preview.style.display =
            "none";

    }

}


//==================================================
// SHOW IMAGE
//==================================================

function showImage(index) {


    const item =
        stockItems[index];


    if (
        !item ||
        !item.image
    ) {

        return;

    }


    const win =
        window.open(
            "",
            "_blank"
        );


    if (!win) {

        alert(
            "Please allow popup for this site."
        );

        return;

    }


    win.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>
                Item Picture
            </title>

            <style>

                body {

                    margin:0;

                    min-height:100vh;

                    background:#111;

                    display:flex;

                    justify-content:center;

                    align-items:center;

                }

                img {

                    max-width:95vw;

                    max-height:95vh;

                    object-fit:contain;

                }

            </style>

        </head>


        <body>

            <img
                src="${item.image}"
                alt="Item Picture">

        </body>

        </html>

    `);


    win.document.close();

}


//==================================================
// ESCAPE HTML
//==================================================

function escapeHTML(value) {

    return String(value || "")

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}
```
