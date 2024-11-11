import { showMessageError } from "@/common/messages/Err/toast-err"
import { showMessageSuccess } from "@/common/messages/Success/toast-success"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { type FC, useMemo } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"

import { ModalAccountDelete } from "../mod/delete-account"
import type { TAccounts } from "../dto/account.dto"
import { useAccountsStore } from "../service/zustand"
import usePaginationStore from "@/components/pagination/hook/use-pagination"
import Paginations from "@/components/modules/client/pagination"
import { SkeletonCard } from "@/components/skeleton-component/skeleton"
import {
  TableRow,
  TableCell,
  Table,
  TableHeader,
  TableHead,
  TableBody,
} from "@/components/ui/table"
import { api } from "@/infra/auth/database/acess-api/api"
import { Switch } from "@/components/ui/switch"

const headers = ["Cód.", "Descrição", "Saldo atual", "Observação", "Status", ""]

const AccountRow: FC<{
  account: TAccounts
  onOpenDelete: (id: number) => void
  onOpenForm: (id: number) => void
  onStatusChange: (id: number, newStatus: boolean) => void
}> = ({ account, onOpenDelete, onOpenForm, onStatusChange }) => {
  return (
    <TableRow key={`account${account.id}`}>
      <TableCell className="text-sm items-center">{account.id}</TableCell>
      <TableCell className="text-sm items-center">
        {account.description}
      </TableCell>
      <TableCell className="text-sm items-center">{account.value}</TableCell>
      <TableCell className="text-sm items-center">
        <textarea
          disabled={true}
          className="w-full max-w-xs h-14 resize-none border rounded p-2 overflow-y-auto"
          readOnly
          value={account.observation}
        />
      </TableCell>
      <TableCell className="text-sm items-center">
        <Switch
          checked={account.status}
          onCheckedChange={checked => onStatusChange(account.id || 0, checked)}
        />
      </TableCell>
      <TableCell className="flex items-center justify-center space-x-2">
        <div className="flex mt-4 space-x-2">
          <button
            type="button"
            onClick={() => onOpenForm(account.id || 0)}
            className="text-blue-200 hover:text-blue-500"
          >
            <FaEdit size={24} />
          </button>
          <button
            type="button"
            onClick={() => onOpenDelete(account.id || 0)}
            className="text-red-200 hover:text-red-500"
          >
            <FaTrash size={24} />
          </button>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default AccountRow

const LoadingRow: FC = () => (
  <TableRow>
    <TableCell colSpan={5}>
      <SkeletonCard />
    </TableCell>
  </TableRow>
)

export const TableAccount: FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const { isOpen, onOpen } = useAccountsStore()
  const { currentPage, changePage } = usePaginationStore()
  const itemsPerPage = 8

  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery<TAccounts[], Error>({
    queryKey: ["get-account"],
    queryFn: async () => {
      const response = await api.get("/account")
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
      const response = await api.put(`/account?id=${id}`, { status: newStatus })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-account"] })
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
      console.error("Erro de atualização de status:", error)
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

    return data.filter(account => {
      if (account.id?.toString() === searchTermLower) return true
      if (matchAllTerms(account.description)) return true
      if (matchAllTerms(account.status ? "Ativo" : "Inativo")) return true
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
          <TableCell colSpan={5}>
            <div className="items-center justify-center flex w-full ">
              Erro ao carregar os dados: {error.message}
            </div>
          </TableCell>
        </TableRow>
      )
    }

    return filteredData.map(account => (
      <AccountRow
        key={account.id}
        account={account}
        onOpenDelete={() => onOpen("delete", account.id)}
        onStatusChange={handleStatusChange}
        onOpenForm={() => onOpen("default", account.id)}
      />
    ))
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  }, [isLoading, error, filteredData, handleStatusChange, onOpen])

  return (
    <div className="flex flex-col h-[80vh] overflow-y-auto">
      <div className="flex-grow w-full">
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

        {isOpen && <ModalAccountDelete />}
      </div>
      <div className="flex justify-end ">
        <Paginations
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={changePage}
        />
      </div>
    </div>
  )
}
