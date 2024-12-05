import { useQuery } from "@tanstack/react-query";
import { type FC, useMemo } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../infra/auth/database/acess-api/interceptors-axios";
import { SkeletonCard } from "../../skeleton-component/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

import usePaginationStore from "@/components/pagination/hook/use-pagination";
import { ModalPaymentDelete } from "../Forms-payment/models/delete-model";
import { PaymentModal } from "../Forms-payment/models/model-payment";
import { useAgreementStore } from "./agreement/data/hooks/useAgreement";
import Paginations from "../client/pagination";
import type { TSchemaAgreementDtoForm } from "./agreement/data/dtos/agreement.zod";

const headers = ["Cód.", "Cliente", "Descrição", ""];

const AgreementRow: FC<{
  payment: TSchemaAgreementDtoForm;
  onOpenDelete: (id: number) => void;
  onOpenEdit: (id: number) => void;
}> = ({ payment, onOpenDelete, onOpenEdit }) => (
  <TableRow>
    <TableCell className="text-sm items-center">{payment.id}</TableCell>
    <TableCell className="text-sm items-center uppercase">
      {payment.client}
    </TableCell>
    <TableCell className="text-sm items-center uppercase">
      {payment.description}
    </TableCell>

    <TableCell className="flex items-center justify-center w-full h-full space-x-2">
      <button
        type="button"
        onClick={() => onOpenEdit(payment.id || 0)}
        className="text-blue-200 hover:text-blue-500"
      >
        <FaEdit size={24} />
      </button>
      <button
        type="button"
        onClick={() => onOpenDelete(payment.id || 0)}
        className="text-red-200 hover:text-red-500"
      >
        <FaTrash size={24} />
      </button>
    </TableCell>
  </TableRow>
);

const LoadingRow: FC = () => (
  <TableRow>
    <TableCell colSpan={4}>
      <SkeletonCard />
    </TableCell>
  </TableRow>
);

export const TableAgreement: FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const { isOpen, mode, onOpen } = useAgreementStore();

  //paginação
  const { currentPage, changePage } = usePaginationStore();
  const itemsPerPage = 8;

  const { data, isLoading, error } = useQuery<TSchemaAgreementDtoForm[], Error>(
    {
      queryKey: ["get-agreement"],
      queryFn: async () => {
        const response = await api.get("/agreement");
        return response.data;
      },
    }
  );

  const filteredData = useMemo(() => {
    if (!data) return [];

    const searchTermLower = searchTerm.toLowerCase().trim();
    const searchWords = searchTermLower.split(/\s+/);

    const matchAllTerms = (value: string) => {
      return searchWords.every((word) => value.toLowerCase().includes(word));
    };

    return data.filter((payment) => {
      if (payment.id?.toString() === searchTermLower) return true;
      if (matchAllTerms(payment.client)) return true;
      return false;
    });
  }, [data, searchTerm]);

  const tableContent = useMemo(() => {
    if (isLoading || !filteredData || filteredData.length === 0) {
      return <LoadingRow />;
    }
    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={4}>
            <div className="items-center justify-center flex w-full ">
              Erro ao carregar os dados: {error.message}
            </div>
          </TableCell>
        </TableRow>
      );
    }

    return filteredData.map((data) => (
      <AgreementRow
        key={data.id}
        payment={data}
        onOpenDelete={() => onOpen("delete", data.id || 0)}
        onOpenEdit={() => onOpen("edit", data.id || 0)}
      />
    ));
  }, [isLoading, error, filteredData, onOpen]);

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
      <div className="flex -mt-[-27rem] justify-end ">
        <Paginations
          totalItems={filteredData?.length || 0}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={changePage}
        />
      </div>
      {isOpen && mode === "edit" && <PaymentModal />}
      {isOpen && mode === "delete" && <ModalPaymentDelete />}
    </div>
  );
};
