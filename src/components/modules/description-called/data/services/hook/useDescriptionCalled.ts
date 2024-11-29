import { create } from "zustand";

interface DescriptionCalledState {
  isOpen: boolean;
  mode: "add" | "edit" | "delete";
  id: number;
  onOpen: (mode: "add" | "edit" | "delete", id?: number) => void;
  onClose: () => void;
}

export const useDescriptionCalledStore = create<DescriptionCalledState>(
  (set) => ({
    isOpen: false,
    mode: "add", // Default mode
    id: 0, // Default ID
    onOpen: (mode, id = 0) => {
      console.log(`Opening modal - Mode: ${mode}, ID: ${id}`);
      set({ isOpen: true, mode, id });
    },
    onClose: () => set({ isOpen: false, mode: "add", id: 0 }),
  })
);
