import { headers } from "@/common/utils/headers-of-tables/headers";
import { LoadingRow } from "@/common/utils/headers-of-tables/loading-tables/loading";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type FC, useMemo } from "react";
import { ModalRepresentativeDelete } from "../../representative-component/mod/modal-representative-delete";
import { useRepresentativeDeleteZustand } from "../../representative-component/zustand/delete-representative";
import { CalledRow, item } from "./body-table";

// Componente da tabela principal
export const TableCalled: FC<{
  searchTerm: string;
  onOpenFormClient: (id: number) => void;
}> = ({ searchTerm, onOpenFormClient }) => {
  const { isOpen, onOpen } = useRepresentativeDeleteZustand();

  // Dados mockados (em vez de buscar da API)
  const data = [item];

  // Aplicando o filtro de busca aos dados mockados
  const filteredData = useMemo(() => {
    if (!data) return [];

    const searchTermLower = searchTerm.toLowerCase().trim();
    const searchWords = searchTermLower.split(/\s+/);

    const matchAllTerms = (value: string) => {
      return searchWords.every((word) => value.toLowerCase().includes(word));
    };

    return data.filter((establishment) => {
      if (establishment.id.toString() === searchTermLower) return true;
      if (matchAllTerms(establishment.name)) return true;
      if (matchAllTerms(establishment.status ? "Ativo" : "Inativo"))
        return true;
      return false;
    });
  }, [data, searchTerm]);

  // Renderização do conteúdo da tabela
  const tableContent = useMemo(() => {
    if (!filteredData || filteredData.length === 0) {
      return <LoadingRow />;
    }

    return filteredData.map((data) => (
      <CalledRow
        key={data.id}
        item={data}
        onOpenDelete={onOpen}
        onStatusChange={() => {}}
        onOpenFormClient={onOpenFormClient}
      />
    ));
  }, [filteredData, onOpen, onOpenFormClient]);

  return (
    <div className="flex flex-col mt-4">
      <Table className="min-w-full py-2 cursor-pointer text-lg">
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
      {isOpen && <ModalRepresentativeDelete />}
    </div>
  );
};
