import '../styles/index.scss';

console.log('start Base JS');

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
        isDoctor: false,
        turns: [
            {
                doctor: 'Dr Gregory House',
                time: '15:00',
                day: 'monday'
            },
            {
                doctor: 'Dr Julius Hibert',
                time: '19:00',
                day: 'wednesday'
            }
        ],
        products: [
            {
                type: 'account',
                income: 20000,
                id: 28743
            },
            {
                type: 'card',
                cardLevel: 0,
                id: 29834
            },
            {
                type: 'loan',
                amount: 50000,
                id: 89345
            },
            {
                type: 'card',
                cardLevel: 2,
                id: 29834
            },
            {
                type: 'card',
                cardLevel: 1,
                id: 29834
            }
        ]
    },
    {
        user: "pri",
        pass: "bar",
        name: "Pricilla Barcellone",
        isDoctor: false,
        turns: [],
        products: []
    },
    {
        user: "ben",
        pass: "mon",
        name: "Benja Montero",
        isDoctor: false,
        turns: [],
        products: [
            {
                type: 'account',
                income: 10,
                id: 28743
            },
            {
                type: 'card',
                cardLevel: 0,
                id: 0
            },
            {
                type: 'card',
                cardLevel: 2,
                id: 2
            },
            {
                type: 'card',
                cardLevel: 1,
                id: 1
            }
        ]
    },
    {
        user: "mel",
        pass: "gra",
        name: "Melisa Gramajo",
        isDoctor: false,
        turns: [],
        products: []
    },
    {
        user: "max",
        pass: "sim",
        name: "Maxi Simonazzi",
        isDoctor: false,
        turns: [],
        products: []
    },
    {
        user: "pab",
        pass: "nav",
        name: "Juan Pablo Navarro",
        isDoctor: false,
        turns: [],
        products: []
    },
    {
        user: "jos",
        pass: "mar",
        name: "Jose Marín",
        isDoctor: false,
        turns: [],
        products: []
    },
    {
        user: "fed",
        pass: "mes",
        name: "Fede Mesón",
        isDoctor: false,
        turns: [],
        products: []
    },
    {
        user: "cri",
        pass: "mol",
        name: "Cristian Molina",
        isDoctor: false,
        turns: [],
        products: []
    },
    {
        user: "rob",
        pass: "sal",
        name: "Roberto Sale",
        isDoctor: false,
        turns: [],
        products: []
    },
    {
        user: "cel",
        pass: "fer",
        name: "Celso Fernandez",
        isDoctor: false,
        turns: [],
        products: []
    },
    {
        user: "doc1",
        pass: "doc1",
        name: "Dr Roberto Chapatin",
        isDoctor: true,
        specialty: "1"
    },
    {
        user: "doc2",
        pass: "doc2",
        name: "Dr Gregory House",
        isDoctor: true,
        specialty: "2"
    },
    {
        user: "doc3",
        pass: "doc3",
        name: "Dr Julius Hibert",
        isDoctor: true,
        specialty: "3"
    },
    {
        user: "doc4",
        pass: "doc4",
        name: "Dr Steven Strange",
        isDoctor: true,
        specialty: "4"
    },
    {
        user: "doc5",
        pass: "doc5",
        name: "Dr John Dolittle",
        isDoctor: true,
        specialty: "5"
    }
];

// functions
function startApp() {
    let user;
    let usersLocal;

    if(!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(users));
    }
    usersLocal = JSON.parse(localStorage.getItem("users"));
    //console.log("usersLocal:::::::::",usersLocal);

    document.getElementById("logoutBtn").hidden = true;
    document.getElementById("account").hidden = true;
    document.getElementById("card").hidden = true;
    document.getElementById("loan").hidden = true;
    
    const userLocal = localStorage.getItem("user");
    const passLocal = localStorage.getItem("pass");
    
    if(identifyUser(userLocal, passLocal)) {
        document.getElementById("greetings").innerHTML = `<h1>Bienvenide ${loggedUsr.name}</h1>`;
        document.getElementById("user").hidden = true;
        document.getElementById("pass").hidden = true;
        document.getElementById("loggedUser").hidden = false;
    } else {
        document.getElementById("loggedUser").hidden = true;
    }
    
    user = usersLocal.find(user => user.user === userLocal)
    document.getElementById("account-container").innerHTML =
    `<h3>cuentas: </h3> <ul>${user.products.filter(product => product.type === 'account')
    .map(product => `
                <div class="product">
                    <li>id: ${product.id}</li>
                    <li>ingreso: $${product.income}</li>
                </div>`)}
            </ul>`;

    document.getElementById("card-container").innerHTML = 
        `<h3>tarjetas: </h3> <ul>${user.products.filter(product => product.type === 'card')
        .map(product => `
                    <div class="product">
                        <li>id: ${product.id}</li>
                        <li>tipo: ${getCardName(product.cardLevel)}</li>
                    </div>`)}
                </ul>`;

    document.getElementById("loan-container").innerHTML = 
        `<h3>prestamos: </h3> <ul>${user.products.filter(product => product.type === 'loan')
        .map(product => `
                    <div class="product">
                        <li>id: ${product.id}</li>
                        <li>monto: $${product.amount}</li>
                    </div>`)}
                </ul>`;


    document.getElementById("turns").innerHTML = 
        `<ul>${user.turns
        .map(turn => `
                    <div class="product">
                        <li>doctor: ${turn.doctor}</li>
                        <li>dia: ${turn.day}</li>
                        <li>hora: ${turn.time}</li>
                    </div>`)}
                </ul>`;
}

