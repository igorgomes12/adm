import type React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type PaginationsProps = {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Paginations: React.FC<PaginationsProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  const renderPaginationItems = () => {
    const items = []
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={e => {
              e.preventDefault()
              handlePageChange(i)
            }}
            isActive={i === currentPage}
            className={`px-3 py-1 rounded ${
              i === currentPage ? "bg-gray-800 text-white" : "bg-white"
            } hover:bg-gray-300 transition-colors duration-200`}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }
    return items
  }

  return (
    <Pagination className="flex justify-center items-center space-x-2">
      <PaginationContent className="flex items-center space-x-1">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={e => {
              e.preventDefault()
              handlePageChange(currentPage - 1)
            }}
            className={`${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            &lt;
          </PaginationPrevious>
        </PaginationItem>
        {renderPaginationItems()}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={e => {
              e.preventDefault()
              handlePageChange(currentPage + 1)
            }}
            className={`${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            &gt;
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default Paginations
