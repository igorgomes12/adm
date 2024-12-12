import { FormFilter } from "@/components/form-utils/form-filter/form-filter";
import { FormHeader } from "@/components/form-utils/form-header/form-header";
import { useBudgetStore } from "@/components/modules/admin/budget/data/hooks/zustand/useBudgetStore";
import { ModalBudgetDelete } from "@/components/modules/admin/budget/data/mod/delete-budget";
import { FormBudget } from "@/components/modules/admin/budget/data/mod/form-budget";
import TableBudgetComponent from "@/components/modules/admin/budget/table-budget";
import { type FC, useState } from "react";
import { ToastContainer } from "react-toastify";

export const BugetComponent: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, onOpen, mode, id } = useBudgetStore();

  const handleOpenAdd = () => onOpen("add", 0);
  const handleOpenEdit = (id: number) => onOpen("edit", id);
  const handleOpenDelete = (id: number) => onOpen("delete", id);

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Orçamentos" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showPrinterButton={true}
        onOpenPDF={() => {}}
        onOpen={handleOpenAdd}
      />
      <TableBudgetComponent
        searchTerm={searchTerm}
        onOpenDelete={handleOpenDelete}
        onOpenEdit={handleOpenEdit}
      />

      {isOpen && (mode === "add" || mode === "edit") && <FormBudget id={id} />}

      {isOpen && mode === "delete" && <ModalBudgetDelete />}

      <ToastContainer />
    </div>
  );
};
