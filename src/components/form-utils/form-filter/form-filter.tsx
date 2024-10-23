import { ButtonAdd } from '@/components/buttons/buttons-add'
import type { FC } from 'react'
import { BsFillPrinterFill, BsPlus } from 'react-icons/bs'

interface FormFilterProps {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  onOpen: (id: number) => void
  showPrinterButton?: boolean // Propriedade opcional para exibir o botão de impressão
}

export const FormFilter: FC<FormFilterProps> = ({
  searchTerm,
  setSearchTerm,
  onOpen,
  showPrinterButton = false, // Valor padrão é false
}) => {
  const handleAddClick = () => {
    const id = 0
    onOpen(id)
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

      {showPrinterButton && (
        <ButtonAdd
          icon={
            <BsFillPrinterFill
              width="bold"
              className="p-2 bg-sky-500 hover:bg-sky-600 rounded-full"
              size={40}
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
