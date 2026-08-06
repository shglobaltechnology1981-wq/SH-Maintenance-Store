
//==================================================
// SH Maintenance Store
// USER LOGIN
//==================================================


let users = [

{
id:"EMP001",
name:"Md. Samsul Haque",
department:"Maintenance",
password:"1234"
},

{
id:"EMP002",
name:"Electrical Team",
department:"Electrical",
password:"1234"
},

{
id:"EMP003",
name:"Mechanical Team",
department:"Mechanical",
password:"1234"
},

{
id:"EMP004",
name:"Production Team",
department:"Production",
password:"1234"
},

{
id:"EMP005",
name:"Cutting Department",
department:"Cutting",
password:"1234"
},

{
id:"EMP006",
name:"Finishing Department",
department:"Finishing",
password:"1234"
},

{
id:"EMP007",
name:"Quality Department",
department:"Quality",
password:"1234"
},

{
id:"EMP008",
name:"Store Department",
department:"Store",
password:"1234"
},

{
id:"EMP009",
name:"Admin Department",
department:"Admin",
password:"1234"
},

{
id:"EMP010",
name:"Supervisor",
department:"Supervisor",
password:"1234"
}

];

// Add More User Here
// Maximum 20 User


function userLogin(){


let id =
document.getElementById("userId").value;


let pass =
document.getElementById("password").value;



let user = users.find(u=>

u.id==id &&
u.password==pass

);



if(user){


localStorage.setItem(

"loginUser",

JSON.stringify(user)

);



window.location.href=
"requisition.html";


}

else{


document.getElementById("msg").innerHTML=
"Invalid User ID or Password";


}


}
