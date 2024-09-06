
import { FaDollarSign } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { ImUsers } from "react-icons/im";


export const menuNavigation: {label:string, link: string}[] = [
  { label: 'Canais', link: '#' },
  { label: 'Relatórios', link: '#' },
  { label: 'Administração', link: '#' },
  { label: 'Financeiro', link: '#' },
  { label: 'Programação', link: '#' },
  { label: 'Monitoramento', link: '#' },
  { label: 'Suporte', link: '#' },
  { label: 'Utilitários', link: '#' },
];

export const canaisItems: {label:string, icon:JSX.Element}[] = [
  { label: 'Clientes de Venda', icon: <BsFillPersonPlusFill /> },
  { label: 'Clientes de Visita', icon: <ImUsers /> },
  { label: 'Contabilidades', icon: <FaDollarSign />  },
];
