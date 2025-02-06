import { tasks as defaultTasks } from "../data/task-data.js"; // ✅ Importamos la data estática

const STORAGE_KEY = "tasks";

export async function getTasks() {
    let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!tasks || tasks.length === 0) {
        // ✅ Usa `task-data.js` en lugar de `fetch()`
        console.log("📥 Cargando tareas desde task-data.js...");
        tasks = defaultTasks;

        // Guarda los datos en localStorage solo la primera vez
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    return tasks;
}

export async function saveTask(task) {
    let tasks = await getTasks();
    tasks.push(task);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    document.dispatchEvent(new Event("task-updated")); // 🔄 Notificar actualización
}

export async function updateTask(updatedTask) {
    let tasks = await getTasks();
    tasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    document.dispatchEvent(new Event("task-updated")); // 🔄 Notificar actualización
}

export async function deleteTask(taskId) {
    let tasks = await getTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    document.dispatchEvent(new Event("task-updated")); // 🔄 Notificar actualización
}
