import { TableCell, TableRow } from "@/components/ui/table";
import { Switch } from "@radix-ui/react-switch";
import { format } from "date-fns";
import { FC, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

// Objeto mockado
export const item = {
  id: 1,
  name: "Representante XYZ",
  cellphone: "123456789",
  phone: "987654321",
  type: "REPRESENTATIVE",
  region: "Sudeste",
  status: "ativo",
  timeStarted: "2024-11-13T10:00:00Z",
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "HH:mm:ss");
};

interface CalledRowProps {
  item: typeof item;
  onOpenDelete: (id: number) => void;
  onOpenFormClient: (id: number) => void;
  onStatusChange: (id: number, newStatus: boolean) => void;
}

export const CalledRow: FC<CalledRowProps> = ({
  item,
  onOpenDelete,
  onOpenFormClient,
  onStatusChange,
}) => {
  const [color, setColor] = useState("bg-green-500");

  useEffect(() => {
    const updateColor = () => {
      const now = new Date();
      const startTime = new Date(item.timeStarted);
      const timeElapsed =
        (now.getTime() - startTime.getTime()) / (1000 * 60 * 60);

      if (timeElapsed <= 1) {
        setColor("bg-green-400 font-semibold");
      } else if (timeElapsed <= 2) {
        setColor("bg-yellow-400 font-semibold");
      } else {
        setColor("bg-red-400 font-semibold");
      }
    };

    const interval = setInterval(updateColor, 60 * 1000);
    updateColor();

    return () => clearInterval(interval);
  }, [item.timeStarted]);

  return (
    <TableRow className="w-full" key={`representative${item.id}`}>
      <TableCell className="text-sm items-center sticky">{item.id}</TableCell>
      <TableCell className="text-sm items-center sticky">{item.name}</TableCell>
      <TableCell className="text-sm items-center">{item.cellphone}</TableCell>
      <TableCell className="text-sm items-center">{item.phone}</TableCell>
      <TableCell className="text-sm items-center">{item.timeStarted}</TableCell>
      <TableCell
        className={`text-sm items-center justify-center w-28 ${color}`}
      >
        {formatTime(item.timeStarted)}
      </TableCell>
      <TableCell className="text-sm items-center">{item.region}</TableCell>
      <TableCell className="text-sm items-center">{item.status}</TableCell>
      <TableCell className="text-sm items-center">
        <Switch
          checked={item.status === "ativo"}
          onCheckedChange={(checked) => onStatusChange(item.id, checked)}
        />
      </TableCell>
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
  );
};