function getCardName(cardLevel) {
    return cardLevel === 0 ? 'base' : cardLevel === 1 ? 'silver' : 'gold';
}

function identifyUser(user, pass) {
    for(var i = 0; i < users.length; i++) {
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
            
            return true
        }
    }
    return false
}

window.login = function() {
    let user;
    let usersLocal = JSON.parse(localStorage.getItem("users"));

    let userLocal = document.getElementById("user").value;
    let passLocal = document.getElementById("pass").value;

    if(userLocal && passLocal) {
        identifyUser(userLocal, passLocal);
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

    user = usersLocal.find(user => user.user === userLocal)
    document.getElementById("account-container").innerHTML =
        `<h3>cuentas: </h3> <ul>${user.products.filter(product => product.type === 'account')
        .map(product => `
                    <div class="product">
                        <li>id: ${product.id}</li>
                        <li>ingreso: $${product.income}</li>
                    </div>`)}
                </ul>`;
    
    document.getElementById("card-container").innerHTML = 
        `<h3>tarjetas: </h3> <ul>${user.products.filter(product => product.type === 'card')
        .map(product => `
                    <div class="product">
                        <li>id: ${product.id}</li>
                        <li>tipo: ${getCardName(product.cardLevel)}</li>
                    </div>`)}
                </ul>`;
    
    document.getElementById("loan-container").innerHTML = 
        `<h3>prestamos: </h3> <ul>${user.products.filter(product => product.type === 'loan')
        .map(product => `
                    <div class="product">
                        <li>id: ${product.id}</li>
                        <li>monto: $${product.amount}</li>
                    </div>`)}
                </ul>`;


    document.getElementById("turns").innerHTML = 
        `<ul>${user.turns
        .map(turn => `
                    <div class="product">
                        <li>doctor: ${turn.doctor}</li>
                        <li>dia: ${turn.day}</li>
                        <li>hora: ${turn.time}</li>
                    </div>`)}
                </ul>`;
};

window.logout = function() {
    logged = false;

    localStorage.setItem("user", "");
    localStorage.setItem("pass", "");

    document.getElementById("greetings").innerHTML = `<div></div>`;
    document.getElementById("logoutBtn").hidden = true;
    document.getElementById("loginBtn").hidden = false;
    document.getElementById("loggedUser").hidden = true;
    document.getElementById("user").hidden = false;
    document.getElementById("pass").hidden = false;

    document.getElementById("clinic-input").value = ""
    document.getElementById("clinic-results").innerHTML = "<div></div>"
}

window.search = function() {
    document.getElementById("clinic-results").innerHTML = ""
    let term = document.getElementById('clinic-input').value;

    let doctors = users.filter( user => user.isDoctor );
    let filteredDoctors;
    
    if(term !== '') {
        filteredDoctors = doctors.filter(doctor => doctor.name.toLowerCase().includes(term.toLowerCase()));

        document.getElementById("clinic-results").innerHTML =
          `<ul class="radio">${filteredDoctors
          .map(doctor => `
                      <li class="doctor">
                          <input type="radio" id="${doctor.user}" name="doctor" value="${doctor.name}" />${doctor.name}
                      </li>`)}
                  </ul>`;
    } else {
        alert("Debe ingresar al menos 1 letra en la busqueda");
    }
}

window.clean = function() {
    document.getElementById("clinic-input").value = ""
    document.getElementById("clinic-results").innerHTML = "<div></div>"
}

window.getTurn = function() {
  let doctor_selected;
  let day_selected;
  let time_selected;
  let usersLocal = JSON.parse(localStorage.getItem("users"));
  let userLocal = localStorage.getItem("user");
  let user;

  let time = document.getElementById("time");
  time_selected = time.options[time.selectedIndex].value;

  let day = document.getElementById("day");
  day_selected = day.options[day.selectedIndex].value;

  let doctors = users.filter( user => user.isDoctor );

  for(let i = 1; i < doctors.length+1; i++) {
    if(document.getElementById(`doc${i}`).checked) doctor_selected = i;
  }

  const newTurn = {doctor: doctors[doctor_selected-1].name, time: time_selected, day: day_selected}

  let key;
  for(let i = 0; i < usersLocal.length-1; i++) {
      if(usersLocal[i].user === userLocal) {
          key = i
      }
  }

  usersLocal[key].turns.push(newTurn)

  localStorage.setItem("users", JSON.stringify(usersLocal));

  user = usersLocal.find(user => user.user === userLocal)
  document.getElementById("turns").innerHTML = 
  `<ul>${user.turns
  .map(turn =>
    `
      <div class="product">
        <li>doctor: ${turn.doctor}</li>
        <li>dia: ${turn.day}</li>
        <li>hora: ${turn.time}</li>
      </div>`)}
    </ul>`;
}

window.hireAccount = function() {
    let income = document.getElementById("income").value;
    let userLocal = localStorage.getItem("user");
    let usersLocal = JSON.parse(localStorage.getItem("users"));
    
    const newProduct = {type: 'account', income: income, id: Math.floor(Math.random() * 100000) }
    
    let key;
    for(let i = 0; i < usersLocal.length-1; i++) {
        if(usersLocal[i].user === userLocal) {
            key = i
        }
    }

    usersLocal[key].products.push(newProduct)

    localStorage.setItem("users", JSON.stringify(usersLocal));

    let userHiring = usersLocal.find(user => user.user === userLocal)
    //console.log("userHirinDg:::::::::", userHiring);
    document.getElementById("account-container").innerHTML =
        `<h3>cuentas: </h3> <ul>${userHiring.products.filter(product => product.type === 'account')
        .map(product => `
                    <div class="product">
                        <li>id: ${product.id}</li><br/>
                        <li>ingreso: $${product.income}</li>
                    </div>`)}
                </ul>`;
    document.getElementById("income").value = ""
}

window.hireCard = function() {
    let cardLevel;
    let userLocal = localStorage.getItem("user");
    let usersLocal = JSON.parse(localStorage.getItem("users"));

    if (document.getElementById('base').checked) cardLevel = 0;
    if (document.getElementById('silver').checked) cardLevel = 1;
    if (document.getElementById('gold').checked) cardLevel = 2;

    const newProduct = {type: 'card', cardLevel: cardLevel, id: Math.floor(Math.random() * 100000)}

    let key;
    for(let i = 0; i < usersLocal.length-1; i++) {
        if(usersLocal[i].user === userLocal) {
            key = i
        }
    }

    usersLocal[key].products.push(newProduct)

    localStorage.setItem("users", JSON.stringify(usersLocal));

    let userHiring = usersLocal.find(user => user.user === userLocal)
    document.getElementById("card-container").innerHTML = 
        `<h3>tarjetas: </h3> <ul>${userHiring.products.filter(product => product.type === 'card')
        .map(product => `
                    <div class="product">
                        <li>id: ${product.id}</li>
                        <li>tipo: ${getCardName(product.cardLevel)}</li>
                    </div>`)}
                </ul>`;
}

window.hireLoan = function() {
    let amount = document.getElementById("amount");
    let selectedValue = amount.options[amount.selectedIndex].value;
    let userLocal = localStorage.getItem("user");
    let usersLocal = JSON.parse(localStorage.getItem("users"));

    const newProduct = {type: 'loan', amount: selectedValue, id: Math.floor(Math.random() * 100000)}

    let key;
    for(let i = 0; i < usersLocal.length-1; i++) {
        if(usersLocal[i].user === userLocal) {
            key = i
        }
    }

    usersLocal[key].products.push(newProduct)

    localStorage.setItem("users", JSON.stringify(usersLocal));

    let userHiring = usersLocal.find(user => user.user === userLocal)
    document.getElementById("loan-container").innerHTML = 
        `<h3>prestamos: </h3> <ul>${userHiring.products.filter(product => product.type === 'loan')
        .map(product => `
                    <div class="product">
                        <li>id: ${product.id}</li>
                        <li>monto: $${product.amount}</li>
                    </div>`)}
                </ul>`;

    document.getElementById("income").value = ""
}

window.account = function() {
    document.getElementById("account").hidden = false
    document.getElementById("card").hidden = true
    document.getElementById("loan").hidden = true
}

window.card = function() {
    document.getElementById("account").hidden = true
    document.getElementById("card").hidden = false
    document.getElementById("loan").hidden = true
}

window.loan = function() {
    document.getElementById("account").hidden = true
    document.getElementById("card").hidden = true
    document.getElementById("loan").hidden = false
}