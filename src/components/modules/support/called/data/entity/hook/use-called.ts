import { create } from "zustand";

type TCalled = {
  id: number | null;
  isOpen: boolean;
  mode: "create" | "delete" | "edit";
  onOpen: (mode: "create" | "delete" | "edit", id?: number) => void;
  onClose: () => void;
};

export const useCalledStore = create<TCalled>((set) => ({
  id: 0,
  isOpen: false,
  mode: "create",
  onOpen: (mode, id = 0) => set({ id, isOpen: true, mode }),
  onClose: () => set({ isOpen: false }),
}));
