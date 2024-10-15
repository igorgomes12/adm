import api from '@/components/sing-in/api/interceptors-axios'
import { SkeletonCard } from '@/components/skeleton-component/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useCallback, useEffect, useMemo } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import type { TUserSchemaDto } from './zod-types-user/zod-users'
import { useUserDeleteZustand } from './zustand/del-zustand'
import { useUserEditZustand } from './zustand/edit-zustand'
import { ModalUserDelete } from './mod/del-mod'
import { ModalUserEdit } from './mod/edit-mod'
import { Switch } from '@/components/ui/switch'
import { toast } from 'react-toastify'

interface UsersRowProps {
  user: TUserSchemaDto
  onEdit: (id: number) => void
  onDelete: (id: number) => void
  onStatusChange: (id: number, newStatus: boolean) => void
}

export type ProfileType =
  | 'ADMIN'
  | 'FINANCE'
  | 'REPRESENTATIVE'
  | 'REPRESENTATIVE_SUPERVISOR'
  | 'PROGRAMMING'
  | 'PROGRAMMING_SUPERVISOR'
  | 'SUPPORT'
  | 'SUPPORT_SUPERVISOR'

const profileMap: Record<ProfileType, string> = {
  ADMIN: 'Administrador',
  FINANCE: 'Financeiro',
  REPRESENTATIVE: 'Representante',
  REPRESENTATIVE_SUPERVISOR: 'Supervisor de Representantes',
  PROGRAMMING: 'Programação',
  PROGRAMMING_SUPERVISOR: 'Supervisor de Programação',
  SUPPORT: 'Suporte',
  SUPPORT_SUPERVISOR: 'Supervisor de Suporte',
}

function getProfileNames(
  profiles:
    | ProfileType
    | ProfileType[]
    | string
    | string[]
    | number
    | undefined,
): string | undefined {
  if (!profiles) return 'Sem perfil'

  if (typeof profiles === 'number') {
    return (
      profileMap[Object.keys(profileMap)[profiles - 1] as ProfileType] ||
      `Perfil ${profiles}`
    )
  }

  if (typeof profiles === 'string') {
    return profileMap[profiles as ProfileType] || profiles
  }

  return Array.isArray(profiles)
    ? profiles
        .map(profile => profileMap[profile as ProfileType] || profile)
        .join(', ')
    : undefined
}

const UserRow: React.FC<UsersRowProps> = React.memo(
  ({ user, onEdit, onDelete, onStatusChange }) => (
    <TableRow key={user.id}>
      <TableCell className="text-xs items-center">{user.id}</TableCell>
      <TableCell className="text-xs items-center">{user.name}</TableCell>
      <TableCell className="text-xs items-center">
        {getProfileNames(user.profile)}
      </TableCell>
      <TableCell className="text-xs items-center">{user.email}</TableCell>
      <TableCell className="text-xs items-center">
        <Switch
          checked={user.status === 'ativo'}
          onCheckedChange={checked => onStatusChange(user.id || 0, checked)}
        />
      </TableCell>
      <TableCell className="flex items-center justify-center w-full h-full space-x-2">
        <button
          onClick={() => onEdit(user.id || 0)}
          className="text-blue-200 hover:text-blue-500"
        >
          <FaEdit size={24} />
        </button>
        <button
          onClick={() => onDelete(user.id || 0)}
          className="text-red-200 hover:text-red-500"
        >
          <FaTrash size={24} />
        </button>
      </TableCell>
    </TableRow>
  ),
)

export const TableUsers: React.FC<{ searchTerm: string }> = ({
  searchTerm,
}) => {
  const { isOpen, onOpen } = useUserDeleteZustand()
  const { isOpen: isOpenEdit, onOpen: onOpenEdit } = useUserEditZustand()
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery<TUserSchemaDto[], Error>({
    queryKey: ['get-users'],
    queryFn: async () => {
      const res = await api.get<TUserSchemaDto[]>('/user')
      return res.data
    },
    refetchOnWindowFocus: true,
    staleTime: 0,
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
        '/user',
        { status: newStatus ? 'ativo' : 'inativo' },
        { params: { id } },
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-users'] })
      toast.success('Status atualizado com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao atualizar o status. Por favor, tente novamente.')
    },
  })

  const handleStatusChange = (id: number, newStatus: boolean) => {
    updateStatusMutation.mutate({ id, newStatus })
  }

  const headers = useMemo(
    () => ['Cód.', 'Nome', 'Perfil', 'Email', 'Status', ''],
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
      queryClient.refetchQueries({ queryKey: ['get-users'] })
    }
  }, [isOpen, queryClient])

  const filteredData = data?.filter(user =>
    Object.values(user).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
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
            filteredData.map(user => (
              <UserRow
                key={user.id}
                user={user}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
        </TableBody>
      </Table>
    )
  }, [
    isLoading,
    error,
    filteredData,
    headers,
    handleEdit,
    handleDelete,
    handleStatusChange,
  ])

  return (
    <div className="flex flex-col mt-4">
      {tableContent}
      {isOpen && <ModalUserDelete />}
      {isOpenEdit && <ModalUserEdit />}
    </div>
  )
}
