import { deleteTask, updateTask } from "../data/tasks.js"; //Importa las funciones que permiten modificar los datos de las tareas en localStorage

class TaskItem extends HTMLElement { //Crea un Web component para poder usarse como etiqueta HTML
    constructor() {
        super();
        this.attachShadow({ mode: "open" }); //Activa el Shadow DOM

        //Estructura HTML Y CSS del componente
        this.shadowRoot.innerHTML = `
            <style>
                .task {
                    padding: 15px;
                    margin: 10px 0;
                    border-radius: 8px;
                    background: white;
                    color: black;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                    position: relative;
                }
                .task.editing {
                    min-height: 150px;
                    margin-bottom: 20px; /* Da espacio entre tareas cuando el formulario está abierto */
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
                .edit-btn {
                    background: #ffc107;
                    color: black;
                }
                .edit-btn:hover {
                    background: #e0a800;
                }
                .delete-btn {
                    background: #dc3545;
                    color: white;
                }
                .delete-btn:hover {
                    background: #c82333;
                }
                .edit-form {
                    display: none;
                    width: 100%;
                    background: white;
                    padding: 10px;
                    border-radius: 5px;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    margin-top: 10px;
                }
                .edit-form input, .edit-form textarea {
                    width: 70%;
                    padding: 8px;
                    margin-bottom: 5px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    margin-left:15%;
                    margin-right:15%;
                }
                .edit-form button {
                    width: 80%;
                    margin-top: 5px;
                    margin-left:10%;
                    margin-right:10%;
                    margin-bottom:30px;
                }
            </style>
            <div class="task">
                <h3 id="title"></h3>
                <p id="description"></p>
                <div class="buttons">
                    <button class="edit-btn">Editar</button>
                    <button class="toggle-btn"></button>
                    <button class="delete-btn">Eliminar</button>
                </div>
                <div class="edit-form">
                    <input type="text" id="edit-title" placeholder="Nuevo título">
                    <textarea id="edit-description" placeholder="Nueva descripción"></textarea>
                    <button class="save-edit-btn">Guardar</button>
                </div>
            </div>
        `;
    }

    connectedCallback() { //Se ejecuta cuando el componente se agrega al DOM
        this.render();
        this.shadowRoot.querySelector(".delete-btn").addEventListener("click", this.deleteTask.bind(this));
        this.shadowRoot.querySelector(".toggle-btn").addEventListener("click", this.toggleComplete.bind(this));
        this.shadowRoot.querySelector(".edit-btn").addEventListener("click", this.toggleEditForm.bind(this));
        this.shadowRoot.querySelector(".save-edit-btn").addEventListener("click", this.saveEdit.bind(this));
    }

    render() { //Obtiene los atributos de data y actualiza el contenido dinamicamente
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

    toggleEditForm() { //Muestra u oculta el formulario de edicion
        const taskElement = this.shadowRoot.querySelector(".task");
        const form = this.shadowRoot.querySelector(".edit-form");
        
        // Alternar la clase "editing" para aumentar la altura del contenedor
        if (form.style.display === "block") {
            form.style.display = "none";
            taskElement.classList.remove("editing");
        } else {
            form.style.display = "block";
            taskElement.classList.add("editing");
        }

        // Rellenar el formulario con los datos actuales
        this.shadowRoot.querySelector("#edit-title").value = this.getAttribute("data-title");
        this.shadowRoot.querySelector("#edit-description").value = this.getAttribute("data-description");
    }

    async saveEdit() {

        //Obtiene los valores del formulario
        const newTitle = this.shadowRoot.querySelector("#edit-title").value;
        const newDescription = this.shadowRoot.querySelector("#edit-description").value;

        if (!newTitle.trim()) return; // Evitar guardar si el título está vacío

        //Crea un objeto con los datos actualizados
        const updatedTask = {
            id: this.getAttribute("data-id"),
            title: newTitle,
            description: newDescription,
            completed: this.getAttribute("data-completed") === "true"
        };

        //Llama para guardar los datos 
        await updateTask(updatedTask);

        // Actualizar atributos del componente
        this.setAttribute("data-title", newTitle);
        this.setAttribute("data-description", newDescription);

        this.render(); // Vuelve a renderizar la tarea con los cambios

        // Ocultar el formulario y restablecer la altura de la tarea
        this.shadowRoot.querySelector(".edit-form").style.display = "none";
        this.shadowRoot.querySelector(".task").classList.remove("editing");

        document.dispatchEvent(new Event("task-updated")); // Notificar que la tarea se actualizó
    }

    deleteTask() { 
        deleteTask(this.getAttribute("data-id")); // Elimina del LocalStorage
        document.dispatchEvent(new Event("task-updated")); // Notifica a la UI que se actualizó
    }

    toggleComplete() {

        //Obtiene los atributos de la tarea e invierte el estado completed
        const updatedTask = {
            id: this.getAttribute("data-id"),
            title: this.getAttribute("data-title"),
            description: this.getAttribute("data-description"),
            completed: this.getAttribute("data-completed") === "false"
        };

        //Guarda la tarea actualizada en localStorage
        updateTask(updatedTask);
        document.dispatchEvent(new Event("task-updated")); // Notifica cambios en la UI
    }
}

customElements.define("task-item", TaskItem); //Registro del Web Component task-item para usar en cualquier parte del HTML
