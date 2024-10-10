import { Button } from '../ui/button'

type TLogout = {
  onCancel: () => void
  onConfirm: () => void
}

export const Logout = ({ onCancel, onConfirm }: TLogout) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 items-center justify-center flex flex-col gap-8 sm:w-2/3 lg:w-1/3">
        <p className="text-black text-lg lg:text-xl font-semibold">
          Deseja realmente sair?
        </p>
        <div className="flex w-full gap-2 flex-col lg:flex-row justify-center items-center">
          <Button
            variant={'success'}
            onClick={onCancel}
            className=" px-4 py-2 w-full rounded "
          >
            Cancelar
          </Button>
          <Button
            variant={'destructive'}
            onClick={onConfirm}
            className=" text-white w-full px-4 py-2 rounded "
          >
            Sair
          </Button>
        </div>
      </div>
    </div>
  )
}
