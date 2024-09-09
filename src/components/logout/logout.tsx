type TLogout = {
  onCancel: () => void
  onConfirm: () => void
}

export const Logout = ({ onCancel, onConfirm }: TLogout) => {
  return (
    <div className="absolute top-16 right-4 items-center justify-center bg-white shadow-lg rounded-md p-4 z-10">
      <p className="text-black mb-4">Deseja realmente sair?</p>
      <div className="flex justify-center space-x-2">
        <button
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sair
        </button>
      </div>
    </div>
  )
}
