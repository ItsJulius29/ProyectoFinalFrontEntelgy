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

        document.addEventListener("error-occurred", (e) => this.showError(e.detail));
    }

    showError(errorDetail) {
        const errorBox = this.shadowRoot.querySelector("#error-message");

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

customElements.define("error-message", ErrorMessage);
