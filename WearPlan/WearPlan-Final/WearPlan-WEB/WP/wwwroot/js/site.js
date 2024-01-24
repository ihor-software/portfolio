let proverka = localStorage.getItem("proverka");
if (proverka === "false") {
    if (document.getElementById("role").innerHTML === "client") {
        let person = document.getElementById("client_mail").innerHTML;
        if (person != "") {
            localStorage.setItem("client", person);
            localStorage.setItem("admin", "");
            proverka = true
        }
    }
    else if (document.getElementById("role").innerHTML === "admin") {
        let person = document.getElementById("client_mail").innerHTML;
        if (person != "") {
            localStorage.setItem("admin", person);
            localStorage.setItem("client", "");
            proverka = true
        }
    }
    localStorage.setItem("proverka", proverka);
    localStorage.setItem("role", document.getElementById("role").innerHTML);
}
proverka = localStorage.getItem("proverka");
if (proverka === "true") {
    let per = localStorage.getItem("client");
    let nutr = localStorage.getItem("admin");
    let peop = document.getElementById("client");
    let nutritionist = document.getElementById("admin");
    if (localStorage.getItem("role") === "admin") {
        nutritionist.innerHTML = nutr;
        peop.style.display = 'none';
        nutritionist.style.display = 'list-item';
    }
    if (localStorage.getItem("role") === "client") {
        nutritionist.style.display = 'none';
        peop.innerHTML = per;
        peop.style.display = 'list-item';

    }
    localStorage.setItem("proverka", proverka);
}
let email = document.getElementById("email_client");
email.innerHTML = localStorage.getItem("client");

function proverka_false() {
    proverka = false;
    localStorage.setItem("proverka", proverka);
}

function middle2() {
    let str = "http://localhost:5000/ManageProducts/Manage?email=" + localStorage.getItem("client");
    location.href = str;
}

function middle3() {
    let str = "http://localhost:5000/Product/Create_client?email=" + localStorage.getItem("client");
    location.href = str;
}
