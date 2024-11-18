import { create } from "zustand";

export type TModuleZustand = {
  id: number | null;
  isOpen: boolean;
  mode: "create" | "edit" | "delete";
  onOpen: (mode: "create" | "edit" | "delete", id?: number) => void;
  onClose: () => void;
};

export const useModuleZustand = create<TModuleZustand>((set) => ({
  isOpen: false,
  id: null,
  mode: "create" as "create" | "edit" | "delete",
  onOpen: (mode, id) => set({ isOpen: true, id, mode }),
  onClose: () => set({ isOpen: false, id: null }),
}));
