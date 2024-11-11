import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Switch } from "@radix-ui/react-switch"
import type { FC } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { useAccountsStore } from "../service/zustand"
import { ModalAccountDelete } from "../mod/delete-account"

const headers = ["Cód.", "Descrição", "Saldo atual", "Status", ""]
export const TableAccount: FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const { onOpen, isOpen, mode } = useAccountsStore()

  const tableContent = (
    <TableRow>
      <TableCell className="text-sm items-center">id</TableCell>
      <TableCell className="text-sm items-center">descricao</TableCell>
      <TableCell className="text-sm items-center">saldo atual</TableCell>
      <TableCell className="text-sm items-center">
        <Switch className="w-full h-full" />
      </TableCell>
      <TableCell className="flex items-center justify-center w-full h-full space-x-2">
        <button
          type="button"
          className="text-blue-200 hover:text-blue-500"
          onClick={() => onOpen("default", 1)}
        >
          <FaEdit size={24} />
        </button>
        <button
          onClick={() => onOpen("delete", 1)}
          type="button"
          className="text-red-200 hover:text-red-500"
        >
          <FaTrash size={24} />
        </button>
      </TableCell>
    </TableRow>
  )
  console.log(searchTerm)
  return (
    <div className="flex flex-col h-[80vh] overflow-y-auto">
      <div className="flex-grow">
        <Table className="min-w-full py-2 text-lg">
          <TableHeader>
            <TableRow className="bg-gray-300 w-auto">
              {headers.map(header => (
                <TableHead key={header} className="text-black w-auto">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>{tableContent}</TableBody>
        </Table>
      </div>
      {isOpen && mode === "delete" && <ModalAccountDelete />}
    </div>
  )
}
