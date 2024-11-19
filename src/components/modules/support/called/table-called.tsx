import { type FC, useMemo } from "react"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/infra/auth/database/acess-api/api"
import { headers } from "@/common/utils/headers-of-tables/headers"
import { LoadingRow } from "@/common/utils/headers-of-tables/loading-tables/loading"
import { CalledRow } from "./body-table"
import type { CalledDto } from "./data/dto/called.dto"
import { useCalledStore } from "./data/entity/hook/use-called"
import { ModalCalledDelete } from "./data/mod/delete-called"

export const TableCalled: FC<{
  searchTerm: string
  onOpenFormClient: (id: number) => void
}> = ({ searchTerm, onOpenFormClient }) => {
  const { isOpen, onOpen } = useCalledStore()

  const { data, isLoading, isError } = useQuery<CalledDto[]>({
    queryKey: ["called"],
    queryFn: async () => {
      const res = await api.get<CalledDto[]>("/called")
      return res.data
    },
    refetchOnWindowFocus: true,
  })

  const filteredData = useMemo(() => {
    if (!data) return []

    const searchTermLower = searchTerm.toLowerCase().trim()
    const searchWords = searchTermLower.split(/\s+/)

    const matchAllTerms = (value: string | undefined) => {
      return value
        ? searchWords.every(word => value.toLowerCase().includes(word))
        : false
    }

    return data.filter(calledItem => {
      const { dadosGerais, descricao, centralAtendimento } = calledItem

      if (dadosGerais?.caller && matchAllTerms(dadosGerais.caller)) return true
      if (descricao?.priority && matchAllTerms(descricao.priority)) return true
      if (centralAtendimento?.type && matchAllTerms(centralAtendimento.type))
        return true

      return false
    })
  }, [data, searchTerm])

  const tableContent = useMemo(() => {
    if (isLoading) return <LoadingRow />
    if (isError) return <div>Erro ao carregar dados.</div>
    if (!filteredData || filteredData.length === 0)
      return <div>Nenhum dado encontrado.</div>

    return filteredData.map(calledItem => (
      <CalledRow
        key={calledItem.id}
        item={calledItem}
        onOpenDelete={() => onOpen("delete", calledItem.id)}
        onStatusChange={() => {}}
        onOpenFormClient={onOpenFormClient}
      />
    ))
  }, [filteredData, isLoading, isError, onOpenFormClient, onOpen])

  return (
    <div className="flex flex-col mt-4">
      <Table className="min-w-full py-2 cursor-pointer text-lg">
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
      {isOpen && <ModalCalledDelete />}
    </div>
  )
}
