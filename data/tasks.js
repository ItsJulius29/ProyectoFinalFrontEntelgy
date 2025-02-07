import { tasks as initialTasks } from "./task-data.js";

const STORAGE_KEY = "tasks";

export async function getTasks() {
    try {
        let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (!Array.isArray(tasks) || tasks.length === 0) {
            console.warn("⚠️ No hay tareas en LocalStorage, cargando desde task-data.js...");
            tasks = [...initialTasks];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        }

        return tasks;
    } catch (error) {
        console.error("❌ Error al obtener las tareas:", error);
        document.dispatchEvent(new CustomEvent("error-occurred", { detail: "Error obteniendo las tareas" }));
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
        console.error("❌ Error al guardar la tarea:", error);
        document.dispatchEvent(new CustomEvent("error-occurred", { detail: "Error guardando la tarea" }));
    }
}

export async function updateTask(updatedTask) {
    try {
        let tasks = await getTasks();
        const index = tasks.findIndex(task => task.id === updatedTask.id);
        if (index !== -1) {
            tasks[index] = updatedTask;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
            document.dispatchEvent(new Event("task-updated"));
        }
    } catch (error) {
        console.error("❌ Error al actualizar la tarea:", error);
        document.dispatchEvent(new CustomEvent("error-occurred", { detail: "Error actualizando la tarea" }));
    }
}

export async function deleteTask(taskId) {
    try {
        let tasks = await getTasks();
        const newTasks = tasks.filter(task => task.id !== taskId);
        if (tasks.length !== newTasks.length) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
            document.dispatchEvent(new Event("task-updated"));
        }
    } catch (error) {
        console.error("❌ Error al eliminar la tarea:", error);
        document.dispatchEvent(new CustomEvent("error-occurred", { detail: "Error eliminando la tarea" }));
    }
}
