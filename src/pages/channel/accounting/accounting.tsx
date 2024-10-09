import type { FC } from 'react'
import { TableAccounting } from '@/components/accounting-components/table-accountig'
import { ButtonAdd } from '@/components/buttons/buttons-add'
import { useAccountingStore } from '@/components/accounting-components/zustand-accounting/create-zustand'
import { ModalAccountingAdd } from '@/components/accounting-components/modal-accouting/modal-accounting-add'

export const AccountingComponent: FC = () => {
  const { isOpen, onOpen } = useAccountingStore()
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-start justify-start">
        <h1 className="text-2xl font-semibold">Cadastro de Contabilidades</h1>
      </div>
      <div className="flex gap-2 items-center justify-between w-full">
        <input
          placeholder="Pesquisar"
          type="text"
          className="p-2 cursor-text w-full border rounded-lg"
        />
        <ButtonAdd onOpen={onOpen} />
      </div>
      <TableAccounting />
      {isOpen && <ModalAccountingAdd />}
    </div>
  )
}
