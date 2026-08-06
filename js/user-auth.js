//==================================================
// SH Maintenance Store
// USER LOGIN
//==================================================


let users = [


{
id:"EMP001",
name:"Maintenance",
department:"Maintenance",
password:"1234"
},


{
id:"EMP002",
name:"Electrical",
department:"Electrical",
password:"1234"
},


{
id:"EMP003",
name:"Production",
department:"Production",
password:"1234"
},


{
id:"EMP004",
name:"Store",
department:"Store",
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
