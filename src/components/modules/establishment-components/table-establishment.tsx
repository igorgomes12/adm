import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { type FC, useMemo } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { toast } from "react-toastify"
import api from "../../../infra/auth/database/acess-api/interceptors-axios"
import { SkeletonCard } from "../../skeleton-component/skeleton"
import { Switch } from "../../ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table"
import { ModalEstablishmentDelete } from "./modal-establishment/delete-modal-establishment"
import { EditEstablishmentModal } from "./modal-establishment/edit-modal-establishment"
import { useEstablishmentDeleteZustand } from "./zustand-establishment/delete-establisment"
import { useEstablishmentEditZustand } from "./zustand-establishment/edit-establishment"
import Paginations from "../client/pagination"
import usePaginationStore from "@/components/pagination/hook/use-pagination"

const headers = ["Cód.", "Nome Estabelecimento", "Status", ""]

export type TEstablishment = {
  id: number
  name: string
  status: boolean
}

const EstablishmentRow: FC<{
  establishment: TEstablishment
  onOpenDelete: (id: number) => void
  onOpenEdit: (id: number) => void
  onStatusChange: (id: number, newStatus: boolean) => void
}> = ({ establishment, onOpenDelete, onOpenEdit, onStatusChange }) => (
  <TableRow>
    <TableCell className="text-sm items-center">{establishment.id}</TableCell>
    <TableCell className="text-sm items-center">{establishment.name}</TableCell>
    <TableCell className="text-sm items-center">
      <Switch
        checked={establishment.status}
        onCheckedChange={checked => onStatusChange(establishment.id, checked)}
      />
    </TableCell>
    <TableCell className="flex items-center justify-center w-full h-full space-x-2">
      <button
        type="button"
        onClick={() => onOpenEdit(establishment.id)}
        className="text-blue-200 hover:text-blue-500"
      >
        <FaEdit size={24} />
      </button>
      <button
        type="button"
        onClick={() => onOpenDelete(establishment.id)}
        className="text-red-200 hover:text-red-500"
      >
        <FaTrash size={24} />
      </button>
    </TableCell>
  </TableRow>
)

const LoadingRow: FC = () => (
  <TableRow>
    <TableCell colSpan={4}>
      <SkeletonCard />
    </TableCell>
  </TableRow>
)

export const TableEstablishment: FC<{ searchTerm: string }> = ({
  searchTerm,
}) => {
  const { isOpen, onOpen } = useEstablishmentDeleteZustand()
  const { isOpen: isOpenEdit, onOpen: onOpenEdit } =
    useEstablishmentEditZustand()
  const queryClient = useQueryClient()
  const { currentPage, changePage, setTotalPages } = usePaginationStore()

  const { data, isLoading, error } = useQuery<TEstablishment[], Error>({
    queryKey: ["get-establishment"],
    queryFn: async () => {
      const response = await api.get("/establishment")
      return response.data
    },
  })

  const itemsPerPage = 8

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      id,
      newStatus,
    }: {
      id: number
      newStatus: boolean
    }) => {
      const response = await api.patch(
        "/establishment",
        { status: newStatus },
        { params: { id } }
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-establishment"] })
      toast.success("Status atualizado com sucesso!")
    },
    onError: () => {
      toast.error("Erro ao atualizar o status. Por favor, tente novamente.")
    },
  })

  const handleStatusChange = (id: number, newStatus: boolean) => {
    updateStatusMutation.mutate({ id, newStatus })
  }

  // Filter the data based on the search term
  const filteredData = useMemo(() => {
    if (!data) return []

    const searchTermLower = searchTerm.toLowerCase().trim()
    const searchWords = searchTermLower.split(/\s+/)

    const matchAllTerms = (value: string) => {
      return searchWords.every(word => value.toLowerCase().includes(word))
    }

    return data.filter(establishment => {
      if (establishment.id.toString() === searchTermLower) return true
      if (matchAllTerms(establishment.name)) return true
      if (matchAllTerms(establishment.status ? "Ativo" : "Inativo")) return true
      return false
    })
  }, [data, searchTerm])

  // Set the total number of pages whenever the filtered data changes
  useMemo(() => {
    setTotalPages(filteredData.length, itemsPerPage)
  }, [filteredData.length, setTotalPages])

  // Get the current page of data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const tableContent = useMemo(() => {
    if (isLoading || !filteredData || filteredData.length === 0) {
      return <LoadingRow />
    }
    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={4}>
            <div className="items-center justify-center flex w-full ">
              Erro ao carregar os dados: {error.message}
            </div>
          </TableCell>
        </TableRow>
      )
    }

    return paginatedData.map(establishment => (
      <EstablishmentRow
        key={establishment.id}
        establishment={establishment}
        onOpenEdit={onOpenEdit}
        onOpenDelete={onOpen}
        onStatusChange={handleStatusChange}
      />
    ))
  }, [
    isLoading,
    error,
    filteredData,
    paginatedData,
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    handleStatusChange,
    onOpenEdit,
    onOpen,
  ])

  return (
    <div className="flex flex-col h-[80vh] overflow-y-auto">
      <div className="flex-grow">
        <Table className="min-w-full py-2 text-lg">
          <TableHeader>
            <TableRow className="bg-gray-300 w-auto">
              {headers.map(header => (
                <TableHead key={header} className="text-black w-auto">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>{tableContent}</TableBody>
        </Table>
        <div className="flex justify-end mt-2">
          <Paginations
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={changePage}
          />
        </div>
      </div>
      {isOpen && <ModalEstablishmentDelete />}
      {isOpenEdit && <EditEstablishmentModal />}
    </div>
  )
}
