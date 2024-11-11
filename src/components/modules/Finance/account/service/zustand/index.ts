import { create } from "zustand";

type TAccount = {
  id: number;
  value: string;
  description: string;
  observation: string;
  status: boolean;
  bank: boolean;
  isOpen: boolean;
  searchTerm: string;
  setSearchTerm: (term: React.SetStateAction<string>) => void;
  mode: "default" | "delete";
  onOpen: (mode: "default" | "delete", id?: number) => void;
  onClose: () => void;
};

export const useAccountsStore = create<TAccount>((set) => ({
  id: 0,
  value: "",
  description: "",
  observation: "",
  status: false,
  bank: false,
  isOpen: false,
  searchTerm: "",
  setSearchTerm: (term) =>
    set((state) => ({
      searchTerm: typeof term === "function" ? term(state.searchTerm) : term,
    })),
  mode: "default",
  onOpen: (mode, id = 0) => set({ id, isOpen: true, mode }),
  onClose: () => set({ isOpen: false }),
}));
