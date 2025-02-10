
class ErrorMessage extends HTMLElement { //Defini un Web Component para mostrar mensajes de error en la UI
    constructor() {
        super(); //Llama al constructor de HTMLElement
        this.attachShadow({ mode: "open" }); //Activa el Shadow DOM

        //Estructura HTML Y CSS del componente
        this.shadowRoot.innerHTML = `
            <style>
                .error-container {
                    display: none;
                    background-color: #ffcccc;
                    color: #b00000;
                    padding: 10px;
                    border: 1px solid #b00000;
                    margin: 10px 0;
                    font-weight: bold;
                    border-radius: 5px;
                    max-width: 500px;
                    text-align: center;
                    animation: fadeIn 0.3s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            </style>
            <div class="error-container" id="error-message">⚠️ Error desconocido</div>
        `;

        document.addEventListener("error-occurred", (e) => this.showError(e.detail)); //Escucha eventos personalizados de error en toda la aplicacion
    }

    showError(errorDetail) {
        const errorBox = this.shadowRoot.querySelector("#error-message"); //Obtiene el div donde se mostrará el error

        let errorMessage = "⚠️ Error desconocido.";
        if (errorDetail.includes("tareas")) {
            errorMessage = "❌ No se pudieron cargar las tareas.";
        } else if (errorDetail.includes("guardar")) {
            errorMessage = "⚠️ Hubo un problema al guardar la tarea.";
        } else if (errorDetail.includes("actualizar")) {
            errorMessage = "⚠️ No se pudo actualizar la tarea.";
        } else if (errorDetail.includes("eliminar")) {
            errorMessage = "⚠️ No se pudo eliminar la tarea.";
        }

        errorBox.textContent = errorMessage;
        errorBox.style.display = "block";

        setTimeout(() => {
            errorBox.style.display = "none";
        }, 5000);
    }
}

customElements.define("error-message", ErrorMessage); //Registra el Web Component con el nombre "error message" para poder usarlo en index.html
