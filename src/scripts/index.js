import '../styles/index.scss';

console.log('webpack starterkit');

window.onload = hideLogoutBtn;

function hideLogoutBtn() {
    document.getElementById("logoutBtn").hidden = true;
}

window.login = function() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
    
    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);
    
    document.getElementById("user").value = '';
    document.getElementById("pass").value = '';
    
    document.getElementById("loginBtn").hidden = true;
    document.getElementById("logoutBtn").hidden = false;
    document.getElementById("greetings").innerHTML = `<h1>Bienvenido ${user}</h1>`;
};

window.logout = function() {
    localStorage.setItem("user", "");
    localStorage.setItem("pass", "");

    document.getElementById("greetings").innerHTML = `<h1></h1>`;
    document.getElementById("logoutBtn").hidden = true;
    document.getElementById("loginBtn").hidden = false;
}