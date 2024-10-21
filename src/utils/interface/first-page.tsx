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
import { HiOutlineChatBubbleLeftEllipsis } from 'react-icons/hi2'
import { FaPersonBooth } from 'react-icons/fa6'

export const menuNavigation = [
  {
    id: 'canais',
    label: 'Canais',
    icon: <HiOutlineChatBubbleLeftEllipsis />,
    subcategories: [
      {
        title: 'Cadastros',
        items: [
          { label: 'Clientes de Venda', icon: <FaUser /> },
          { label: 'Cadastro Cliente', icon: <BsFillPersonPlusFill /> },
          { label: 'Clientes de Visita', icon: <ImUsers /> },
          { label: 'Contabilidades', icon: <FaDollarSign /> },
          { label: 'Sistemas', icon: <FaDesktop /> },
          { label: 'Tipo Estabelecimento', icon: <FaCog /> },
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
  {
    id: 'administracao',
    label: 'Administração',
    icon: <FaCog />,
    subcategories: [
      {
        title: 'Sistemas',
        items: [
          { label: 'Equipamentos', icon: <BsFillPersonPlusFill /> },
          { label: 'Usuários', icon: <ImUsers /> },
          { label: 'Canais', icon: <FaDollarSign /> },
          { label: 'Cadastro Representante', icon: <FaPersonBooth /> },
          { label: 'Unidades', icon: <FaDesktop /> },
          { label: 'Supervisor', icon: <FaCog /> },
          {
            label: 'Ações',
            icon: <FaChartBar />,
            subcategories: [
              {
                title: 'Versões',
                items: [
                  {
                    label: 'Sistema',
                    icon: <BsFillPersonPlusFill />,
                  },
                ],
              },
            ],
          },
          { label: 'Formas de Pagamento', icon: <FaChartBar /> },
          { label: 'Descrição de Chamados', icon: <FaChartBar /> },
          { label: 'Agendar Telemarketing', icon: <FaChartBar /> },
        ],
      },
      {
        title: 'Utilitários',
        items: [
          { label: 'Exportar E-mail', icon: <FaChartBar /> },
          { label: 'Comissão', icon: <FaChartBar /> },
          { label: 'Pagamento comissão', icon: <FaChartBar /> },
          { label: 'Faturamento', icon: <FaChartBar /> },
          { label: 'Scheduler', icon: <FaChartBar /> },
          { label: 'Acordo', icon: <FaChartBar /> },
          { label: 'Máquina', icon: <FaChartBar /> },
          { label: 'Config. Empresa', icon: <FaChartBar /> },
        ],
      },
    ],
  },
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
