import "./components/task-form.js";
import "./components/task-list.js";
import "./components/task-filter.js";
import "./components/error-message.js";

import {auth} from "./firebase-config.js";

document.addEventListener("DOMContentLoaded",() =>{
    verificarAutenticacion();
    document.getElementById("logout-btn").addEventListener("click",cerrarSesion);
})

function verificarAutenticacion(){
    auth.onAuthStateChanged((user) =>{
        if(!user){
            window.location.href = "login.html";
        }
    })
}

function cerrarSesion() {
    auth.signOut().then(() => {
        sessionStorage.clear();
        window.location.href = "login.html";
    });
}
