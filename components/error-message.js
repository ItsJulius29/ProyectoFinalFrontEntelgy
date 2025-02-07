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
                }
            </style>
            <div class="error-container" id="error-message"></div>
        `;

        document.addEventListener("error-occurred", (e) => this.showError(e.detail));
    }

    showError(message) {
        const errorBox = this.shadowRoot.querySelector("#error-message");
        errorBox.textContent = `⚠️ Error: ${message}`;
        errorBox.style.display = "block";

        setTimeout(() => {
            errorBox.style.display = "none";
        }, 5000);
    }
}

customElements.define("error-message", ErrorMessage);
