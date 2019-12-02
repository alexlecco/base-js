import '../styles/index.scss';

console.log('webpack starterkit');

// when app starts
window.onload = hideLogoutBtn;

// variables
let logged = false;
let users = [
    {
        user: "alex",
        pass: "lecco",
        name: "Alex Villecco"
    },
    {
        user: "nahuel",
        pass: "jose",
        name: "Nahuel Jose"
    },
    {
        user: "juan",
        pass: "usand",
        name: "Juan Usandivaras"
    },
];

// functions
function hideLogoutBtn() {
    document.getElementById("logoutBtn").hidden = true;
}

window.login = function() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;

    if(user && pass) {
        for(var i = 0; i < users.length; i++) {
            // check is user input matches username and password of a current index of the users array
            if(user == users[i].user && pass == users[i].pass) {
                
                logged = true;
            
                localStorage.setItem("user", user);
                localStorage.setItem("pass", pass);
                
                document.getElementById("user").value = '';
                document.getElementById("pass").value = '';
                
                document.getElementById("loginBtn").hidden = true;
                document.getElementById("logoutBtn").hidden = false;
                document.getElementById("greetings").innerHTML = `<h1>Bienvenido ${users[i].name}</h1>`;
                
                console.log("Logged User: ", logged)

                // stop the function if this is found to be true
                return
            }
        }

        if (!logged) alert("Usuario incorrecto")
    } else {
        alert("Debe ingresar usuario y contraseña")
    }
};

window.logout = function() {
    logged = false;

    localStorage.setItem("user", "");
    localStorage.setItem("pass", "");

    document.getElementById("greetings").innerHTML = `<h1></h1>`;
    document.getElementById("logoutBtn").hidden = true;
    document.getElementById("loginBtn").hidden = false;

    console.log("Logged User: ", logged)
}