import {
    StateStorage, //typado de storageApi
    createJSONStorage //para persistir la informacion en sessionStorage
} from "zustand/middleware";

const firebaseUrl = "https://zustand-storage-e5906-default-rtdb.firebaseio.com/zustand";

const storageApi: StateStorage = {
    getItem: async function (name: string): Promise<string | null> {
        try {
            const data = await fetch(`${firebaseUrl}/${name}.json`).then(res => res.json());
            //LO GRABA COMO STRING
            return JSON.stringify(data);
        } catch (error) {
            throw error;
        }
    },
    setItem: async function (name: string, value: string): Promise<void> {
        //condicion de carrera
        //podemos hacerla con axios
        //const controller = new AbortController();
        //signal: controllr.signal
        //codigo
        //controller.abort()
        await fetch(`${firebaseUrl}/${name}.json`, {
            method: "PUT",
            body: value
        }).then(res => res.json());

        // console.log(data);

        return;
    },
    removeItem: function (name: string): void | Promise<void> {
        console.log("removeItem", { name })
    }
}


export const firebaseStorage = createJSONStorage(() => storageApi);