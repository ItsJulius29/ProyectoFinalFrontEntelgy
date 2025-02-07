class TaskFilter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                label {
                    font-weight: bold;
                    margin-right: 5px;
                }
                select {
                    padding: 5px;
                    font-size: 14px;
                }
            </style>
            <label for="filter">Filtrar tareas:</label>
            <select id="filter">
                <option value="all">Todas</option>
                <option value="pending">Pendientes</option>
                <option value="completed">Completadas</option>
            </select>
        `;

        // Evento para detectar cambios en el filtro
        this.shadowRoot.querySelector("#filter").addEventListener("change", this.applyFilter.bind(this));
    }

    applyFilter() {
        const filterValue = this.shadowRoot.querySelector("#filter").value;
        document.dispatchEvent(new CustomEvent("filter-changed", { detail: { filter: filterValue } }));
    }
}

customElements.define("task-filter", TaskFilter);
