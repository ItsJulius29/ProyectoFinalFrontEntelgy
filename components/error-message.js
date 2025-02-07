class ErrorMessage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

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
                    max-width: 400px;
                    text-align: center;
                }
            </style>
            <div class="error-container" id="error-message">⚠️ Error desconocido</div>
        `;

        document.addEventListener("error-occurred", (e) => this.showError(e.detail));
    }

    showError(errorDetail) {
        const errorBox = this.shadowRoot.querySelector("#error-message");

        let errorMessage = "⚠️ Error desconocido.";
        if (errorDetail.includes("tasks.json")) {
            errorMessage = "❌ No se pudo cargar la lista de tareas.";
        } else if (errorDetail.includes("guardando")) {
            errorMessage = "⚠️ No se pudo guardar la nueva tarea.";
        } else if (errorDetail.includes("actualizando")) {
            errorMessage = "⚠️ Hubo un problema al actualizar la tarea.";
        } else if (errorDetail.includes("eliminando")) {
            errorMessage = "⚠️ No se pudo eliminar la tarea.";
        }

        errorBox.textContent = errorMessage;
        errorBox.style.display = "block";

        setTimeout(() => {
            errorBox.style.display = "none";
        }, 5000);
    }
}

customElements.define("error-message", ErrorMessage);
