import { create } from 'zustand'

type EditState = {
  isOpen: boolean
  id: number | null
  onOpen: (id: number) => void
  onClose: () => void
}

export const useAccoutingEditZustand = create<EditState>(set => ({
  isOpen: false,
  id: null,
  onOpen: id => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: null }),
}))
