import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Usuario autenticado correctamente:", userCredential.user);

        // Guardar la sesión en el navegador
        sessionStorage.setItem("user", JSON.stringify(userCredential.user));

        // Redirigir al usuario a la página principal
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error en la autenticación:", error);
        document.getElementById("error-message").textContent = "Error: " + error.message;
    }
});
