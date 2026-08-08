/*==================================================
SH MAINTENANCE STORE
STOCK MANAGEMENT
FINAL IMAGE VERSION
==================================================*/

let stockItems = [];


//==================================================
// LOAD DATA
//==================================================

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

    const input =
        document.getElementById("itemImage");

    const preview =
        document.getElementById("imagePreview");


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


            if (!file.type.startsWith("image/")) {

                alert(
                    "Please select an image."
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


    const stockInput =
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


    const stock =
        Number(stockInput.value);


    const minStock =
        Number(minInput.value);


    //==============================================
    // VALIDATION
    //==============================================

    if (code === "") {

        alert("Please enter Item Code.");

        return;

    }


    if (name === "") {

        alert("Please enter Item Name.");

        return;

    }


    if (
        stockInput.value === "" ||
        stock < 0
    ) {

        alert("Please enter Opening Stock.");

        return;

    }


    if (
        minInput.value === "" ||
        minStock < 0
    ) {

        alert("Please enter Minimum Stock.");

        return;

    }


    //==============================================
    // DUPLICATE CODE
    //==============================================

    const exists =
        stockItems.some(
            function (item) {

                return String(
                    item.code || ""
                ).toLowerCase()
                ===
                code.toLowerCase();

            }
        );


    if (exists) {

        alert(
            "This Item Code already exists."
        );

        return;

    }


    //==============================================
    // IMAGE
    //==============================================

    if (
        imageInput &&
        imageInput.files &&
        imageInput.files.length > 0
    ) {


        const file =
            imageInput.files[0];


        // Image reader

        const reader =
            new FileReader();


        reader.onload =
            function (event) {


                const imageData =
                    event.target.result;


                console.log(
                    "IMAGE SAVING:",
                    imageData.substring(
                        0,
                        30
                    )
                );


                saveItem(

                    code,
                    name,
                    category,
                    unit,
                    stock,
                    minStock,
                    imageData

                );

            };


        reader.onerror =
            function () {

                alert(
                    "Could not read image."
                );

            };


        reader.readAsDataURL(file);


    }

    else {


        // No image selected

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


//==================================================
// SAVE ITEM
//==================================================

function saveItem(

    code,
    name,
    category,
    unit,
    stock,
    minStock,
    imageData

) {


    const newItem = {

        id:
            Date.now(),

        code:
            code,

        name:
            name,

        category:
            category,

        unit:
            unit,

        stock:
            stock,

        minStock:
            minStock,

        image:
            imageData || ""

    };


    console.log(
        "NEW ITEM:",
        newItem
    );


    stockItems.push(
        newItem
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
            "Could not save item."
        );


        return;

    }


    loadStock();

    clearForm();


    alert(
        imageData
            ? "Item + Picture Added Successfully."
            : "Item Added Successfully."
    );

}


//==================================================
// LOAD STOCK
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


            //======================================
            // IMAGE
            //======================================

            let imageHTML =
                `<span class="no-image">
                    No Image
                 </span>`;


            if (
                item.image &&
                item.image.length > 20
            ) {


                imageHTML = `

                    <img

                        src="${item.image}"

                        class="stock-image"

                        alt="Item Picture"

                        onclick="showImage(${index})"

                    >

                `;

            }


            //======================================
            // ROW
            //======================================

            table.innerHTML += `

                <tr>

                    <td>

                        ${imageHTML}

                    </td>


                    <td>

                        ${escapeHTML(
                            item.code
                        )}

                    </td>


                    <td>

                        ${escapeHTML(
                            item.name
                        )}

                    </td>


                    <td>

                        ${escapeHTML(
                            item.category
                        )}

                    </td>


                    <td>

                        ${stock}

                    </td>


                    <td>

                        ${escapeHTML(
                            item.unit
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

                            onclick="
                                deleteStock(${index})
                            "

                        >

                            <i class="fa fa-trash"></i>

                            Delete

                        </button>

                    </td>

                </tr>

            `;

        }
    );


    //==============================================
    // SUMMARY
    //==============================================

    const totalItemsElement =
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


    if (totalItemsElement) {

        totalItemsElement.innerText =
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
            "Please allow popup."
        );

        return;

    }


    win.document.write(`

        <html>

        <head>

            <title>
                Item Picture
            </title>

            <style>

                body{

                    margin:0;

                    background:#111;

                    display:flex;

                    justify-content:center;

                    align-items:center;

                    min-height:100vh;

                }

                img{

                    max-width:95%;

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
```
