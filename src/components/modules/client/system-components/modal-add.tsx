import { Button } from '@/components/ui/button'
import { useAddClientZustand } from './system-add/zustand-state/add-client'

export const ModalAddClient = () => {
  const { onClose } = useAddClientZustand()

  return (
    <div className="flex h-screen">
      {/* Menu Lateral */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-xl font-bold">Menu</div>
        <nav className="flex-1">
          <ul>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">Account</li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">Security</li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              Plan & Billing
            </li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              Notifications
            </li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">Team</li>
          </ul>
        </nav>
      </aside>

      {/* Área Principal */}
      <main className="flex-1 bg-white p-6">
        <h1 className="text-2xl font-semibold mb-4">Cadastro de Cliente</h1>
        <form>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nome do Cliente"
              className="p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Telefone"
              className="p-2 border rounded"
            />
            {/* Adicione mais campos conforme necessário */}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              className="w-full"
              variant="destructive"
              onClick={onClose}
              type="button"
            >
              Fechar
            </Button>
            <Button className="w-full" type="submit" variant="success">
              Salvar
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
