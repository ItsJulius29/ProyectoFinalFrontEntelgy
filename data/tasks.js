const STORAGE_KEY = "tasks";

export async function getTasks() {
    let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!tasks || tasks.length === 0) {
        try {
            const response = await fetch("https://tujulius29.github.io/data/tasks.json", { cache: "reload" });
            if (!response.ok) throw new Error("No se pudo cargar tasks.json");
            tasks = await response.json();

            // Guarda los datos del JSON en localStorage solo la primera vez
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        } catch (error) {
            console.error("Error cargando las tareas:", error);
            return [];
        }
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
