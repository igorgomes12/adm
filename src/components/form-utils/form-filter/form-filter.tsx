import { ButtonAdd } from '@/components/buttons/buttons-add'
import type { FC } from 'react'

interface FormFilterProps {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  onOpen: (id: number) => void  
}

export const FormFilter: FC<FormFilterProps> = ({
  searchTerm,
  setSearchTerm,
  onOpen,
}) => {

  const handleAddClick = () => {
    const id = 0; 
    onOpen(id);
  };

  return (
    <div className="flex gap-2 items-center justify-between w-full">
      <input
        placeholder="Pesquisar"
        type="text"
        className="p-2 cursor-text w-full border rounded-lg"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ButtonAdd onOpen={handleAddClick} />
    </div>
  )
}
