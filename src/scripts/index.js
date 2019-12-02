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
        name: "Alex Villecco",
        isDoctor: false
    },
    {
        user: "pri",
        pass: "bar",
        name: "Pricilla Barcellone",
        isDoctor: false
    },
    {
        user: "ben",
        pass: "mon",
        name: "Benja Montero",
        isDoctor: false
    },
    {
        user: "mel",
        pass: "gra",
        name: "Melisa Gramajo",
        isDoctor: false
    },
    {
        user: "max",
        pass: "sim",
        name: "Maxi Simonazzi",
        isDoctor: false
    },
    {
        user: "pab",
        pass: "nav",
        name: "Juan Pablo Navarro",
        isDoctor: false
    },
    {
        user: "jos",
        pass: "mar",
        name: "Jose Marín",
        isDoctor: false
    },
    {
        user: "fed",
        pass: "mes",
        name: "Fede Mesón",
        isDoctor: false
    },
    {
        user: "cri",
        pass: "mol",
        name: "Cristian Molina",
        isDoctor: false
    },
    {
        user: "rob",
        pass: "sal",
        name: "Roberto Sale",
        isDoctor: false
    },
    {
        user: "max",
        pass: "rod",
        name: "Maxi Rodriguez",
        isDoctor: false
    },
    {
        user: "doc1",
        pass: "doc1",
        name: "Roberto Chapatin",
        isDoctor: true,
        specialty: "1"
    },
    {
        user: "doc2",
        pass: "doc2",
        name: "Gregory House",
        isDoctor: true,
        specialty: "2"
    },
    {
        user: "doc3",
        pass: "doc3",
        name: "Julius Hibert",
        isDoctor: true,
        specialty: "3"
    }
];

// functions
function startApp() {
    document.getElementById("logoutBtn").hidden = true;
    document.getElementById("loggedUser").hidden = true;

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
        identifyUser(user, pass);
        if (!logged) {
            alert("Usuario incorrecto");
        } else {
            document.getElementById("loggedUser").hidden = false;
            document.getElementById("user").hidden = true;
            document.getElementById("pass").hidden = true;
        }
    } else {
        alert("Debe ingresar usuario y contraseña");
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
    document.getElementById("loggedUser").hidden = true;
    document.getElementById("user").hidden = false;
    document.getElementById("pass").hidden = false;
}

window.search = function() {
    document.getElementById("clinic-results").innerHTML = "<div></div>"
    let term = document.getElementById('clinic-input').value;

    let doctors = users.filter(user => user.isDoctor)
    let filteredDoctors = doctors.filter(doctor => doctor.name.toLowerCase().includes(term.toLowerCase()))
    
    let ulTag = document.createElement('ul');
    let liTag;
    filteredDoctors.forEach(doctor => {
        liTag = document.createElement('li');
        let textNode = document.createTextNode(doctor.name)
        liTag.appendChild(textNode);
        ulTag.appendChild(liTag);
    });

    document.getElementById("clinic-results").appendChild(ulTag);
}

window.clean = function() {
    document.getElementById("clinic-input").value = ""
    document.getElementById("clinic-results").innerHTML = "<div></div>"
}