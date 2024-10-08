import { FaEdit, FaTrash } from 'react-icons/fa'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../ui/table'
import { useSystemDeleteZustand } from './system-add/zustand-state/system-del-zustand'
import { ModalSystemDelete } from './system-add/modal-delete-system'
import { ModalSystemEdit } from './system-add/modal-edit-system'
import { useSystemEditZustand } from './system-add/zustand-state/system-edit-zustand'

const systemsData = [
  { id: 123, name: 'Lider API' },
  { id: 456, name: 'Another System' },
  // Adicione mais sistemas conforme necessário
]

export const TableSystem = () => {
  const { isOpen, onOpen } = useSystemDeleteZustand()
  const { isOpen: isOpenEdit, onOpen: onOpenEdit } = useSystemEditZustand()

  const handleEditClick = (id: number) => {
    onOpenEdit(id)
  }

  const handleDeleteClick = (id: number) => {
    onOpen(id)
  }

  return (
    <div className="flex flex-col mt-4">
      <Table className="min-w-full py-2 text-sm">
        <TableHeader>
          <TableRow className="bg-gray-300 w-auto">
            <TableHead className="text-black w-auto">Cód.</TableHead>
            <TableHead className="text-black w-auto">Nome Software</TableHead>
            <TableHead className="text-black w-auto"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {systemsData.map(system => (
            <TableRow key={system.id}>
              <TableCell className="text-xs items-center">
                {system.id}
              </TableCell>
              <TableCell className="text-xs items-center">
                {system.name}
              </TableCell>
              <TableCell className="flex items-center justify-center w-full h-full space-x-2">
                <button
                  onClick={() => handleEditClick(system.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit size={24} />
                </button>
                <button
                  onClick={() => handleDeleteClick(system.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={24} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isOpen && <ModalSystemDelete />}
      {isOpenEdit && <ModalSystemEdit />}
    </div>
  )
}
