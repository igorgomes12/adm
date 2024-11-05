import { create } from 'zustand'

type PaginationState = {
  currentPage: number
  totalPages: number
  changePage: (page: number) => void
  setTotalPages: (totalItems: number, itemsPerPage: number) => void
}

const usePaginationStore = create<PaginationState>(set => ({
  currentPage: 1,
  totalPages: 0,
  changePage: (page: number) =>
    set(state => {
      if (page < 1) {
        return { currentPage: 1 }
      }
      if (page > state.totalPages) {
        return { currentPage: state.totalPages }
      }
      return { currentPage: page }
    }),
  setTotalPages: (totalItems, itemsPerPage) =>
    set(() => {
      const totalPages = Math.ceil(totalItems / itemsPerPage)
      return { totalPages }
    }),
}))

export default usePaginationStore
