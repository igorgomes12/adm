import { type FC, useEffect, useState } from "react"
import { TableCell, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { FaEdit, FaTrash } from "react-icons/fa"
import type { CalledDto } from "./data/dto/called-dto"
import { formatarData, formatarHora } from "@/common/utils/formater/date"

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
  onStatusChange,
}) => {
  const [color, setColor] = useState("bg-green-500")

  useEffect(() => {
    const updateColor = () => {
      if (!item.timeStarted) return
      const now = new Date()
      const startTime = new Date(item.timeStarted)
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
  }, [item.timeStarted])

  const dataOriginal: Date | null | undefined = item.createdAt

  const dataFormatada = formatarData(dataOriginal)
  const horaFormatada = formatarHora(dataOriginal)

  return (
    <TableRow className="w-full" key={`representative${item.id}`}>
      <TableCell className="text-sm items-center sticky">{item.id}</TableCell>
      <TableCell className="text-sm items-center sticky">
        {item.priority}
      </TableCell>
      <TableCell className="text-sm items-center">{item.name}</TableCell>
      <TableCell className="text-sm items-center">{item.caller}</TableCell>
      <TableCell className="text-sm items-center">{dataFormatada}</TableCell>
      <TableCell
        className={`text-sm items-center justify-center w-28 ${color}`}
      >
        {horaFormatada}
      </TableCell>
      <TableCell className="text-sm items-center">{item.description}</TableCell>
      <TableCell className="text-sm items-center">
        <Switch
          checked={item.status}
          onCheckedChange={checked => onStatusChange(item.id || 0, checked)}
        />
      </TableCell>
      <TableCell className="text-sm items-center">{item.type}</TableCell>
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
