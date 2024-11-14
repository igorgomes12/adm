import type { FC } from "react"
import { BsFillPersonFill } from "react-icons/bs"

import { IoIosContacts } from "react-icons/io"

import { BiSolidContact } from "react-icons/bi"
import { Separator } from "@/components/ui/separator"

interface INavCalled {
  title: string
  icon: React.ElementType
  description: string
}

export const navCalled: INavCalled[] = [
  {
    title: "Dados Gerais",
    icon: BsFillPersonFill,
    description: "Dados referentes ao cadastro como clientes..",
  },
  {
    title: "Central de Atendimento",
    icon: IoIosContacts,
    description: "Sistemas, Módulo, tipo, descrição do chamado.. ",
  },
  {
    title: "Descrição",
    icon: BiSolidContact,
    description: "Solicitação, Observação, Resposta, prioridade..",
  },
]

export const CalledNavComponent: FC<{
  onSelect: (title: string) => void
  selected: string | null
}> = ({ onSelect, selected }) => {
  return (
    <nav className="w-full">
      <ul className="flex flex-col">
        {navCalled.map(item => {
          const IconComponent = item.icon
          return (
            <li key={item.title} className="w-full">
              <button
                type="button"
                onClick={() => onSelect(item.title)}
                className="flex items-center space-x-3 leading-tight p-6 w-full bg-gray-200 hover:bg-gray-300"
              >
                <IconComponent
                  className={`text-2xl ${
                    selected === item.title ? "text-lime-600" : "text-gray-600"
                  }`}
                />
                <div className="items-start flex flex-col w-full gap-2">
                  <h3
                    className={`text-md font-semibold ${
                      selected === item.title
                        ? "text-lime-600"
                        : "text-gray-600"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-xs font-extralight ${
                      selected === item.title
                        ? "text-lime-600"
                        : "text-gray-600"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </button>
              <Separator
                orientation="horizontal"
                className="w-full text-black bg-gray-300"
                decorative
              />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}