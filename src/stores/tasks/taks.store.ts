import { StateCreator, create } from "zustand";
import { v4 as uuidv4 } from "uuid";
//el type sirve para que no importe un archivo fisico
import type { Task, TaskStatus } from "../../interfaces";
import { devtools, persist } from "zustand/middleware";
// import { produce } from "immer";

//para evitar usar operador express y para trasmitir se podria usar produce pero se utilizo el middleware
import { immer } from "zustand/middleware/immer";

interface TaskState {

    draggingTaskId?: string;
    // para definir un objeto
    // si quiero ir directamente a la tarea 3 puedo hacerlo en un objeto pero en un array tengo que barrer todo el array
    // al obtenerla es mas dificil pero actualizarlo es mas facil
    tasks: Record<string, Task>;
    getTaskByStatus: (status: TaskStatus) => Task[];

    addTask: (title: string, status: TaskStatus) => void;

    setDraggingTaskId: (taskId: string) => void;
    removeDraggingTaskId: () => void;

    //cambiar el estado de la tarea
    changeTaskStatus: (taskId: string, status: TaskStatus) => void;
    onTaskDrop: (status: TaskStatus) => void;
    totalTasks: () => number;
}

// para soluccionar lo de immer -> ["zustand/immer", never]]
const storeApi: StateCreator<TaskState, [["zustand/immer", never]]> = (set, get) => ({
    draggingTaskId: undefined,
    tasks: {
        "ABC-1": { id: "ABC-1", title: "Task 1", status: "open" },
        "ABC-2": { id: "ABC-2", title: "Task 2", status: "in-progress" },
        "ABC-3": { id: "ABC-3", title: "Task 3", status: "open" },
        "ABC-4": { id: "ABC-4", title: "Task 4", status: "open" },
    },

    getTaskByStatus: (status: TaskStatus) => {
        const tasks = get().tasks;
        return Object.values(tasks).filter(task => task.status === status);
    },


    addTask: (title: string, status: TaskStatus) => {

        const newTask = { id: uuidv4(), title, status }


        // cuando lo hago con => ({}), se retorna un valor
        // codigo mutante
        //immer aplicado
        set(state => {
            state.tasks[newTask.id] = newTask;
        })

        //? requiere npm install immer
        // con immer, es una funcion no retorna nada
        //es bueno pero instalamos una libreria
        // set(produce((state: TaskState) => {
        // codigo mutante
        //     state.tasks[newTask.id] = newTask;
        // }))

        //? forma nativa de zustand
        //setea y devuelve un nuevo estado
        // set(state =>({
        //     tasks:{
        //         //estado anterior, ya que son objetos anidados 
        //         //sin el express no se guarda los estados
        //         ...state.tasks,
        //         //agrea la nueva tarea
        //         [newTask.id]: newTask
        //     }
        // }))
    },
    setDraggingTaskId: (taskId: string) => {
        set({ draggingTaskId: taskId })
    },
    removeDraggingTaskId: () => {
        set({ draggingTaskId: undefined })
    },
    changeTaskStatus: (taskId: string, status: TaskStatus) => {
        // const task = get().tasks[taskId];
        // task.status = status

        set(state => {
            state.tasks[taskId] = {
                ...state.tasks[taskId],
                status
            };
        })
        // set((state) => ({
        //     tasks: {
        //         //para mantener las anteriores
        //         ...state.tasks,
        //         [taskId]: task,
        //     }
        // }))
    },
    onTaskDrop: (status: TaskStatus) => {
        const taskID = get().draggingTaskId;
        if (!taskID) return;

        get().changeTaskStatus(taskID, status);
        get().removeDraggingTaskId();
    },
    totalTasks:()=>{
        return Object.keys(get().tasks).length;
    }
})


export const useTaskStore = create<TaskState>()(
    devtools(
        //siempre mejor persist antes de immer para evitar poner el tipado extra
        persist(
            immer(storeApi),
            {name: "task-store"}
        )
    )
);