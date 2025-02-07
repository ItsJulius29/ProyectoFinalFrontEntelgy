import { deleteTask, updateTask } from "../data/tasks.js";

class TaskItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                .task {
                    padding: 15px;
                    margin: 10px 0;
                    border-radius: 8px;
                    background: white;
                    color: black;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .task:hover {
                    transform: scale(1.02);
                    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
                }
                .completed {
                    background: #d4edda;
                    text-decoration: line-through;
                }
                .buttons {
                    display: flex;
                    gap: 10px;
                }
                button {
                    padding: 8px 12px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: background 0.3s;
                }
                .toggle-btn {
                    background: #28a745;
                    color: white;
                }
                .toggle-btn:hover {
                    background: #218838;
                }
                .delete-btn {
                    background: #dc3545;
                    color: white;
                }
                .delete-btn:hover {
                    background: #c82333;
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
