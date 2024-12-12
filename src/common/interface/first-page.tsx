import { BiBuildingHouse } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";
import { GrSystem } from "react-icons/gr";
import { VscFileSubmodule } from "react-icons/vsc";
import { LuCalendarPlus } from "react-icons/lu";
import { FaCreditCard } from "react-icons/fa6";
import { LuBookOpen } from "react-icons/lu";

import {
  FaBell,
  FaChartBar,
  FaCog,
  FaDesktop,
  FaDollarSign,
  FaHeadset,
  FaUser,
} from "react-icons/fa";
import { RiSafe2Line } from "react-icons/ri";

import {
  HiMiniMegaphone,
  HiOutlineChatBubbleLeftEllipsis,
} from "react-icons/hi2";
import { ImUsers } from "react-icons/im";
import { FaPenToSquare } from "react-icons/fa6";

export const menuNavigation = [
  {
    id: "canais",
    label: "Canais",
    icon: <HiOutlineChatBubbleLeftEllipsis />,
    subcategories: [
      {
        title: "Cadastros",
        items: [
          { label: "Clientes de Venda", icon: <FaUser /> },
          { label: "Contabilidades", icon: <FaDollarSign /> },
          { label: "Tipo Estabelecimento", icon: <BiBuildingHouse /> },
        ],
      },
      {
        title: "Lançamentos",
        items: [{ label: "Orçamentos", icon: <LuBookOpen /> }],
      },
    ],
  },
  // { id: "relatorios", label: "Relatórios", link: "#", icon: <FaChartBar /> },
  {
    id: "administracao",
    label: "Administração",
    icon: <FaCog />,
    subcategories: [
      {
        title: "Sistemas",
        items: [
          { label: "Usuários", icon: <ImUsers /> },
          { label: "Canais", icon: <FaDollarSign /> },

          // {
          //   label: "Ações",
          //   icon: <FaChartBar />,
          //   subcategories: [
          //     {
          //       title: "Versões",
          //       items: [
          //         {
          //           label: "Sistema",
          //           icon: <BsFillPersonPlusFill />,
          //         },
          //       ],
          //     },
          //   ],
          // },
          { label: "Formas de Pagamento", icon: <GiTakeMyMoney /> },
          { label: "Descrição de Chamados", icon: <FaPenToSquare /> },
          // { label: "Administradora de Cartão", icon: <FaCreditCard /> },
          // { label: "Agendar Telemarketing", icon: <FaChartBar /> },
        ],
      },
      {
        title: "Utilitários",
        items: [
          // { label: "Exportar E-mail", icon: <FaChartBar /> },
          // { label: "Comissão", icon: <FaChartBar /> },
          // { label: "Pagamento comissão", icon: <FaChartBar /> },
          // { label: "Faturamento", icon: <FaChartBar /> },
          // { label: "Scheduler", icon: <FaChartBar /> },
          { label: "Acordo", icon: <LuCalendarPlus /> },
          // { label: "Máquina", icon: <FaChartBar /> },
          // { label: "Config. Empresa", icon: <FaChartBar /> },
        ],
      },
    ],
  },
  {
    id: "financeiro",
    label: "Financeiro",
    icon: <FaDollarSign />,
    subcategories: [
      {
        title: "Conta",
        items: [
          { label: "Contas", icon: <RiSafe2Line /> },
          { label: "Administradora de Cartão", icon: <FaCreditCard /> },
        ],
      },
    ],
  },
  {
    id: "programacao",
    label: "Programação",
    icon: <FaDesktop />,
    subcategories: [
      {
        title: "Informação",
        items: [
          { label: "Sistemas", icon: <GrSystem /> },
          { label: "Módulo", icon: <VscFileSubmodule /> },
        ],
      },
    ],
  },
  // { id: "monitoramento", label: "Monitoramento", link: "#", icon: <FaBell /> },
  {
    id: "suporte",
    label: "Suporte",
    icon: <FaUser />,
    subcategories: [
      {
        title: "Suporte",
        items: [
          // { label: "Clientes", icon: <FaUsers /> },
          // { label: "Implantação", icon: <FaDollarSign /> },
          // { label: "Requisições", icon: <FaDesktop /> },
          { id: "chamados", label: "Chamados", icon: <HiMiniMegaphone /> },
          // { label: "Agendas", icon: <IoCalendarOutline /> },
        ],
      },
      // {
      //   title: "Lançamentos",
      //   items: [{ label: "Planilha de Venda", icon: <BsJournalPlus /> }],
      // },
    ],
  },
  // { id: "utilitarios", label: "Utilitários", link: "#", icon: <ImUsers /> },
];

export const canaisItems = [
  { label: "Clientes de Venda", icon: <BsFillPersonPlusFill /> },
  { label: "Clientes de Visita", icon: <ImUsers /> },
  { label: "Contabilidades", icon: <FaDollarSign /> },
  { label: "Sistemas", icon: <FaDesktop /> },
  { label: "Tipo Estabelecimento", icon: <FaCog /> },
  { label: "Produtos", icon: <FaChartBar /> },
];

export const ratItems = [{ label: "Rat", icon: <FaHeadset /> }];

export const relatoriosItems = [{ label: "Relatório", icon: <FaBell /> }];

export const admitems = [{ label: "Admin", icon: <FaUser /> }];

export type MenuId = "canais" | "rat" | "relatorios" | "administracao";

export const submenuItems: Record<
  MenuId,
  { label: string; icon: JSX.Element }[]
> = {
  canais: canaisItems,
  rat: ratItems,
  relatorios: relatoriosItems,
  administracao: admitems,
};

export type TError = {
  status: string;
  message: string;
};
