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
    }

    async connectedCallback() {
        await this.renderTasks(); // 🔄 Renderiza las tareas al iniciar

        document.addEventListener("task-updated", async () => {
            console.log("📌 Evento 'task-updated' detectado, renderizando tareas...");
            await this.renderTasks();
        });
    }

    async renderTasks() {
        const tasks = await getTasks();
        console.log("📌 Tareas obtenidas para renderizar:", tasks);

        const taskList = this.shadowRoot.querySelector("#task-list");
        taskList.innerHTML = ""; // Limpiamos antes de agregar

        tasks.forEach(task => {
            const taskItem = document.createElement("task-item");
            taskItem.setAttribute("data-id", task.id);
            taskItem.setAttribute("data-title", task.title);
            taskItem.setAttribute("data-description", task.description);
            taskItem.setAttribute("data-completed", task.completed);
            taskList.appendChild(taskItem);
        });

        console.log("📌 Tareas renderizadas en el DOM correctamente");
    }
}

customElements.define("task-list", TaskList);
