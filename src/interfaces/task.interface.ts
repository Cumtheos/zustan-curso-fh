

//para objetos
export interface Task {
    id: string;
    title: string;
    status: TaskStatus;
}

// para un tipo
export type TaskStatus = "open" | "in-progress" | "done";