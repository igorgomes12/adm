import { useQuery } from "@tanstack/react-query"
import { useMemo, type FC } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"

import { SkeletonCard } from "@/components/skeleton-component/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import api from "@/infra/auth/database/acess-api/interceptors-axios"
import { ModalAccountingDelete } from "./modal-accouting/modal-delete-accounting"
import { ModalAccountingEdit } from "./modal-accouting/modal-edit-accouting"
import { useAccoutingDeleteZustand } from "./zustand-accounting/delete-zustand"
import { useAccoutingEditZustand } from "./zustand-accounting/edit-zustand"
import usePaginationStore from "@/components/pagination/hook/use-pagination"
import Paginations from "../client/pagination"

const headers = [
  "Cód.",
  "Nome Contabilidade",
  "CNPJ",
  "Contato",
  "CRC",
  "Email",
  "Telefone",
  "",
]

export type TAccount = {
  id: number
  name: string
  email: string
  phone: string
  contact: string
  crc: string
  cnpj: string
}

const AccountRow: FC<{
  account: TAccount
  onOpenDelete: (id: number) => void
  onOpenEdit: (id: number) => void
}> = ({ account, onOpenDelete, onOpenEdit }) => (
  <TableRow>
    {Object.entries(account).map(([key, value]) => (
      <TableCell key={value} className="text-sm items-center">
        {key !== "id" ? value : account.id}
      </TableCell>
    ))}
    <TableCell className="flex items-center justify-center w-full h-full space-x-2">
      <button
        type="button"
        onClick={() => onOpenEdit(account.id)}
        className="text-blue-200 hover:text-blue-500"
      >
        <FaEdit size={24} />
      </button>
      <button
        type="button"
        onClick={() => onOpenDelete(account.id)}
        className="text-red-200 hover:text-red-500"
      >
        <FaTrash size={24} />
      </button>
    </TableCell>
  </TableRow>
)

export const TableAccounting: FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const { onOpen: onOpenDelete, isOpen: isOpenDelete } =
    useAccoutingDeleteZustand()
  const { onOpen: onOpenEdit, isOpen: isOpenEdit } = useAccoutingEditZustand()

  //paginação
  const { currentPage, changePage } = usePaginationStore()
  const itemsPerPage = 8

  const { data, error, isLoading } = useQuery<TAccount[]>({
    queryKey: ["get-accounting"],
    queryFn: async () => {
      const response = await api.get("/accouting")
      return response.data
    },
  })

  if (error) {
    return <div>Erro ao carregar os dados: {(error as Error).message}</div>
  }

  const filteredData = data?.filter(account => {
    const searchTermLower = searchTerm.toLowerCase().trim()
    const searchWords = searchTermLower.split(/\s+/)

    const matchAllTerms = (value: string) => {
      return searchWords.every(word => value.toLowerCase().includes(word))
    }

    if (account.id.toString() === searchTermLower) return true
    if (matchAllTerms(account.name)) return true
    if (matchAllTerms(account.cnpj)) return true
    if (matchAllTerms(account.email)) return true
    if (matchAllTerms(account.contact)) return true
    if (matchAllTerms(account.phone)) return true

    return false
  })

  const tableContent = useMemo(() => {
    if (isLoading || !filteredData || filteredData.length === 0) {
      return <SkeletonCard />
    }

    return (
      <>
        <div className="flex flex-col mt-4">
          <Table className="min-w-full py-2 text-md">
            <TableHeader>
              <TableRow className="bg-gray-300 w-auto">
                {headers.map(header => (
                  <TableHead key={header} className="text-black w-auto">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(account => (
                <AccountRow
                  key={account.id}
                  account={account}
                  onOpenDelete={onOpenDelete}
                  onOpenEdit={onOpenEdit}
                />
              ))}
            </TableBody>
          </Table>

          {isOpenDelete && <ModalAccountingDelete />}
          {isOpenEdit && <ModalAccountingEdit />}
        </div>
        <div className="flex -mt-[-27rem] justify-end ">
          <Paginations
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={changePage}
          />
        </div>
      </>
    )
  }, [
    isLoading,
    filteredData,
    currentPage,
    changePage,
    onOpenDelete,
    onOpenEdit,
    isOpenDelete,
    isOpenEdit,
  ])

  return tableContent
}
