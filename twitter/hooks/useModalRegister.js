import { create } from "zustand"

export const useModalRegister = create((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false})
}))

