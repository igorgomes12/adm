import { useQuery } from '@tanstack/react-query'
import { FC, useMemo } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import api from '../../sing-in/api/interceptors-axios'
import { SkeletonCard } from '../../skeleton-component/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table'
import { ModalEstablishmentDelete } from './modal-establishment/delete-modal-establishment'
import { useEstablishmentDeleteZustand } from './zustand-establishment/delete-establisment'
import { useEstablishmentEditZustand } from './zustand-establishment/edit-establishment'
import { EditEstablishmentModal } from './modal-establishment/edit-modal-establishment'

const headers = ['Cód.', 'Nome Estabelecimento', 'Status', '']

export type TEstablishment = {
  id: number
  name: string
  status: boolean
}

const EstablishmentRow: FC<{
  establishment: TEstablishment
  onOpenDelete: (id: number) => void
  onOpenEdit: (id: number) => void
}> = ({ establishment, onOpenDelete, onOpenEdit }) => (
  <TableRow>
    <TableCell className="text-xs items-center">{establishment.id}</TableCell>
    <TableCell className="text-xs items-center">{establishment.name}</TableCell>
    <TableCell className="text-xs items-center">
      {establishment.status ? 'Ativo' : 'Inativo'}
    </TableCell>
    <TableCell className="flex items-center justify-center w-full h-full space-x-2">
      <button
        onClick={() => onOpenEdit(establishment.id)}
        className="text-blue-200 hover:text-blue-500"
      >
        <FaEdit size={24} />
      </button>
      <button
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
  const { data, isLoading, error } = useQuery<TEstablishment[], Error>({
    queryKey: ['get-establishment'],
    queryFn: async () => {
      const response = await api.get('/establishment')
      return response.data
    },
  })

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
      if (matchAllTerms(establishment.status ? 'Ativo' : 'Inativo')) return true
      return false
    })
  }, [data, searchTerm])

  const tableContent = useMemo(() => {
    if (isLoading) return <LoadingRow />
    if (error)
      return (
        <TableRow>
          <TableCell colSpan={4}>
            Erro ao carregar os dados: {error.message}
          </TableCell>
        </TableRow>
      )

    return filteredData.map(data => (
      <EstablishmentRow
        onOpenEdit={onOpenEdit}
        key={data.id}
        establishment={data}
        onOpenDelete={onOpen}
      />
    ))
  }, [isLoading, error, filteredData])

  return (
    <div className="flex flex-col mt-4">
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
        <TableBody>{tableContent}</TableBody>
      </Table>
      {isOpen && <ModalEstablishmentDelete />}
      {isOpenEdit && <EditEstablishmentModal />}
    </div>
  )
}
