import { create } from 'zustand'
import { persist } from 'zustand/middleware';


interface Bear {
    id: number;
    name: string;
}


//no se define en el main
interface BearState {
    bears: Bear[];
    blackBears: number;
    polarBears: number;
    pandaBears: number;
    increaseBlackBears: (by: number) => void;
    increasePolarBears: (by: number) => void;
    increasePandaBears: (by: number) => void;

    doNothing: () => void;

    //metodos objetos anidados
    addBear: () => void;
    clearBears: () => void;


    // //computar
    // computed: {
    //     //puedes hacer un get
    //     totalBears: number;
    // }
    totalBears: () => number;
}



//en javascript no se coloca create() es solo create

export const useBearStore = create<BearState>()(
    persist(

        (set, get) => ({
            //propiedades

            //valores iniciales
            blackBears: 10,
            polarBears: 5,
            pandaBears: 1,
            //lista de objetos
            bears: [
                {
                    id: 1,
                    name: 'Oso #1'
                }
            ],
            //funcionalidades
            increaseBlackBears: (by: number) => set((state) => ({ blackBears: state.blackBears + by })),
            increasePolarBears: (by: number) => set((state) => ({ polarBears: state.polarBears + by })),
            increasePandaBears: (by: number) => set((state) => ({ pandaBears: state.pandaBears + by })),

            //renderiza inecesariamente ya que el objeto no cambia, objeto anidado por eso es necesario el useShallow
            doNothing: () => set((state) => ({ bears: [...state.bears] })),
            //metodos objetos anidaos
            addBear: () => set((state) => ({
                bears: [...state.bears, { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}` }]
            })),
            clearBears: () => set({ bears: [] }),

            //computed
            // computed: {
            //     //CREAMOS UN GET Y LO ponemos en el estado "get"
            //     get totalBears(): number {
            //         return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
            //     }
            // }

            //esto se debe a que al agregarle middleware tuvimos que hacer una funcion
            totalBears: () => {
                return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
            }
        }), { name: "bears-store" }

    )

);
// export const useBearStore = create<BearState>()((set, get) => ({
//     //propiedades

//     //valores iniciales
//     blackBears: 10,
//     polarBears: 5,
//     pandaBears: 1,
//     //lista de objetos
//     bears: [
//         {
//             id: 1,
//             name: 'Oso #1'
//         }
//     ],
//     //funcionalidades
//     increaseBlackBears: (by: number) => set((state) => ({ blackBears: state.blackBears + by })),
//     increasePolarBears: (by: number) => set((state) => ({ polarBears: state.polarBears + by })),
//     increasePandaBears: (by: number) => set((state) => ({ pandaBears: state.pandaBears + by })),

//     //renderiza inecesariamente ya que el objeto no cambia, objeto anidado por eso es necesario el useShallow
//     doNothing: () => set((state) => ({ bears: [...state.bears] })),
//     //metodos objetos anidaos
//     addBear: () => set((state) => ({
//         bears: [...state.bears, { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}` }]
//     })),
//     clearBears: () => set({ bears: [] }),

//     //computed
//     computed: {
//         //CREAMOS UN GET Y LO ponemos en el estado "get"
//         get totalBears(): number {
//             return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
//         }
//     }
// }));
