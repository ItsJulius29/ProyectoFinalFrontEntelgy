import { auth } from "./firebase-config.js";/* Importacion de la configuraciond e Firebase */
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

document.getElementById("login-form").addEventListener("submit", async (e) => { //Obtiene el formulario
    e.preventDefault();

    const email = document.getElementById("email").value; //Obtiene el email ingresado
    const password = document.getElementById("password").value; //Obtiene el password ingresado

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password); //Llama a Firebase para autenticacion
        console.log("Usuario autenticado correctamente:", userCredential.user);

        // Guardar la sesión en el navegador
        sessionStorage.setItem("user", JSON.stringify(userCredential.user)); //Convierte el objeto de usuario en cadena JSON

        // Redirigir al usuario a la página principal
        window.location.href = "index.html";

    } catch (error) { //Manejo de error
        console.error("Error en la autenticación:", error);
        document.getElementById("error-message").textContent = "Error: " + error.message;
    }
});
