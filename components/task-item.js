import { deleteTask, updateTask } from "../data/tasks.js";

class TaskItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                .task {
                    padding: 10px;
                    margin: 5px 0;
                    border: 1px solid #ccc;
                    background: white;
                    color: black;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .completed {
                    background: lightgreen;
                    text-decoration: line-through;
                }
                button {
                    margin-left: 10px;
                }
            </style>
            <div class="task">
                <h3 id="title"></h3>
                <p id="description"></p>
                <button class="toggle-btn"></button>
                <button class="delete-btn">Eliminar</button>
            </div>
        `;
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector(".delete-btn").addEventListener("click", this.deleteTask.bind(this));
        this.shadowRoot.querySelector(".toggle-btn").addEventListener("click", this.toggleComplete.bind(this));
    }

    render() {
        const title = this.getAttribute("data-title");
        const description = this.getAttribute("data-description");
        const completed = this.getAttribute("data-completed") === "true";

        this.shadowRoot.querySelector("#title").textContent = title;
        this.shadowRoot.querySelector("#description").textContent = description;
        this.shadowRoot.querySelector(".toggle-btn").textContent = completed ? "Desmarcar" : "Completar";

        if (completed) {
            this.shadowRoot.querySelector(".task").classList.add("completed");
        } else {
            this.shadowRoot.querySelector(".task").classList.remove("completed");
        }
    }

    deleteTask() {
        deleteTask(this.getAttribute("data-id")); // Elimina del LocalStorage
        document.dispatchEvent(new Event("task-updated")); // 🔄 Notifica a la UI que se actualizó
    }
    

    toggleComplete() {
        const updatedTask = {
            id: this.getAttribute("data-id"),
            title: this.getAttribute("data-title"),
            description: this.getAttribute("data-description"),
            completed: this.getAttribute("data-completed") === "false"
        };
    
        updateTask(updatedTask);
        document.dispatchEvent(new Event("task-updated")); // 🔄 Notifica cambios en la UI
    }
    
}

customElements.define("task-item", TaskItem);
