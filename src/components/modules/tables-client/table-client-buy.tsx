import { useState } from 'react'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { FilterOfTableClient } from './filter-of-tables-client'
import Paginations from './pagination'
import { BsPlus } from 'react-icons/bs'

const originalData = [
  {
    code: '3535',
    name: 'CONFECÇÕES RIBEIRO LTDA ME',
    fantasyName: 'LOJA SUBLIME',
    cnpj: '11.379.457/0001-75',
    phone: '(27)9828-1164',
    representative: 'RODRIGO SALT INFORMA',
    unit: 'LIDER AUTOMAÇÃO',
    system: 'WebLider',
    type: 'VESTUARIO',
    active: 'Sim',
    uf: 'ES',
    municipio: 'Brejetuba',
    status: 'Aguardando Cadastro',
  },
  {
    code: '3901290',
    name: 'teste LTDA ME',
    fantasyName: 'teste SUBLIME',
    cnpj: '11.379.500/0001-75',
    phone: '(27)9400-2300',
    representative: 'Igor Gomes',
    unit: 'LIDER AUTOMAÇÃO',
    system: 'WebLider',
    type: 'VESTUARIO',
    active: 'Sim',
    uf: 'ES',
    municipio: 'Brejetuba',
    status: 'Aguardando Cadastro',
  },
]

// Criar um array de 10 itens usando os dados existentes
const data = Array.from({ length: 10 }, (_, index) => ({
  ...originalData[index % originalData.length],
  code: `${originalData[index % originalData.length].code}-${index + 1}`,
}))

export const TableClientBuy = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const handleFilterChange = (term: string) => {
    setSearchTerm(term)
    setCurrentPage(1) // Resetar para a primeira página ao filtrar
  }

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage,
  )

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center justify-between w-full">
        <FilterOfTableClient onFilterChange={handleFilterChange} />
        <BsPlus
          className="border rounded-full bg-green-600 font-bold cursor-pointer hover:bg-green-800 text-white"
          width="bold"
          size={40}
        />
      </div>
      <div className="flex flex-col">
        <Table className="min-w-full py-2 text-sm">
          <TableHeader>
            <TableRow className="bg-gray-300 w-auto">
              <TableHead className="text-black w-auto">Cód.</TableHead>
              <TableHead className="text-black w-auto">Razão Social</TableHead>
              <TableHead className="text-black w-auto">Nome Fantasia</TableHead>
              <TableHead className="text-black w-auto">CNPJ</TableHead>
              <TableHead className="text-black w-auto">Telefone</TableHead>
              <TableHead className="text-black w-auto">Representante</TableHead>
              <TableHead className="text-black w-auto">Unidade</TableHead>
              <TableHead className="text-black w-auto">
                Sistema Em Uso
              </TableHead>
              <TableHead className="text-black w-auto">Tipo Estab.</TableHead>
              <TableHead className="text-black w-auto">Sistema</TableHead>
              <TableHead className="text-black w-auto">UF</TableHead>
              <TableHead className="text-black w-auto">Município</TableHead>
              <TableHead className="text-black w-auto">
                Status Imendes
              </TableHead>
              <TableHead className="text-black w-auto"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow
                key={index}
                className={item.type === 'FOOD' ? 'bg-red-100' : ''}
              >
                <TableCell className="text-xs items-center">
                  {item.code}
                </TableCell>
                <TableCell className="text-xs items-center">
                  {item.name}
                </TableCell>
                <TableCell className="text-xs items-center">
                  {item.fantasyName}
                </TableCell>
                <TableCell className="text-xs items-center">
                  {item.cnpj}
                </TableCell>
                <TableCell className="text-xs items-center">
                  {item.phone}
                </TableCell>
                <TableCell className="text-xs items-center">
                  {item.representative}
                </TableCell>
                <TableCell className="text-xs items-center">
                  {item.unit}
                </TableCell>
                <TableCell className="text-xs items-center">
                  {item.system}
                </TableCell>
                <TableCell className="text-xs items-center">
                  {item.type}
                </TableCell>
                <TableCell className="text-xs items-center">
                  {item.active}
                </TableCell>
                <TableCell className="text-xs items-center">
                  {item.uf}
                </TableCell>
                <TableCell className="text-xs items-center">
                  {item.municipio}
                </TableCell>
                <TableCell className="text-xs items-center">
                  {item.status}
                </TableCell>
                <TableCell className="flex items-center justify-center w-full h-full space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit size={24} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash size={24} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
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
