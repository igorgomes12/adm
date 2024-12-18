import React, { useCallback, useEffect, useMemo } from "react"
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
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ModalSystemDelete } from "./system-add/modal-delete-system"
import { ModalSystemEdit } from "./system-add/modal-edit-system"
import type { TSystemSchemaDto } from "./system-add/zod-types/types-system"
import { useSystemDeleteZustand } from "./system-add/zustand-state/system-del-zustand"
import { useSystemEditZustand } from "./system-add/zustand-state/system-edit-zustand"
import usePaginationStore from "@/components/pagination/hook/use-pagination"
import Paginations from "../client/pagination"

interface SystemRowProps {
  system: TSystemSchemaDto
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

const SystemRow: React.FC<SystemRowProps> = React.memo(
  ({ system, onEdit, onDelete }) => (
    <TableRow key={system.id}>
      <TableCell className="text-xs items-center">{system.id}</TableCell>
      <TableCell className="text-xs items-center">{system.name}</TableCell>
      <TableCell className="text-xs items-center">
        {system.stable_version}
      </TableCell>
      <TableCell className="text-xs items-center">
        {system.description}
      </TableCell>
      <TableCell className="flex items-center justify-center w-full h-full space-x-2">
        {/* <button
          type="button"
          onClick={() => onEdit(system.id || 0)}
          className="text-amber-200 hover:text-amber-500"
        >
          <FaSortAmountUp size={24} />
        </button> */}
        <button
          type="button"
          onClick={() => onEdit(system.id || 0)}
          className="text-blue-200 hover:text-blue-500"
        >
          <FaEdit size={24} />
        </button>
        <button
          type="button"
          onClick={() => onDelete(system.id || 0)}
          className="text-red-200 hover:text-red-500"
        >
          <FaTrash size={24} />
        </button>
      </TableCell>
    </TableRow>
  )
)

export const TableSystem: React.FC<{ searchTerm: string }> = ({
  searchTerm,
}) => {
  const { isOpen, onOpen } = useSystemDeleteZustand()
  const { isOpen: isOpenEdit, onOpen: onOpenEdit } = useSystemEditZustand()
  const queryClient = useQueryClient()

  //paginação
  const { currentPage, changePage } = usePaginationStore()
  const itemsPerPage = 8

  const { data, isLoading, error } = useQuery<TSystemSchemaDto[], Error>({
    queryKey: ["get-systems"],
    queryFn: async () => {
      const res = await api.get<TSystemSchemaDto[]>("/systems")
      return res.data
    },
    refetchOnWindowFocus: true,
    staleTime: 0,
  })

  const headers = useMemo(
    () => ["Cód.", "Nome Software", "Versão", "Descrição ", ""],
    []
  )

  const handleEdit = useCallback(
    (id: number) => {
      onOpenEdit(id)
    },
    [onOpenEdit]
  )

  const handleDelete = useCallback(
    (id: number) => {
      onOpen(id)
    },
    [onOpen]
  )

  useEffect(() => {
    if (!isOpen) {
      queryClient.refetchQueries({ queryKey: ["get-systems"] })
    }
  }, [isOpen, queryClient])

  const filteredData = data?.filter(account =>
    Object.values(account).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const tableContent = useMemo(() => {
    if (error) {
      return (
        <div className="items-center justify-center flex w-full ">
          Erro ao carregar os dados: Não possui itens na tabela
        </div>
      )
    }

    if (isLoading) {
      return <SkeletonCard />
    }

    return (
      <div className="flex flex-col h-[80vh] overflow-y-auto">
        <div className="flex-grow">
          <Table className="min-w-full py-2 text-sm">
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
              {filteredData?.map(system => (
                <SystemRow
                  key={system.id}
                  system={system}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </TableBody>
          </Table>
          <div className="flex -mt-[-27rem] justify-end ">
            <Paginations
              totalItems={filteredData?.length || 0}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={changePage}
            />
          </div>
        </div>
      </div>
    )
  }, [
    isLoading,
    error,
    filteredData,
    headers,
    handleEdit,
    handleDelete,
    currentPage,
    changePage,
  ])

  return (
    <div className="flex flex-col mt-4">
      {tableContent}
      {isOpen && <ModalSystemDelete />}
      {isOpenEdit && <ModalSystemEdit />}
    </div>
  )
}
