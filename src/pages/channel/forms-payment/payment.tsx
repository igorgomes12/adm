import { FormFilter } from '@/components/form-utils/form-filter/form-filter'
import { FormHeader } from '@/components/form-utils/form-header/form-header'
import { PaymentModal } from '@/components/modules/Forms-payment/models/model-payment'
import { TablePayment } from '@/components/modules/Forms-payment/table-payment'
import { usePaymentZustand } from '@/components/modules/Forms-payment/zustand-payment/payment-zustand'
import { useState, type FC } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const PaymentComponent: FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { isOpen, mode, onOpen } = usePaymentZustand()

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Formas de Pagamento" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpen={() => onOpen('add')}
        showPrinterButton={true}
      />
      <TablePayment searchTerm={searchTerm} />
      {isOpen && mode === 'add' && <PaymentModal />}
      <ToastContainer />
    </div>
  )
}
