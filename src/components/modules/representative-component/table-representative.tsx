import { showMessageError } from "@/common/messages/Err/toast-err"
import { showMessageSuccess } from "@/common/messages/Success/toast-success"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { type FC, useMemo } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
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
import { ModalRepresentativeDelete } from "./mod/modal-representative-delete"
import type { representative } from "./zod/types-representative"
import { useRepresentativeDeleteZustand } from "./zustand/delete-representative"
import usePaginationStore from "@/components/pagination/hook/use-pagination"
import Paginations from "../client/pagination"

const headers = [
  "Cód.",
  "Nome",
  "Celular",
  "Telefone",
  "Tipo",
  "Região",
  "Status",
  "",
]

export const translateType = (type: string): string => {
  switch (type) {
    case "REPRESENTATIVE":
      return "Representante"
    case "CONSULTANT":
      return "Consultor"
    case "PARTHER":
      return "Parceiro"
    default:
      return type
  }
}

const RepresentativeRow: FC<{
  item: representative
  onOpenDelete: (id: number) => void
  onOpenFormClient: (id: number) => void
  onStatusChange: (id: number, newStatus: boolean) => void
}> = ({ item, onOpenDelete, onOpenFormClient, onStatusChange }) => {
  return (
    <TableRow key={`representative${item.id}`}>
      <TableCell className="text-sm items-center sticky">{item.id}</TableCell>
      <TableCell className="text-sm items-center sticky">{item.name}</TableCell>
      <TableCell className="text-sm items-center">{item.cellphone}</TableCell>
      <TableCell className="text-sm items-center">{item.phone}</TableCell>
      <TableCell className="text-sm items-center">
        {translateType(item.type)}
      </TableCell>
      <TableCell className="text-sm items-center">{item.region}</TableCell>
      <TableCell className="text-sm items-center">
        <Switch
          checked={item.status === "ativo"}
          onCheckedChange={checked => onStatusChange(item.id || 0, checked)}
        />
      </TableCell>
      <TableCell className="flex items-center justify-center w-full h-full space-x-2">
        <button
          type="button"
          onClick={() => onOpenFormClient(item.id)}
          className="text-blue-200 hover:text-blue-500"
        >
          <FaEdit size={24} />
        </button>
        <button
          type="button"
          onClick={() => onOpenDelete(item.id)}
          className="text-red-200 hover:text-red-500"
        >
          <FaTrash size={24} />
        </button>
      </TableCell>
    </TableRow>
  )
}

const LoadingRow: FC = () => (
  <TableRow>
    <TableCell colSpan={8}>
      <SkeletonCard />
    </TableCell>
  </TableRow>
)

export const TableRepresentative: FC<{
  searchTerm: string
  onOpenFormClient: (id: number) => void
}> = ({ searchTerm, onOpenFormClient }) => {
  const { isOpen, onOpen } = useRepresentativeDeleteZustand()
  const { currentPage, changePage } = usePaginationStore()
  const itemsPerPage = 8

  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery<representative[], Error>({
    queryKey: ["get-representative"],
    queryFn: async () => {
      const response = await api.get("/representative")
      return response.data
    },
  })

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      id,
      newStatus,
    }: {
      id: number
      newStatus: boolean
    }) => {
      const response = await api.patch(
        "/representative",
        { status: newStatus ? "ativo" : "inativo" },
        { params: { id } }
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-representative"] })
      showMessageSuccess({
        message: "Status atualizado com sucesso!",
      })
    },
    onError: (error: unknown) => {
      let errorMessage = "Verifique suas credenciais."

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage
      }

      showMessageError(errorMessage)
      console.error("Erro de login:", error)
    },
  })

  const handleStatusChange = (id: number, newStatus: boolean) => {
    updateStatusMutation.mutate({ id, newStatus })
  }

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

  const tableContent = useMemo(() => {
    if (isLoading || !filteredData || filteredData.length === 0) {
      return <LoadingRow />
    }
    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={8}>
            <div className="items-center justify-center flex w-full ">
              Erro ao carregar os dados: {error.message}
            </div>
          </TableCell>
        </TableRow>
      )
    }

    return filteredData.map(data => (
      <RepresentativeRow
        key={data.id}
        item={data}
        onOpenDelete={onOpen}
        onStatusChange={handleStatusChange}
        onOpenFormClient={onOpenFormClient}
      />
    ))
  }, [
    isLoading,
    error,
    filteredData,
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    handleStatusChange,
    onOpen,
    onOpenFormClient,
  ])

  return (
    <div className="flex flex-col mt-4">
      <Table className="min-w-full py-2 cursor-pointer text-lg">
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
      {isOpen && <ModalRepresentativeDelete />}
    </div>
  )
}
