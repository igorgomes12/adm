import {
  FaBell,
  FaChartBar,
  FaCog,
  FaDesktop,
  FaDollarSign,
  FaHeadset,
  FaUser,
} from 'react-icons/fa'
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { ImUsers } from 'react-icons/im'
import { ChatBubbleIcon } from '@radix-ui/react-icons'

export const menuNavigation = [
  {
    id: 'canais',
    label: 'Canais',
    icon: <ChatBubbleIcon />,
    subcategories: [
      {
        title: 'Cadastros',
        items: [
          { label: 'Clientes de Venda', icon: <BsFillPersonPlusFill /> },
          { label: 'Clientes de Visita', icon: <ImUsers /> },
          { label: 'Contabilidades', icon: <FaDollarSign /> },
          { label: 'Sistemas', icon: <FaDesktop /> },
          { label: 'Tipo Estabelecimento', icon: <FaCog /> },
          { label: 'Produtos', icon: <FaChartBar /> },
        ],
      },
      {
        title: 'Lançamentos',
        items: [
          { label: 'Orçamentos', icon: <FaChartBar /> },
          { label: 'Planilha de Venda', icon: <FaChartBar /> },
          { label: 'Visitas', icon: <FaChartBar /> },
          { label: 'Agenda', icon: <FaChartBar /> },
          { label: 'Consignação de Produto', icon: <FaChartBar /> },
        ],
      },
    ],
  },
  { id: 'rat', label: 'Rat', link: '#', icon: <FaHeadset /> },
  { id: 'relatorios', label: 'Relatórios', link: '#', icon: <FaChartBar /> },
  { id: 'administracao', label: 'Administração', link: '#', icon: <FaCog /> },
  { id: 'financeiro', label: 'Financeiro', link: '#', icon: <FaDollarSign /> },
  { id: 'programacao', label: 'Programação', link: '#', icon: <FaDesktop /> },
  { id: 'monitoramento', label: 'Monitoramento', link: '#', icon: <FaBell /> },
  { id: 'suporte', label: 'Suporte', link: '#', icon: <FaUser /> },
  { id: 'utilitarios', label: 'Utilitários', link: '#', icon: <ImUsers /> },
]

export const canaisItems = [
  { label: 'Clientes de Venda', icon: <BsFillPersonPlusFill /> },
  { label: 'Clientes de Visita', icon: <ImUsers /> },
  { label: 'Contabilidades', icon: <FaDollarSign /> },
  { label: 'Sistemas', icon: <FaDesktop /> },
  { label: 'Tipo Estabelecimento', icon: <FaCog /> },
  { label: 'Produtos', icon: <FaChartBar /> },
]

export const ratItems = [{ label: 'Rat', icon: <FaHeadset /> }]

export const relatoriosItems = [{ label: 'Relatório', icon: <FaBell /> }]

export const admitems = [{ label: 'Admin', icon: <FaUser /> }]

export type MenuId = 'canais' | 'rat' | 'relatorios' | 'administracao'

export const submenuItems: Record<
  MenuId,
  { label: string; icon: JSX.Element }[]
> = {
  canais: canaisItems,
  rat: ratItems,
  relatorios: relatoriosItems,
  administracao: admitems,
}

export type TError = {
  status: string
  message: string
}
