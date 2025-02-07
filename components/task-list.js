import { getTasks, deleteTask, updateTask } from "../data/tasks.js";

class TaskList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                ul {
                    list-style: none;
                    padding: 0;
                }
                task-item {
                    display: block;
                    padding: 10px;
                    border: 1px solid #ccc;
                    margin: 5px 0;
                    background: white;
                    color: black;
                }
            </style>
            <ul id="task-list"></ul>
        `;

        this.currentFilter = "all"; // Filtro por defecto: todas las tareas
    }

    async connectedCallback() {
        this.renderTasks(); // Renderiza las tareas al iniciar
    
        // Escuchar evento para actualizar lista cuando se agregan o eliminan tareas
        document.addEventListener("task-updated", () => {
            console.log("📌 Evento 'task-updated' detectado, renderizando tareas...");
            this.renderTasks();
        });

        // Escuchar evento de filtro cambiado
        document.addEventListener("filter-changed", (e) => {
            this.currentFilter = e.detail.filter;
            console.log(`📌 Filtro cambiado a: ${this.currentFilter}`);
            this.renderTasks();
        });
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
