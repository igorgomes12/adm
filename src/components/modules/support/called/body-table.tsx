import { type FC, useEffect, useState } from "react"
import { TableCell, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { FaEdit, FaTrash } from "react-icons/fa"
import { formatarData, formatarHora } from "@/common/utils/formater/date"
import type { CalledDto } from "./data/dto/called.dto"

interface CalledRowProps {
  item: CalledDto
  onOpenDelete: (id: number) => void
  onOpenFormClient: (id: number) => void
  onStatusChange: (id: number, newStatus: boolean) => void
}

export const CalledRow: FC<CalledRowProps> = ({
  item,
  onOpenDelete,
  onOpenFormClient,
}) => {
  const [color, setColor] = useState("text-green-500 font-bold text-lg")
  const [status, setStatus] = useState(item.descricao.note === "ativo")

  useEffect(() => {
    const updateColor = () => {
      if (!item.dadosGerais.createdAt) return
      const now = new Date()
      const startTime = new Date(item.dadosGerais.createdAt)
      const timeElapsed =
        (now.getTime() - startTime.getTime()) / (1000 * 60 * 60)

      if (timeElapsed <= 1) {
        setColor("text-green-500 font-bold text-lg")
      } else if (timeElapsed <= 2) {
        setColor("text-yellow-500 font-bold text-lg")
      } else {
        setColor("text-red-500 font-bold text-lg")
      }
    }

    const interval = setInterval(updateColor, 60 * 1000)
    updateColor()

    return () => clearInterval(interval)
  }, [item.dadosGerais.createdAt])

  const dataOriginal: Date | null | undefined = item.dadosGerais.createdAt
    ? new Date(item.dadosGerais.createdAt)
    : null
  const dataFormatada = formatarData(dataOriginal)
  const horaFormatada = formatarHora(dataOriginal)

  const handleStatusChange = async (id: number, newStatus: boolean) => {
    try {
      const response = await fetch(`/called/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus ? "ativo" : "inativo" }),
      })

      if (!response.ok) {
        throw new Error("Erro ao atualizar o status")
      }

      setStatus(newStatus)
    } catch (error) {
      console.error("Erro ao atualizar o status:", error)
    }
  }
  console.log("item", item.id)
  return (
    <TableRow
      className="w-full"
      key={`representative-${item.dadosGerais.caller}`}
    >
      <TableCell className="text-sm items-center sticky">{item.id}</TableCell>
      <TableCell className="text-sm items-center sticky">
        {item.descricao.priority}
      </TableCell>
      <TableCell className="text-sm items-center">
        {item.dadosGerais.name || "Desconhecido"}
      </TableCell>
      <TableCell className="text-sm items-center">
        {item.dadosGerais.caller}
      </TableCell>
      <TableCell className="text-sm items-center">{dataFormatada}</TableCell>
      <TableCell
        className={`text-sm items-center justify-center w-28 ${color}`}
      >
        {horaFormatada}
      </TableCell>
      <TableCell className="text-sm items-center">
        {item.centralAtendimento.description}
      </TableCell>
      <TableCell className="text-sm items-center">
        <Switch
          checked={status}
          onCheckedChange={checked => handleStatusChange(item.id || 0, checked)}
        />
      </TableCell>
      <TableCell className="text-sm items-center">
        {item.centralAtendimento.type}
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
          type="button"
          onClick={() => onOpenDelete(item.id || 0)}
          className="text-red-200 hover:text-red-500"
        >
          <FaTrash size={24} />
        </button>
      </TableCell>
    </TableRow>
  )
}
