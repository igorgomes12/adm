import usePaginationStore from "@/components/pagination/hook/use-pagination";
import { SkeletonCard } from "@/components/skeleton-component/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/infra/auth/database/acess-api/api";
import { useQuery } from "@tanstack/react-query";
import { type FC, useMemo } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Paginations from "../client/pagination";

interface DescriptionCalledProps {
  searchTerm: string;
  onOpenEdit: (id: number) => void;
  onOpenDelete: (id: number) => void;
}

const headers = ["Cód.", "Descrição", ""];

type TDescriptionCall = {
  id: number;
  description: string;
};

const DescriptionRow: FC<{
  descriptionCall: TDescriptionCall;
  onOpenEdit: (id: number) => void;
  onOpenDelete: (id: number) => void;
}> = ({ descriptionCall, onOpenEdit, onOpenDelete }) => {
  return (
    <TableRow>
      <TableCell className="text-sm items-center">
        {descriptionCall.id}
      </TableCell>
      <TableCell className="text-sm items-center">
        {descriptionCall.description}
      </TableCell>
      <TableCell className="flex items-center justify-center w-full h-full space-x-2">
        <button
          type="button"
          onClick={() => onOpenEdit(descriptionCall.id)}
          className="text-blue-200 hover:text-blue-500"
        >
          <FaEdit size={24} />
        </button>
        <button
          type="button"
          onClick={() => onOpenDelete(descriptionCall.id)}
          className="text-red-200 hover:text-red-500"
        >
          <FaTrash size={24} />
        </button>
      </TableCell>
    </TableRow>
  );
};

const TableDescriptionCalled: FC<DescriptionCalledProps> = ({
  searchTerm,
  onOpenEdit,
  onOpenDelete,
}) => {
  const { currentPage, changePage, setTotalPages } = usePaginationStore();
  const itemsPerPage = 8;

  const { data, isLoading, error } = useQuery<TDescriptionCall[], Error>({
    queryKey: ["get-description-calls"],
    queryFn: async () => {
      const response = await api.get("/descriptionCalled");
      return response.data;
    },
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    const searchTermLower = searchTerm.toLowerCase().trim();
    return data.filter((descriptionCall) =>
      descriptionCall.description.toLowerCase().includes(searchTermLower)
    );
  }, [data, searchTerm]);

  useMemo(() => {
    setTotalPages(filteredData.length, itemsPerPage);
  }, [filteredData.length, setTotalPages]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const tableContent = useMemo(() => {
    if (isLoading || !filteredData || filteredData.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={3}>
            <SkeletonCard />
          </TableCell>
        </TableRow>
      );
    }
    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={3}>
            <div className="items-center justify-center flex w-full ">
              Erro ao carregar os dados: {error.message}
            </div>
          </TableCell>
        </TableRow>
      );
    }
    return paginatedData.map((descriptionCall) => (
      <DescriptionRow
        key={descriptionCall.id}
        descriptionCall={descriptionCall}
        onOpenEdit={onOpenEdit}
        onOpenDelete={onOpenDelete}
      />
    ));
  }, [isLoading, error, filteredData, paginatedData, onOpenEdit, onOpenDelete]);

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

export default TableDescriptionCalled;
