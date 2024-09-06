import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { FaEdit, FaTrash } from 'react-icons/fa';

const data = [
  {
    code: '3535',
    name: 'CONFECÇÕES RIBEIRO LTDA ME',
    fantasyName: 'LOJA SUBLIME',
    cnpj: '11.379.457/0001-75',
    phone: '(27)9828-1164',
    representative: 'RODRIGO SALT INFORMA',
    unit: 'LIDER AUTOMAÇÃO',
    system: 'WebLider',
    type: 'VESTUARIO',
    active: 'Sim',
    uf: 'ES',
    municipio: 'Brejetuba',
    status: 'Aguardando Cadastro',
  },
  {
    code: '11427',
    name: 'ANTONIA EDINEIDE ALVES',
    fantasyName: 'ANTONIA MODA INTIMA',
    cnpj: '30.671.172/0001-58',
    phone: '(27)9915-3312',
    representative: 'LIDER VILA VELHA',
    unit: 'LIDER AUTOMAÇÃO',
    system: 'WebLider',
    type: 'VESTUARIO',
    active: 'Sim',
    uf: 'MT',
    municipio: 'Brejetuba',
    status: 'Aguardando Cadastro',
  },
  // Add more rows as needed
];

export const TableClientBuy = () => (
  <div className="p-4 overflow-x-auto">
    <Table className="min-w-full text-sm">
      <TableHeader>
        <TableRow className='bg-gray-300'>
          <TableHead className="text-black w-16">Cód.</TableHead>
          <TableHead className="text-black w-32">Razão Social</TableHead>
          <TableHead className="text-black w-32">Nome Fantasia</TableHead>
          <TableHead className="text-black w-28">CNPJ</TableHead>
          <TableHead className="text-black w-28">Telefone 1</TableHead>
          <TableHead className="text-black w-32">Representante</TableHead>
          <TableHead className="text-black w-28">Unidade</TableHead>
          <TableHead className="text-black w-28">Sistema Em Uso</TableHead>
          <TableHead className="text-black w-28">Tipo Estab.</TableHead>
          <TableHead className="text-black w-16">Sistema</TableHead>
          <TableHead className="text-black w-8">UF</TableHead>
          <TableHead className="text-black w-28">Município</TableHead>
          <TableHead className="text-black w-32">Status Imendes</TableHead>
          <TableHead className="text-black w-20"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow
            key={index}
            className={item.type === 'FOOD' ? 'bg-red-100' : ''}
          >
            <TableCell>{item.code}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.fantasyName}</TableCell>
            <TableCell>{item.cnpj}</TableCell>
            <TableCell>{item.phone}</TableCell>
            <TableCell>{item.representative}</TableCell>
            <TableCell>{item.unit}</TableCell>
            <TableCell>{item.system}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.active}</TableCell>
            <TableCell>{item.uf}</TableCell>
            <TableCell>{item.municipio}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell className="flex items-center justify-center w-full h-full space-x-2">
              <button className="text-blue-500 hover:text-blue-700">
                <FaEdit size={24} />
              </button>
              <button className="text-red-500 hover:text-red-700">
                <FaTrash size={24} />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
