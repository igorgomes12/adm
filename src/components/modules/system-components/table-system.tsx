import React, { useMemo, useCallback, useEffect } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

import { useSystemDeleteZustand } from './system-add/zustand-state/system-del-zustand'
import { ModalSystemDelete } from './system-add/modal-delete-system'
import { ModalSystemEdit } from './system-add/modal-edit-system'
import { useSystemEditZustand } from './system-add/zustand-state/system-edit-zustand'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { TSystemSchemaDto } from './system-add/zod-types/types-system'
import api from '@/components/sing-in/api/interceptors-axios'
import { SkeletonCard } from '@/components/skeleton-component/skeleton'
import {
  TableRow,
  TableCell,
  Table,
  TableHeader,
  TableHead,
  TableBody,
} from '@/components/ui/table'

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
        <button
          onClick={() => onEdit(system.id || 0)}
          className="text-blue-200 hover:text-blue-500"
        >
          <FaEdit size={24} />
        </button>
        <button
          onClick={() => onDelete(system.id || 0)}
          className="text-red-200 hover:text-red-500"
        >
          <FaTrash size={24} />
        </button>
      </TableCell>
    </TableRow>
  ),
)

export const TableSystem: React.FC<{ searchTerm: string }> = ({
  searchTerm,
}) => {
  const { isOpen, onOpen } = useSystemDeleteZustand()
  const { isOpen: isOpenEdit, onOpen: onOpenEdit } = useSystemEditZustand()
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery<TSystemSchemaDto[], Error>({
    queryKey: ['get-systems'],
    queryFn: async () => {
      const res = await api.get<TSystemSchemaDto[]>('/systems')
      return res.data
    },
    refetchOnWindowFocus: true,
    staleTime: 0,
  })

  const headers = useMemo(
    () => ['Cód.', 'Nome Software', 'Versão', 'Descrição ', ''],
    [],
  )

  const handleEdit = useCallback(
    (id: number) => {
      onOpenEdit(id)
    },
    [onOpenEdit],
  )

  const handleDelete = useCallback(
    (id: number) => {
      onOpen(id)
    },
    [onOpen],
  )

  useEffect(() => {
    if (!isOpen) {
      queryClient.refetchQueries({ queryKey: ['get-systems'] })
    }
  }, [isOpen, queryClient])

  const filteredData = data?.filter(account =>
    Object.values(account).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  )

  const tableContent = useMemo(() => {
    if (error) {
      return <div>Erro ao carregar os dados: {error.message}</div>
    }

    if (isLoading) {
      return <SkeletonCard />
    }

    return (
      <Table className="min-w-full py-2 text-sm">
        <TableHeader>
          <TableRow className="bg-gray-300 w-auto">
            {headers.map((header, index) => (
              <TableHead key={index} className="text-black w-auto">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData &&
            filteredData.map(system => (
              <SystemRow
                key={system.id}
                system={system}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
        </TableBody>
      </Table>
    )
  }, [isLoading, error, filteredData, headers, handleEdit, handleDelete])

  return (
    <div className="flex flex-col mt-4">
      {tableContent}
      {isOpen && <ModalSystemDelete />}
      {isOpenEdit && <ModalSystemEdit />}
    </div>
  )
}
