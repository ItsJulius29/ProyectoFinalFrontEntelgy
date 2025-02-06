class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 80%;
                    background-color: var(--black-color);
                    color: var(--white-color);
                    text-align: center;
                    padding: 15px;
                    font-size: 1.5em;
                }
            </style>
            <header>
                <slot></slot>
            </header>
        `;
    }
}
customElements.define("header-component", HeaderComponent);
