class TaskFilter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                .filter-container {
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 10px;
                    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    width: 100%;
                    max-width: 400px;
                    margin: auto;
                }
                label {
                    font-weight: bold;
                    font-size: 1.1rem;
                    color: #333;
                }
                select {
                    padding: 10px;
                    font-size: 1rem;
                    border: 2px solid #ddd;
                    border-radius: 5px;
                    background: white;
                    cursor: pointer;
                    width: 180px;
                    transition: all 0.3s;
                    margin:20px;
                    
                }
                select:hover {
                    border-color: #3498db;
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
