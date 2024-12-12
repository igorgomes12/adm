import { create } from "zustand";

interface ICardAdm {
  id: number | null;
  isOpen: boolean;
  mode: "add" | "edit" | "delete";
  onOpen: (mode: "add" | "edit" | "delete", id?: number) => void;

  onClose: () => void;
}

export const useCardAdm = create<ICardAdm>((set) => ({
  id: 0,
  isOpen: false,
  mode: "add",
  onOpen: (mode, id) => set({ isOpen: true, mode, id: id ?? null }),
  onClose: () => set({ isOpen: false, id: null, mode: "add" }),
}));
