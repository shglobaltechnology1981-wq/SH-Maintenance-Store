/*==================================================
SH MAINTENANCE STORE
STOCK MANAGEMENT
FINAL CLEAN VERSION
==================================================*/


//==================================================
// DATA
//==================================================

let stockItems = [];


try {

    const saved =
        localStorage.getItem("stockItems");

    stockItems =
        saved
        ? JSON.parse(saved)
        : [];

    if (!Array.isArray(stockItems)) {

        stockItems = [];

    }

} catch (error) {

    console.error(
        "Stock Load Error:",
        error
    );

    stockItems = [];

}


//==================================================
// PAGE LOAD
//==================================================

window.addEventListener(
    "DOMContentLoaded",
    function () {

        loadStock();

        setupImage();

    }
);


//==================================================
// IMAGE PREVIEW
//==================================================

function setupImage() {


    const input =
        document.getElementById(
            "itemImage"
        );


    const preview =
        document.getElementById(
            "imagePreview"
        );


    if (!input || !preview) {

        return;

    }


    input.addEventListener(
        "change",
        function () {


            const file =
                input.files[0];


            if (!file) {

                preview.src = "";

                preview.style.display =
                    "none";

                return;

            }


            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                alert(
                    "Please select an image file."
                );

                input.value = "";

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


            reader.readAsDataURL(
                file
            );

        }
    );

}


//==================================================
// ADD ITEM
//==================================================

function addStockItem() {


    console.log(
        "ADD BUTTON CLICKED"
    );


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


    const stockValue =
        document.getElementById(
            "stockQty"
        ).value;


    const minValue =
        document.getElementById(
            "minStock"
        ).value;


    const imageInput =
        document.getElementById(
            "itemImage"
        );


    //==============================================
    // VALIDATION
    //==============================================

    if (code === "") {

        alert(
            "Please enter Item Code."
        );

        return;

    }


    if (name === "") {

        alert(
            "Please enter Item Name."
        );

        return;

    }


    if (stockValue === "") {

        alert(
            "Please enter Opening Stock."
        );

        return;

    }


    const stock =
        Number(stockValue);


    const minStock =
        minValue === ""
        ? 0
        : Number(minValue);


    if (
        isNaN(stock) ||
        stock < 0
    ) {

        alert(
            "Invalid Stock Quantity."
        );

        return;

    }


    if (
        isNaN(minStock) ||
        minStock < 0
    ) {

        alert(
            "Invalid Minimum Stock."
        );

        return;

    }


    //==============================================
    // DUPLICATE CODE
    //==============================================

    const duplicate =
        stockItems.find(
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
            "Item Code already exists."
        );

        return;

    }


    //==============================================
    // SAVE WITHOUT IMAGE
    //==============================================

    if (
        !imageInput ||
        imageInput.files.length === 0
    ) {


        saveItem(

            code,
            name,
            category,
            unit,
            stock,
            minStock,
            ""

        );


        return;

    }


    //==============================================
    // SAVE WITH IMAGE
    //==============================================

    const file =
        imageInput.files[0];


    const reader =
        new FileReader();


    reader.onload =
        function (event) {


            const image =
                event.target.result;


            saveItem(

                code,
                name,
                category,
                unit,
                stock,
                minStock,
                image

            );

        };


    reader.onerror =
        function () {

            alert(
                "Image could not be read."
            );

        };


    reader.readAsDataURL(
        file
    );

}


//==================================================
// SAVE
//==================================================

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

        image: image || ""

    };


    stockItems.push(
        item
    );


    try {


        localStorage.setItem(

            "stockItems",

            JSON.stringify(
                stockItems
            )

        );


    } catch (error) {


        console.error(error);


        alert(
            "Unable to save stock data."
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


    let totalStock = 0;

    let lowStock = 0;


    stockItems.forEach(
        function (item, index) {


            const stock =
                Number(
                    item.stock
                ) || 0;


            const minimum =
                Number(
                    item.minStock
                ) || 0;


            totalStock +=
                stock;


            let status =
                "Available";


            if (stock <= 0) {

                status =
                    "Out of Stock";

                lowStock++;

            }

            else if (
                stock <= minimum
            ) {

                status =
                    "Low Stock";

                lowStock++;

            }


            // IMAGE

            let imageHTML =
                `<span class="no-image">
                    No Image
                 </span>`;


            if (
                item.image &&
                item.image.indexOf(
                    "data:image"
                ) === 0
            ) {

                imageHTML = `

                    <img

                    src="${item.image}"

                    class="stock-image"

                    alt="Item"

                    onclick="showImage(${index})">

                `;

            }


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


    // SUMMARY

    const totalItems =
        document.getElementById(
            "totalItems"
        );


    const totalStockElement =
        document.getElementById(
            "totalStock"
        );


    const lowStockElement =
        document.getElementById(
            "lowStock"
        );


    if (totalItems) {

        totalItems.innerText =
            stockItems.length;

    }


    if (totalStockElement) {

        totalStockElement.innerText =
            totalStock;

    }


    if (lowStockElement) {

        lowStockElement.innerText =
            lowStock;

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

        JSON.stringify(
            stockItems
        )

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


    const rows =
        document.querySelectorAll(
            "#stockTable tr"
        );


    rows.forEach(
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
// CLEAR
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


    const input =
        document.getElementById(
            "itemImage"
        );


    if (input) {

        input.value = "";

    }


    const preview =
        document.getElementById(
            "imagePreview"
        );


    if (preview) {

        preview.src = "";

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
            "Popup blocked."
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

                    background:#111;

                    display:flex;

                    justify-content:center;

                    align-items:center;

                    min-height:100vh;

                }

                img {

                    max-width:95vw;

                    max-height:95vh;

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

    return String(
        value || ""
    )

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

