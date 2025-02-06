import "./components/task-form.js";
import "./components/task-list.js";
import "./components/task-item.js";
import "./components/task-filter.js";
import "./components/error-message.js";

import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    verificarAutenticacion();
    document.getElementById("logout-btn").addEventListener("click", cerrarSesion);
});

function verificarAutenticacion() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Usuario autenticado:", user);
        } else {
            console.log("No hay usuario autenticado. Redirigiendo a login...");
            window.location.href = "login.html";
        }
    });
}

function cerrarSesion() {
    signOut(auth)
        .then(() => {
            sessionStorage.clear();
            console.log("Sesión cerrada correctamente.");
            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error("Error al cerrar sesión:", error);
        });
}
