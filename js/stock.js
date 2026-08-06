<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Stock Management</title>

<link rel="stylesheet" href="css/stock.css">

<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

</head>

<body>

<div class="sidebar">

<h2>SH STORE</h2>

<a href="dashboard.html"><i class="fa fa-home"></i> Dashboard</a>

<a href="stock.html"><i class="fa fa-box"></i> Stock</a>

<a href="purchase.html"><i class="fa fa-cart-shopping"></i> Purchase</a>

<a href="issue.html"><i class="fa fa-arrow-up"></i> Issue</a>

<a href="report.html"><i class="fa fa-chart-bar"></i> Report</a>

</div>


<div class="main">

<h1>Stock Management</h1>

<div class="stock-form">

<input type="text" placeholder="Item Code">

<input type="text" placeholder="Item Name">

<select>

<option>Mechanical</option>

<option>Electrical</option>

<option>Sewing Spare</option>

</select>

<input type="number" placeholder="Current Stock">

<input type="text" placeholder="Unit (PCS)">

<button>Add Item</button>

</div>


<table>

<tr>

<th>Code</th>

<th>Item Name</th>

<th>Category</th>

<th>Stock</th>

<th>Unit</th>

<th>Status</th>

</tr>

<tr>

<td>SP001</td>

<td>Bearing 6205</td>

<td>Mechanical</td>

<td>50</td>

<td>PCS</td>

<td>Available</td>

</tr>

</table>

</div>

<script src="js/stock.js"></script>

</body>

</html>
