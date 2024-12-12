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

const headers = ["Cód.", "Cliente", "Data", "Valor Total", ""];

type TBudgetData = {
  id: number;
  client: string;
  date: string;
  totalValue: string;
};

const mockBudgetData: TBudgetData[] = [
  {
    id: 1,
    client: "Cliente A",
    date: "2024-12-10",
    totalValue: "1000.00",
  },
  {
    id: 2,
    client: "Cliente B",
    date: "2024-12-15",
    totalValue: "1500.00",
  },
  // Adicione mais dados conforme necessário
];

const TableRowComponent: FC<{
  data: TBudgetData;
  onOpenEdit: (id: number) => void;
  onOpenDelete: (id: number) => void;
}> = ({ data, onOpenEdit, onOpenDelete }) => {
  return (
    <TableRow>
      <TableCell className="text-sm items-center">{data.id}</TableCell>
      <TableCell className="text-sm items-center">{data.client}</TableCell>
      <TableCell className="text-sm items-center">{data.date}</TableCell>
      <TableCell className="text-sm items-center">{data.totalValue}</TableCell>
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

const TableBudgetComponent = ({
  searchTerm,
  onOpenDelete,
  onOpenEdit,
}: {
  searchTerm: string;
  onOpenDelete: (id: number) => void;
  onOpenEdit: (id: number) => void;
}) => {
  const { currentPage, changePage, setTotalPages } = usePaginationStore();
  const itemsPerPage = 5;

  // Filtra os dados com base no termo de pesquisa
  const filteredData = useMemo(() => {
    const searchTermLower = searchTerm.toLowerCase().trim();
    return mockBudgetData.filter((item) =>
      item.client.toLowerCase().includes(searchTermLower)
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

export default TableBudgetComponent;
