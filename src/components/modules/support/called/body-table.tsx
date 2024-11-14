import { type FC, useEffect, useState } from "react"
import { TableCell, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { FaEdit, FaTrash } from "react-icons/fa"
import { format } from "date-fns"

const formatTime = (dateString?: string) => {
  if (!dateString) return "N/A"
  const date = new Date(dateString)
  return format(date, "HH:mm:ss")
}

interface CalledRowProps {
  item: {
    id: number
    name: string
    cellphone?: string
    phone?: string
    type: string
    region?: string
    status: string
    timeStarted?: string
  }
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

  return (
    <TableRow className="w-full" key={`representative${item.id}`}>
      <TableCell className="text-sm items-center sticky">{item.id}</TableCell>
      <TableCell className="text-sm items-center sticky">{item.name}</TableCell>
      <TableCell className="text-sm items-center">
        {item.cellphone || "N/A"}
      </TableCell>
      <TableCell className="text-sm items-center">
        {item.phone || "N/A"}
      </TableCell>
      <TableCell className="text-sm items-center">
        {item.timeStarted || "N/A"}
      </TableCell>
      <TableCell
        className={`text-sm items-center justify-center w-28 ${color}`}
      >
        {formatTime(item.timeStarted)}
      </TableCell>
      <TableCell className="text-sm items-center">
        {item.region || "Desconhecido"}
      </TableCell>
      <TableCell className="text-sm items-center">
        <Switch
          checked={item.status === "ativo"}
          onCheckedChange={checked => onStatusChange(item.id, checked)}
        />
      </TableCell>
      <TableCell className="text-sm items-center">{item.type}</TableCell>
      <TableCell className="flex items-center justify-center w-full h-full space-x-2">
        <button
          type="button"
          onClick={() => onOpenFormClient(item.id)}
          className="text-blue-200 hover:text-blue-500"
        >
          <FaEdit size={24} />
        </button>
        <button
          type="button"
          onClick={() => onOpenDelete(item.id)}
          className="text-red-200 hover:text-red-500"
        >
          <FaTrash size={24} />
        </button>
      </TableCell>
    </TableRow>
  )
}
