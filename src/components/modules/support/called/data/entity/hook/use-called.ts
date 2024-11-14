// Store configurada no Zustand
import { create } from "zustand";

type TCalled = {
  id: number | null;
  isOpen: boolean;
  onOpen: (mode: "default" | "delete", id?: number) => void;
  onClose: () => void;
  mode: "default" | " delete";
  formData: {
    dadosGerais?: {
      caller: string;
      contact: string;
      createdAt: string;
      name: string;
      timestamp: string;
    };
    centralAtendimento?: {
      description: string;
      module: string;
      system: string;
      type: string;
    };
    descricao?: {
      note: string;
      priority: string;
      requested: string;
      response: string;
      solutionType: string;
    };
  };
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  updateFormData: (formStep: keyof TCalled["formData"], data: any) => void;
};

export const useCalledStore = create<TCalled>((set) => ({
  id: null,
  formData: {},
  isOpen: false,
  onOpen: () => set({ isOpen: true, mode: "default", id: null }),
  onClose: () => set({ isOpen: false }),
  mode: "default",
  updateFormData: (formStep, data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [formStep]: data, // Certifique-se de usar consistentemente essas chaves
      },
    })),
}));
