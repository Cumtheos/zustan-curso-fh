//al ponerle type evitamos que se importe a otro lado
import { type StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import { customSessionStorage } from "../storages/session.storage";
import { firebaseStorage } from "../storages/firebase.storage";

interface PersonState {
    firstName: string;
    lastName: string;
}

interface Actions {
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
}

const storeAPi: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> = (set) => ({
    firstName: "",
    lastName: "",
    setFirstName: (value: string) => set({ firstName: value }, false, "setFirstName"),
    setLastName: (value: string) => set({ lastName: value }, false, "setLastName"),
})



export const usePersonStore = create<PersonState & Actions>()(
    devtools(

        //localstorage, en sessionstorage se elimina cuando se cierra el navegador
        persist(
            storeAPi,
            //es el name que se llama en el localstorage
            {
                name: "person-storage",
                //sesion storage
                storage: firebaseStorage,
                
            }
        )
    )

);

`
console
crear proyecto
compilacion
realtime database

`