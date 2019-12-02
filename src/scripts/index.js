import '../styles/index.scss';

console.log('webpack starterkit');

// when app starts
window.onload = startApp;

// variables
let logged = false;
let loggedUsr = {};
let users = [
    {
        user: "alex",
        pass: "lecco",
        name: "Alex Villecco"
    },
    {
        user: "pri",
        pass: "bar",
        name: "Pricilla Barcellone"
    },
    {
        user: "ben",
        pass: "mon",
        name: "Benja Montero"
    },
    {
        user: "mel",
        pass: "gra",
        name: "Melisa Gramajo"
    },
    {
        user: "max",
        pass: "sim",
        name: "Maxi Simonazzi"
    },
    {
        user: "pab",
        pass: "nav",
        name: "Juan Pablo Navarro"
    },
    {
        user: "jos",
        pass: "mar",
        name: "Jose Marín"
    },
    {
        user: "fed",
        pass: "mes",
        name: "Fede Mesón"
    },
    {
        user: "cri",
        pass: "mol",
        name: "Cristian Molina"
    },
    {
        user: "rob",
        pass: "sal",
        name: "Roberto Sale"
    },
    {
        user: "max",
        pass: "rod",
        name: "Maxi Rodriguez"
    },
];

// functions
function startApp() {
    document.getElementById("logoutBtn").hidden = true;

    let user = localStorage.getItem("user");
    let pass = localStorage.getItem("pass");

    identifyUser(user, pass)

    document.getElementById("greetings").innerHTML = `<h1>Bienvenide ${loggedUsr.name}</h1>`;
}

function identifyUser(user,pass) {
    for(var i = 0; i < users.length; i++) {
        // check is user input matches username and password of a current index of the users array
        if(user === users[i].user && pass === users[i].pass) {
            
            logged = true;
            loggedUsr = { ...users[i] };
        
            localStorage.setItem("user", user);
            localStorage.setItem("pass", pass);
            
            document.getElementById("user").value = '';
            document.getElementById("pass").value = '';
            
            document.getElementById("loginBtn").hidden = true;
            document.getElementById("logoutBtn").hidden = false;
            document.getElementById("greetings").innerHTML = `<h1>Bienvenide ${users[i].name}</h1>`;
            
            console.log("Logged: ", logged)
            console.log("Logged User: ", loggedUsr.user)

            // stop the function if this is found to be true
            return
        }
    }
}

window.login = function() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;

    if(user && pass) {
        identifyUser(user, pass)

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

    console.log("Logged: ", logged)
}