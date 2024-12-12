import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Paginations from "../../client/pagination";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useMemo, type FC } from "react";
import usePaginationStore from "@/components/pagination/hook/use-pagination";

const headers = ["Cód.", "Descrição", "Data de Pagar", "Parcelado", ""];

type TMockData = {
  id: number;
  description: string;
  dueDate: string;
  installment: string;
};

const mockData: TMockData[] = [
  {
    id: 1,
    description: "Pagamento de Serviço",
    dueDate: "2024-12-15",
    installment: "Sim",
  },
  {
    id: 2,
    description: "Compra de Material",
    dueDate: "2024-12-20",
    installment: "Não",
  },
  // Adicione mais dados mockados conforme necessário
];

const TableRowComponent: FC<{
  data: TMockData;
  onOpenEdit: (id: number) => void;
  onOpenDelete: (id: number) => void;
}> = ({ data, onOpenEdit, onOpenDelete }) => {
  return (
    <TableRow>
      <TableCell className="text-sm items-center">{data.id}</TableCell>
      <TableCell className="text-sm items-center">{data.description}</TableCell>
      <TableCell className="text-sm items-center">{data.dueDate}</TableCell>
      <TableCell className="text-sm items-center">{data.installment}</TableCell>
      <TableCell className="flex items-center justify-center w-full h-full space-x-2">
        <button
          type="button"
          onClick={() => onOpenEdit(data.id)}
          className="text-blue-200 hover:text-blue-500"
        >
          <FaEdit size={24} />
        </button>
        <button
          type="button"
          onClick={() => onOpenDelete(data.id)}
          className="text-red-200 hover:text-red-500"
        >
          <FaTrash size={24} />
        </button>
      </TableCell>
    </TableRow>
  );
};

const TableCardAdm = ({
  searchTerm,
  onOpenDelete,
  onOpenEdit,
}: {
  searchTerm: string;
  onOpenDelete: (id: number) => void;
  onOpenEdit: (id: number) => void;
}) => {
  const { currentPage, changePage, setTotalPages } = usePaginationStore();
  const itemsPerPage = 5; // Ajuste o número de itens por página conforme necessário

  // Filtra os dados com base no termo de pesquisa
  const filteredData = useMemo(() => {
    const searchTermLower = searchTerm.toLowerCase().trim();
    return mockData.filter((item) =>
      item.description.toLowerCase().includes(searchTermLower)
    );
  }, [searchTerm]);

  // Atualiza o total de páginas baseado nos dados filtrados
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useMemo(() => {
    setTotalPages(filteredData.length, itemsPerPage);
  }, [filteredData.length, itemsPerPage, setTotalPages]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage, filteredData]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const tableContent = useMemo(() => {
    return paginatedData.map((data) => (
      <TableRowComponent
        key={data.id}
        data={data}
        onOpenEdit={(id) => onOpenEdit(id)}
        onOpenDelete={(id) => onOpenDelete(id)}
      />
    ));
  }, [paginatedData]);

  return (
    <div className="flex flex-col h-[80vh] overflow-y-auto">
      <div className="flex-grow">
        <Table className="min-w-full py-2 text-lg">
          <TableHeader>
            <TableRow className="bg-gray-300 w-auto">
              {headers.map((header) => (
                <TableHead key={header} className="text-black w-auto">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>{tableContent}</TableBody>
        </Table>
      </div>
      <div className="flex justify-end mt-2">
        <Paginations
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
};

export default TableCardAdm;
