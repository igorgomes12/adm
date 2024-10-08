
import { FaDollarSign } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { ImUsers } from "react-icons/im";


export const menuNavigation = [
  { id: 'canais', label: 'Canais', link: '#' },
  { id: 'rat', label: 'Rat', link: '#' },
  { id: 'relatorios', label: 'Relatórios', link: '#' },
  { id: 'administracao', label: 'Administração', link: '#' },
  { id: 'financeiro', label: 'Financeiro', link: '#' },
  { id: 'programacao', label: 'Programação', link: '#' },
  { id: 'monitoramento', label: 'Monitoramento', link: '#' },
  { id: 'suporte', label: 'Suporte', link: '#' },
  { id: 'utilitarios', label: 'Utilitários', link: '#' },
];

export const canaisItems = [
  { label: 'Clientes de Venda', icon: <BsFillPersonPlusFill /> },
  { label: 'Clientes de Visita', icon: <ImUsers /> },
  { label: 'Contabilidades', icon: <FaDollarSign /> },
  { label: 'Sistemas', icon: <FaDollarSign /> },
  { label: 'Tipo Estabelecimento', icon: <FaDollarSign /> },
  { label: 'Produtos', icon: <FaDollarSign /> },
];

export const ratItems = [
  { label: 'rat', icon: <BsFillPersonPlusFill /> },
];

export const relatoriosItems = [
  { label: 'relatorio', icon: <BsFillPersonPlusFill /> },
];

export const admitems = [
  { label: 'admin', icon: <BsFillPersonPlusFill /> },
];

export type MenuId = 'canais' | 'rat' | 'relatorios' | 'administracao';

export const submenuItems: Record<MenuId, { label: string; icon: JSX.Element }[]> = {
  canais: canaisItems,
  rat: ratItems,
  relatorios: relatoriosItems,
  administracao: admitems,
};
