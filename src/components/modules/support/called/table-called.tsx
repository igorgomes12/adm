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
import type { CalledDto } from "./data/dto/called-dto"
import { headers } from "@/common/utils/headers-of-tables/headers"
import { LoadingRow } from "@/common/utils/headers-of-tables/loading-tables/loading"
import { CalledRow } from "./body-table"

export const TableCalled: FC<{
  searchTerm: string
  onOpenFormClient: (id: number) => void
}> = ({ searchTerm, onOpenFormClient }) => {
  const { data, isLoading, isError } = useQuery<CalledDto[]>({
    queryKey: ["called"],
    queryFn: async () => {
      const res = await api.get<CalledDto[]>("/called")
      return res.data
    },
    refetchOnWindowFocus: true,
    staleTime: 0,
  })

  const filteredData = useMemo(() => {
    if (!data) return []

    const searchTermLower = searchTerm.toLowerCase().trim()
    const searchWords = searchTermLower.split(/\s+/)

    const matchAllTerms = (value: string) => {
      return searchWords.every(word => value.toLowerCase().includes(word))
    }

    return data.filter(establishment => {
      if (establishment.id?.toString().includes(searchTermLower)) return true
      if (matchAllTerms(establishment.name)) return true
      if (matchAllTerms(establishment.status ? "ativo" : "inativo")) return true
      return false
    })
  }, [data, searchTerm])

  const tableContent = useMemo(() => {
    if (isLoading) return <LoadingRow />
    if (isError) return <div>Erro ao carregar dados.</div>
    if (!filteredData || filteredData.length === 0)
      return <div>Nenhum dado encontrado.</div>

    return filteredData.map(calledItem => {
      // Criar um objeto completo com valores padrão
      const completeCalledItem = {
        ...calledItem,
        cellphone: calledItem.cellphone || "N/A",
        phone: calledItem.phone || "N/A",
        region: calledItem.region || "Desconhecido",
        timeStarted: calledItem.timeStarted || new Date().toISOString(),
      }

      return (
        <CalledRow
          key={completeCalledItem.id}
          item={completeCalledItem}
          onOpenDelete={() => {}}
          onStatusChange={() => {}}
          onOpenFormClient={onOpenFormClient}
        />
      )
    })
  }, [filteredData, isLoading, isError, onOpenFormClient])
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
    </div>
  )
}
