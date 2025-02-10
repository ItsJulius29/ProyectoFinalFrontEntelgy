import { saveTask } from "../data/tasks.js"; //Importa desde tasks.js permitiendo guardar tareas en el localStorage

class TaskForm extends HTMLElement { //Crea un Web component para poder usarse como etiqueta HTML
    constructor() {
        super();
        this.attachShadow({ mode: "open" });//Activa el Shadow DOM

        //Estructura HTML Y CSS del formulario
        this.shadowRoot.innerHTML = `
            <style>
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    margin: auto;
                    max-width: 500px;
                    padding-left:10%;
                    padding-right:10%;
                }
                h1{
                    color:SkyBlue;
                    text-align: center;
                    justify-content: space-between;
                    font-size: 2.5rem;
                }
                p{
                    margin:15px;
                }
                input, textarea {
                    width: 90%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    font-size: 1rem;
                    margin:10px;
                }
                button {
                    padding: 10px;
                    border: none;
                    border-radius: 5px;
                    background: #3498db;
                    color: white;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background 0.3s;
                    width:90%;
                    height:40px;
                    margin-left:5%;
                    margin-right:5%;
                    margin-botton:15px;
                }
                button:hover {
                    background: #2980b9;
                }
            </style>

            <form id="task-form">
                <h1>Nueva Tarea</h1>
                <p>Agrega un título a la tarea: <input type="text" id="task-title" placeholder="Título de la tarea" required></p>
                <p>Agrega la descripción de la tarea: <textarea id="task-desc" placeholder="Descripción"></textarea></p>
                
                <button type="submit">Agregar Tarea</button>
            </form>
        `;

        //Escucha el evento submit en el formulario
        // cuando el usuario envia formulario ejecuta this.addTask(),
        // .bind(this) asegura que this se refiera al Web Component.
        this.shadowRoot.querySelector("#task-form").addEventListener("submit", this.addTask.bind(this));
    }

    async addTask(event) {
        event.preventDefault(); //Evita que la página recargue al enviar el formulario

        //Obtiene el valor del titulo y la descripcion ingresados
        const title = this.shadowRoot.querySelector("#task-title").value;
        const description = this.shadowRoot.querySelector("#task-desc").value;

        if (title.trim() === "") return; //Si no hay titulo no hace nada

        const newTask = {
            id: Date.now().toString(), //Crea un id unico generado 
            title,
            description,
            completed: false
        };

        await saveTask(newTask); // Guardamos la tarea en localStorage
        document.dispatchEvent(new Event("task-updated")); // Actualiza la lista de tareas
        this.shadowRoot.querySelector("#task-form").reset(); //Limpia el formulario despues de agregar la tarea
    }
}

customElements.define("task-form", TaskForm); //Registra el Web Component task-form para poder usarlo en cualquier parte del HTML
