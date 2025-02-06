import { saveTask } from "../data/tasks.js";

class TaskForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <form id="task-form">
                <input type="text" id="task-title" placeholder="Título de la tarea" required>
                <textarea id="task-desc" placeholder="Descripción"></textarea>
                <button type="submit">Agregar Tarea</button>
            </form>
        `;

        this.shadowRoot.querySelector("#task-form").addEventListener("submit", this.addTask.bind(this));
    }

    async addTask(event) {
        event.preventDefault();
    
        const title = this.shadowRoot.querySelector("#task-title").value;
        const description = this.shadowRoot.querySelector("#task-desc").value;
    
        if (title.trim() === "") return;
    
        const newTask = {
            id: Date.now().toString(),
            title,
            description,
            completed: false
        };

        await saveTask(newTask); // Guardamos la tarea
        document.dispatchEvent(new Event("task-updated")); // 🔄 Actualiza la lista
        this.shadowRoot.querySelector("#task-form").reset();
    }
}

customElements.define("task-form", TaskForm);
