import { FaEdit, FaTrash } from 'react-icons/fa'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../ui/table'

const systemsData = [
  {
    id: 123,
    name: 'Contabilidade Otavio',
    telefone: '(27)9828-1164',
    crc: '123',
    cnpj: '11.379.457/0001-75',
  },
  {
    id: 456,
    name: 'Contabilidade Geral',
    telefone: '(27)9828-1164',
    crc: '123',
    cnpj: '11.379.457/0001-75',
  },
]

const headers = ['Cód.', 'Nome Contabilidade', 'Telefone', 'Crc', 'CNPJ', '']

export const TableAccounting = () => {
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
        <TableBody>
          {systemsData.map(system => (
            <TableRow key={system.id}>
              {Object.values(system).map((value, index) => (
                <TableCell key={index} className="text-xs items-center">
                  {value}
                </TableCell>
              ))}
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
    </div>
  )
}
