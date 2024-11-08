import { create } from "zustand";

type TAccount = {
  id: number;
  value: string;
  description: string;
  observations: string;
  status: boolean;
  bank: boolean;
  isOpen: boolean;
  onOpen: (id?: number) => void;
  onClose: () => void;
};

export const useAccountsStore = create<TAccount>((set) => ({
  id: 0,
  value: "",
  description: "",
  observations: "",
  status: false,
  bank: false,
  isOpen: false,
  onOpen: (id = 0) => set({ id, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
