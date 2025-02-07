import { task } from "./task-data.js"; // Importa las tareas desde el archivo JS

const STORAGE_KEY = "tasks";

export async function getTasks() {
    try {
        let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (!tasks || tasks.length === 0) {
            console.log("📌 No hay tareas en LocalStorage, cargando desde JSON...");
            const response = await fetch("https://tujulius29.github.io/data/tasks.json");

            if (!response.ok) throw new Error("No se pudo cargar tasks.json");

            tasks = await response.json();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        }

        return tasks;
    } catch (error) {
        console.error("❌ Error obteniendo las tareas:", error);
        document.dispatchEvent(new CustomEvent("error-occurred", { detail: error.message }));
        return [];
    }
}

export async function saveTask(task) {
    try {
        let tasks = await getTasks();
        tasks.push(task);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        document.dispatchEvent(new Event("task-updated"));
    } catch (error) {
        console.error("❌ Error guardando la tarea:", error);
        document.dispatchEvent(new CustomEvent("error-occurred", { detail: "guardando la tarea" }));
    }
}

export async function updateTask(updatedTask) {
    try {
        let tasks = await getTasks();
        tasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        document.dispatchEvent(new Event("task-updated"));
    } catch (error) {
        console.error("❌ Error actualizando la tarea:", error);
        document.dispatchEvent(new CustomEvent("error-occurred", { detail:"actualizando la tarea"}));
    }
}

export async function deleteTask(taskId) {
    try {
        let tasks = await getTasks();
        tasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        document.dispatchEvent(new Event("task-updated"));
    } catch (error) {
        console.error("❌ Error eliminando la tarea:", error);
        document.dispatchEvent(new CustomEvent("error-occurred", { detail:"eliminando la tarea" }));
    }
}
