import { create } from "zustand"

export const useModalLogin = create((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false})
}))

