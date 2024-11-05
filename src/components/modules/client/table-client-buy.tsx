import { SkeletonCard } from "@/components/skeleton-component/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import api from "@/infra/auth/database/acess-api/interceptors-axios"
import { useQuery } from "@tanstack/react-query"
import { type FC, useMemo, useState } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import Paginations from "./pagination"
import type { TAddress } from "./zod-form/zod_address.schema"
import type { TClient } from "./zod-form/zod_client.schema"
import type { TContact } from "./zod-form/zod_contact.schema"
import { useClientDeleteZustand } from "./zustand/use-delete-client"
import { ModalClientDelete } from "./mod/delete-client"

interface ITableClientBuyProps {
  searchTerm: string
  onOpenFormClient: (id: number) => void
}

const headers = [
  "Cód.",
  "Nome",
  "CNPJ",
  "Contato",
  "Representante",
  "Sistema",
  "Endereço",
  "",
]

export const TableClientBuy: FC<ITableClientBuyProps> = ({
  searchTerm,
  onOpenFormClient,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { onOpen, isOpen } = useClientDeleteZustand()
  const itemsPerPage = 4

  const { data, isLoading, error } = useQuery<TClient[]>({
    queryKey: ["clients"],
    queryFn: async () => {
      const response = await api.get("/client")
      return response.data
    },
  })

  const filteredData = useMemo(() => {
    if (!data) return []
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    const result = data.filter((item: TClient) =>
      Object.values(item).some(
        value =>
          typeof value === "string" &&
          value.toLowerCase().includes(lowerCaseSearchTerm)
      )
    )
    return result
  }, [data, searchTerm])

  console.log(data)

  const tableContent = useMemo(() => {
    if (isLoading || !data || data.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={9}>
            <SkeletonCard />
          </TableCell>
        </TableRow>
      )
    }
    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={9}>
            <div className="items-center justify-center flex w-full ">
              Erro ao carregar os dados: {error.message}
            </div>
          </TableCell>
        </TableRow>
      )
    }

    return data.map((item: TClient) => (
      <TableRow
        key={item.id}
        className={
          item.inDebt
            ? "bg-rose-100 hover:bg-rose-400 "
            : "animate-none hover:bg-gray-100"
        }
      >
        <TableCell className="text-sm items-center">{item.id}</TableCell>
        <TableCell className="text-sm items-center">
          <p className="font-bold">{item.fantasy_name}</p> -{" "}
          {item.corporate_name}
        </TableCell>
        <TableCell className="text-sm items-center">{item.cpf_cnpj}</TableCell>
        <TableCell className="text-sm items-center">
          {(item.contacts || [])
            .map((contact: TContact) => contact.contact)
            .join(", ")}
        </TableCell>
        <TableCell className="text-sm items-center">
          {item.representative}
        </TableCell>
        <TableCell className="text-sm items-center">{item.systemsId}</TableCell>

        <TableCell className="text-sm items-center">
          {(item.addresses || []).map((address: TAddress) => (
            <div key={address.id} className="flex gap-2 text-xs">
              <p className="font-bold">{address.neighborhood}</p>
              {"-"}
              <p>
                {address.street}, {address.number}
              </p>
            </div>
          ))}
        </TableCell>
        <TableCell className="flex items-center justify-center w-full h-full space-x-2">
          <button
            type="button"
            onClick={() => onOpenFormClient(item.id || 0)}
            className="text-blue-200 hover:text-blue-500"
          >
            <FaEdit size={24} />
          </button>

          <button
            onClick={() => onOpen(item.id || 0)}
            type="button"
            className="text-red-200 hover:text-red-500"
          >
            <FaTrash size={24} />
          </button>
        </TableCell>
      </TableRow>
    ))
  }, [isLoading, error, data, onOpenFormClient, onOpen])

  return (
    <div className="flex flex-col mt-4">
      <Table className="min-w-full py-2 cursor-pointer text-lg">
        <TableHeader>
          <TableRow className="bg-gray-300 w-auto">
            {headers.map(header => (
              <TableHead key={`table-${header}`} className="text-black w-auto">
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
      {isOpen && <ModalClientDelete />}
    </div>
  )
}
