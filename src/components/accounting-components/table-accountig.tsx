import { useQuery } from '@tanstack/react-query'
import type { FC } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import api from '../sing-in/api/interceptors-axios'
import { SkeletonCard } from '../skeleton-component/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

const headers = [
  'Cód.',
  'Nome Contabilidade',
  'CNPJ',
  'Contato',
  'CRC',
  'Email',
  'Telefone',
  '',
]

export type TAccount = {
  id: number
  name: string
  phone: string
  email: string
  contact: string
  crc: string
  cnpj: string
}

const AccountRow: FC<{ account: TAccount }> = ({ account }) => (
  <TableRow>
    {Object.values(account).map((value, index) => (
      <TableCell key={index} className="text-xs items-center">
        {value}
      </TableCell>
    ))}
    <TableCell className="flex items-center justify-center w-full h-full space-x-2">
      <button className="text-blue-200 hover:text-blue-500">
        <FaEdit size={24} />
      </button>
      <button className="text-red-200 hover:text-red-500">
        <FaTrash size={24} />
      </button>
    </TableCell>
  </TableRow>
)

export const TableAccounting: FC = () => {
  const { data, error, isLoading } = useQuery<TAccount[]>({
    queryKey: ['get-accounting'],
    queryFn: async () => {
      const response = await api.get(`/accouting`)
      return response.data
    },
  })

  if (error) {
    return <div>Erro ao carregar os dados: {(error as Error).message}</div>
  }

  const tableContent = isLoading ? (
    <SkeletonCard />
  ) : (
    data?.map(account => <AccountRow key={account.id} account={account} />)
  )

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
    </div>
  )
}
