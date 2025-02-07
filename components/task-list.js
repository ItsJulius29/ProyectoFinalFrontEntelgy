import { getTasks } from "../data/tasks.js";

class TaskList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    width: 100%;
                }
                task-item {
                    display: block;
                    padding: 15px;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    background: white;
                    color: black;
                    transition: transform 0.2s;
                }
                task-item:hover {
                    transform: scale(1.02);
                }
            </style>
            <ul id="task-list"></ul>
        `;

        this.currentFilter = "all"; // Filtro por defecto
        this.taskUpdatedHandler = this.renderTasks.bind(this);
        this.filterChangedHandler = this.updateFilter.bind(this);
    }

    connectedCallback() {
        this.renderTasks(); // Renderiza al iniciar

        // Escuchar eventos de actualización de tareas
        document.addEventListener("task-updated", this.taskUpdatedHandler);
        document.addEventListener("filter-changed", this.filterChangedHandler);
    }

    disconnectedCallback() {
        // Remover eventos cuando el componente se elimina del DOM
        document.removeEventListener("task-updated", this.taskUpdatedHandler);
        document.removeEventListener("filter-changed", this.filterChangedHandler);
    }

    async updateFilter(e) {
        this.currentFilter = e.detail.filter;
        console.log(`📌 Filtro cambiado a: ${this.currentFilter}`);
        await this.renderTasks();
    }

    async renderTasks() {
        const tasks = await getTasks();
        console.log("📌 Tareas obtenidas para render:", tasks);

        if (!Array.isArray(tasks)) {
            console.error("❌ Error: `tasks` no es un array:", tasks);
            return;
        }

        const taskList = this.shadowRoot.querySelector("#task-list");
        taskList.innerHTML = ""; // Limpiar lista antes de renderizar

        // Aplicar filtro antes de renderizar
        const filteredTasks = tasks.filter(task => {
            if (this.currentFilter === "completed") return task.completed;
            if (this.currentFilter === "pending") return !task.completed;
            return true; // Mostrar todas si es "all"
        });

        filteredTasks.forEach(task => {
            const taskItem = document.createElement("task-item");
            taskItem.setAttribute("data-id", task.id);
            taskItem.setAttribute("data-title", task.title);
            taskItem.setAttribute("data-description", task.description);
            taskItem.setAttribute("data-completed", task.completed);
            taskList.appendChild(taskItem);
        });

        console.log("📌 Tareas renderizadas con filtro:", this.currentFilter);
    }
}

customElements.define("task-list", TaskList);
