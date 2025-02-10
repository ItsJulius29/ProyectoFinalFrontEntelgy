import { tasks as initialTasks } from "./task-data.js"; /* Importa tasks desde task-data y lo renombra initialTaks */

const STORAGE_KEY = "tasks"; //Constante que almacena el nombre de la clave en LocalStorage

export async function getTasks() {//Obtiene las tareas desde localStorage 
    try {

        let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)); //Obtiene las tareas guardadas en localStorage

        if (!Array.isArray(tasks) || tasks.length === 0) { //Si no hay tareas carga las tareas desde task-data
            console.warn("⚠️ No hay tareas en LocalStorage, cargando desde task-data.js...");
            tasks = [...initialTasks];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));// Guarda la lista en localStorage
        }
        return tasks;

    } catch (error) { //Si hay error lo muestra en la consola y envia el evento error-ocurred
        console.error("❌ Error al obtener las tareas:", error);
        document.dispatchEvent(new CustomEvent("error-occurred", { detail: "Error obteniendo las tareas" }));
        return [];
    }
}

export async function saveTask(task) {//Agrega una nueva tarea y la guarda en localStorage
    try {
        let tasks = await getTasks(); //Obtiene la lista de tareas existentes
        tasks.push(task); // Añade la nueva tarea
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));// Guarda la lista en localStorage
        document.dispatchEvent(new Event("task-updated"));

    } catch (error) { //Si hay error lo muestra en la consola y envia el evento error-ocurred
        console.error("❌ Error al guardar la tarea:", error);
        document.dispatchEvent(new CustomEvent("error-occurred", { detail: "Error guardando la tarea" }));
    }
}

export async function updateTask(updatedTask) {//Modifica una tarea existente
    try {
        let tasks = await getTasks(); //Obtiene la lista de tareas existentes
        const index = tasks.findIndex(task => task.id === updatedTask.id); //Busca la tarea que debe actualizarse
        if (index !== -1) { //Si se encuentra, reemplaza la tarea con updatedTask
            tasks[index] = updatedTask;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));// Guarda la lista actualizada en localStorage
            document.dispatchEvent(new Event("task-updated")); //Dispara task-updated para actualizar la UI
        }
    } catch (error) {//Si hay error lo muestra en la consola y envia el evento error-ocurred
        console.error("❌ Error al actualizar la tarea:", error);
        document.dispatchEvent(new CustomEvent("error-occurred", { detail: "Error actualizando la tarea" }));
    }
}

export async function deleteTask(taskId) {//Elimina una tarea de la lista
    try {
        let tasks = await getTasks(); //Obtiene la lista de tareas existentes
        const newTasks = tasks.filter(task => task.id !== taskId); //Filtra las tareas y elimina la que tiene el id especificado
        if (tasks.length !== newTasks.length) {  //Si hubo un cambio en la lista, se actualiza localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
            document.dispatchEvent(new Event("task-updated")); //Dispara task-updated para actualizar la UI
        }
    } catch (error) {
        console.error("❌ Error al eliminar la tarea:", error);
        document.dispatchEvent(new CustomEvent("error-occurred", { detail: "Error eliminando la tarea" }));
    }
}
