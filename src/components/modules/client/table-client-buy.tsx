import api from '@/components/sing-in/api/interceptors-axios'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { FC, useMemo, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Paginations from './pagination'
import { SkeletonCard } from '@/components/skeleton-component/skeleton'
import type { Client } from './system-components/system-add/zustand-state/add-client'

export const TableClientBuy: FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  // Fetch data using react-query
  const { data, error, isLoading } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: async () => {
      const response = await api.get('/client')
      return response.data
    },
  })

  if (error) {
    return <div>Erro ao carregar os dados: {(error as Error).message}</div>
  }

  const filteredData = useMemo(() => {
    if (!data) return []
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    return data.filter((item: Client) =>
      Object.values(item).some(value => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowerCaseSearchTerm)
        }
        return false
      }),
    )
  }, [data, searchTerm])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, currentPage, itemsPerPage])

  const tableContent = useMemo(() => {
    if (isLoading || !filteredData || filteredData.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={9}>
            <SkeletonCard />
          </TableCell>
        </TableRow>
      )
    }

    return paginatedData.map((item: Client) => (
      <TableRow
        key={item.id}
        className={
          item.inDebt
            ? 'bg-rose-100 hover:bg-rose-400 '
            : 'animate-none hover:bg-gray-100'
        }
      >
        <TableCell className="text-sm items-center">{item.id}</TableCell>
        <TableCell className="text-sm items-center">
          <p className="font-bold">{item.fantasyName}</p> - {item.corporateName}
        </TableCell>
        <TableCell className="text-sm items-center">{item.cpfCnpj}</TableCell>
        <TableCell className="text-sm items-center">
          {item.contacts.flatMap(contact => contact.contact).join(', ')}
        </TableCell>
        <TableCell className="text-sm items-center">
          {item.fantasyName}
        </TableCell>
        <TableCell className="text-sm items-center">{item.system}</TableCell>
        <TableCell className="text-sm items-center">
          {item.stateRegistration}
        </TableCell>
        <TableCell className="text-sm items-center">
          {item.addresses.flatMap(address => address.street)} -{' '}
          {item.addresses.flatMap(address => address.municipality_id)}
        </TableCell>
        <TableCell className="flex items-center justify-center w-full h-full space-x-2">
          <button className="text-blue-200 hover:text-blue-500">
            <FaEdit size={24} />
          </button>
          <button className="text-red-200 hover:text-red-500">
            <FaTrash size={24} />
          </button>
        </TableCell>
      </TableRow>
    ))
  }, [isLoading, filteredData, paginatedData])

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-col">
        <Table className="min-w-full py-1 cursor-pointer text-md">
          <TableHeader>
            <TableRow className="bg-gray-300 w-auto">
              {[
                'Cód.',
                'Nome',
                'CNPJ',
                'Telefone',
                'Representante',
                'Sistema Em Uso',
                'Sistema',
                'Município',
                '',
              ].map((header, index) => (
                <TableHead key={index} className="text-black w-auto">
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
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}
