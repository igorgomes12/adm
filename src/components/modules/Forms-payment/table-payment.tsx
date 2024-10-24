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
import { TSchemaPayamentDtoForm } from './dtos/payment.dto'
import { ModalPaymentDelete } from './models/delete-model'
import { PaymentModal } from './models/model-payment'
import { usePaymentZustand } from './zustand-payment/payment-zustand'

const headers = ['Cód.', 'Formas', '']

const PaymentRow: FC<{
  payment: TSchemaPayamentDtoForm
  onOpenDelete: (id: number) => void
  onOpenEdit: (id: number) => void
}> = ({ payment, onOpenDelete, onOpenEdit }) => (
  <TableRow>
    <TableCell className="text-sm items-center">{payment.id}</TableCell>
    <TableCell className="text-sm items-center">{payment.name}</TableCell>

    <TableCell className="flex items-center justify-center w-full h-full space-x-2">
      <button
        onClick={() => onOpenEdit(payment.id || 0)}
        className="text-blue-200 hover:text-blue-500"
      >
        <FaEdit size={24} />
      </button>
      <button
        onClick={() => onOpenDelete(payment.id || 0)}
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

export const TablePayment: FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const { isOpen, mode, onOpen } = usePaymentZustand()

  const { data, isLoading, error } = useQuery<TSchemaPayamentDtoForm[], Error>({
    queryKey: ['get-payment'],
    queryFn: async () => {
      const response = await api.get('/payment')
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

    return data.filter(payment => {
      if (payment.id?.toString() === searchTermLower) return true
      if (matchAllTerms(payment.name)) return true
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
          <TableCell colSpan={4}>
            <div className="items-center justify-center flex w-full ">
              Erro ao carregar os dados: {error.message}
            </div>
          </TableCell>
        </TableRow>
      )
    }

    return filteredData.map(data => (
      <PaymentRow
        key={data.id}
        payment={data}
        onOpenDelete={() => onOpen('delete', data.id || 0)}
        onOpenEdit={() => onOpen('edit', data.id || 0)}
      />
    ))
  }, [isLoading, error, filteredData, onOpen])

  return (
    <div className="flex flex-col mt-4">
      <Table className="min-w-full py-2 text-lg">
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
      {isOpen && mode === 'edit' && <PaymentModal />}
      {isOpen && mode === 'delete' && <ModalPaymentDelete />}
    </div>
  )
}
