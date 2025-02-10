import { getTasks } from "../data/tasks.js"; //Importa getTasks() para obtener las tareas almacenadas en localStorage

class TaskList extends HTMLElement { //Crea un Web component para poder usarse como etiqueta HTML
    constructor() {
        super();
        this.attachShadow({ mode: "open" }); //Activa el Shadow DOM

        //Estructura HTML Y CSS del componente
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

        this.currentFilter = "all"; // Filtro por defecto mostrando todas las tareas
        this.taskUpdatedHandler = this.renderTasks.bind(this);
        this.filterChangedHandler = this.updateFilter.bind(this);
    }

    connectedCallback() {
        this.renderTasks(); // Renderiza al iniciar mostrando las tareas iniciales

        // Escuchar eventos de actualización de tareas
        document.addEventListener("task-updated", this.taskUpdatedHandler); //Se activa cuando se agrega, edita o elimina una tarea
        document.addEventListener("filter-changed", this.filterChangedHandler); //Se activa cuando el usuario cambia el filtro en task-filter
    }

    disconnectedCallback() { 
        // Remover eventos cuando el componente se elimina del DOM
        document.removeEventListener("task-updated", this.taskUpdatedHandler);
        document.removeEventListener("filter-changed", this.filterChangedHandler);
    }

    async updateFilter(e) { //Permite que la lista se actualice dinamicamente cuando el usuario cambia el filtro
        this.currentFilter = e.detail.filter;
        console.log(`📌 Filtro cambiado a: ${this.currentFilter}`);
        await this.renderTasks();
    }

    async renderTasks() {
        const tasks = await getTasks(); //Obtiene la lista de tareas
        console.log("📌 Tareas obtenidas para render:", tasks);

        if (!Array.isArray(tasks)) { //Si no es un array, muestra error y detiene la ejecucion
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

        filteredTasks.forEach(task => { //Asegura que solo se muestren las tareas que coinciden con el filtro seleccionado
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

customElements.define("task-list", TaskList); //Se registra como un Web Component para poder usarlo en index.html
