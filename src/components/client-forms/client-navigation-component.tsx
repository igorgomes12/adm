import type { FC } from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { Separator } from '../ui/separator'
import { FaRegAddressCard } from 'react-icons/fa'
import { MdContactPhone } from 'react-icons/md'
import { FaPersonCirclePlus, FaPersonShelter } from 'react-icons/fa6'

interface INavClient {
  title: string
  icon: React.ElementType // Use ElementType para componentes de ícone
  description: string
}

const navClients: INavClient[] = [
  {
    title: 'Empresa',
    icon: BsFillPersonFill,
    description: 'Dados referentes a empresa como nomes, CNPJ, etc.',
  },
  {
    title: 'Contatos',
    icon: MdContactPhone,
    description: 'Cadastrar os contatos da empresa, telefones e emails.',
  },
  {
    title: 'Endereços',
    icon: FaRegAddressCard,
    description: 'Cadastrar o endereço da empresa, bairro, municipio.',
  },
  {
    title: 'Representante',
    icon: FaPersonCirclePlus,
    description: 'Cadastrar dados dos representantes.',
  },
  {
    title: 'Proprietário',
    icon: FaPersonShelter,
    description: 'Cadastrar dados do proprietário da empresa.',
  },
]

export const ClientNavigationComponent: FC<{
  onSelect: (title: string) => void
  selected: string | null
}> = ({ onSelect, selected }) => {
  return (
    <nav className="w-full">
      <ul className="flex flex-col">
        {navClients.map((item, index) => {
          const IconComponent = item.icon
          return (
            <li key={index} className="w-full">
              <button
                onClick={() => onSelect(item.title)}
                className="flex items-center space-x-3 leading-tight p-6 w-full bg-gray-200 hover:bg-gray-300"
              >
                <IconComponent
                  className={`text-2xl ${
                    selected === item.title ? 'text-sky-500' : 'text-gray-600'
                  }`}
                />
                <div className="items-start flex flex-col w-full gap-2">
                  <h3
                    className={`text-md font-semibold ${
                      selected === item.title ? 'text-sky-500' : 'text-gray-600'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-xs font-extralight ${
                      selected === item.title ? 'text-sky-500' : 'text-gray-600'
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
