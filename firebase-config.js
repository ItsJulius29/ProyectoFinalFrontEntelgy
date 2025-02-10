// Importar Firebase desde el CDN proporcionado por Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js"; //Inicializa Firebase
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js"; //Manejo de autenticacion de datos

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
export const auth = getAuth(app); //Obtiene servicio de autenticacion y exporta la instancia para usarla en otros archivos

// Prueba si Firebase está bien conectado en la consola
console.log("Firebase cargado correctamente:", app);
