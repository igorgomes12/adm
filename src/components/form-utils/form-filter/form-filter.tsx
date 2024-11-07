import type React from "react"
import { ButtonAdd } from "@/components/buttons/buttons-add"
import { BsFillPrinterFill, BsPlus } from "react-icons/bs"

interface FormFilterProps {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  onOpen: (id: number) => void
  showPrinterButton?: boolean
  onOpenPDF?: () => void
}

export const FormFilter: React.FC<FormFilterProps> = ({
  searchTerm,
  setSearchTerm,
  onOpen,
  showPrinterButton = false,
  onOpenPDF,
}) => {
  const handleAddClick = () => {
    onOpen(0)
  }

  return (
    <div className="flex gap-2 items-center justify-between w-full">
      <input
        placeholder="Pesquisar"
        type="text"
        className="p-2 cursor-text w-full border rounded-lg"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      {showPrinterButton && onOpenPDF && (
        <ButtonAdd
          icon={
            <BsFillPrinterFill
              width="bold"
              className="p-2 bg-lime-600 hover:bg-lime-600 rounded-full"
              size={40}
              onClick={onOpenPDF}
            />
          }
        />
      )}

      <ButtonAdd
        icon={<BsPlus width="bold" size={40} />}
        onOpen={handleAddClick}
      />
    </div>
  )
}
