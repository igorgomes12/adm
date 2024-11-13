import { create } from "zustand";
import type {
  Priority,
  TypeCalled,
  TypeContact,
  TypeSolutions,
} from "../entities";

type TCalled = {
  id: number | null;
  isOpen: boolean;
  mode: "create" | "delete" | "edit";
  onOpen: (mode: "create" | "delete" | "edit", id?: number) => void;
  onClose: () => void;
  priority?: Priority;
  caller?: string;
  name?: string;
  description?: string;
  status?: boolean;
  type?: TypeCalled;
  contact?: TypeContact;
  system?: string | null;
  requested?: string;
  note?: string | null;
  response?: string | null;
  solutionType?: TypeSolutions;
  duration?: Date | null;
  completedAt?: Date | null;
  timestampFinally?: Date | null;
  createdAt?: Date | null;
  timestamp?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
};

// Hook de estado com Zustand
export const useCalledStore = create<TCalled>((set) => ({
  id: null,
  isOpen: false,
  mode: "create",
  onOpen: (mode, id = 0) => set({ id, isOpen: true, mode }),
  onClose: () => set({ isOpen: false }),
  priority: undefined,
  caller: undefined,
  name: undefined,
  description: undefined,
  status: undefined,
  type: undefined,
  contact: undefined,
  system: null,
  requested: undefined,
  note: null,
  response: null,
  solutionType: undefined,
  duration: null,
  completedAt: null,
  timestampFinally: null,
  createdAt: null,
  timestamp: null,
  updatedAt: null,
  deletedAt: null,
}));
