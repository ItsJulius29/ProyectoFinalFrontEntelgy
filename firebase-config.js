// Importar Firebase desde el CDN proporcionado por Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Configuración de Firebase basada en la captura de pantalla
const firebaseConfig = {
    apiKey: "AIzaSyBrIQ-rqooxAgoPQ9GsqRikJ_SibQE8kQY",
    authDomain: "finalfrontjc.firebaseapp.com",
    projectId: "finalfrontjc",
    storageBucket: "finalfrontjc.firebasestorage.app",
    messagingSenderId: "1017203133741",
    appId: "1:1017203133741:web:48192b08e695ef1e4117a4"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Prueba si Firebase está bien conectado
console.log("Firebase cargado correctamente:", app);
