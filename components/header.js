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
                    padding: 30px;
                    font-size: 1.6rem;
                    text-aling:center;
                }
                @media screen and (max-width: 768px) {
                    :host {
                        padding: 20px;
                        font-size: 1.2rem;
                    }
                }

                @media screen and (max-width: 480px) {
                    :host {
                        padding: 30px;
                        font-size: 0.8rem;
                    }
                }
            </style>
            
            <header>
                <slot></slot>
            </header>
        `;
    }
}
customElements.define("header-component", HeaderComponent);
