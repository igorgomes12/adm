import { FormFilter } from "@/components/form-utils/form-filter/form-filter";
import { FormHeader } from "@/components/form-utils/form-header/form-header";
import { ModalDescriptionCalledDelete } from "@/components/modules/description-called/data/mod/form-delete-description-called";
import { FormDescriptionCalled } from "@/components/modules/description-called/data/mod/form-description-called";
import { useDescriptionCalledStore } from "@/components/modules/description-called/data/services/hook/useDescriptionCalled";
import TableDescriptionCalled from "@/components/modules/description-called/table-description-called";
import { type FC, useState } from "react";
import { ToastContainer } from "react-toastify";

export const DescriptionCalled: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { onOpen, isOpen, mode, id } = useDescriptionCalledStore();

  const handleOpenAdd = () => onOpen("add", 0);
  const handleOpenEdit = (id: number) => onOpen("edit", id);
  const handleOpenDelete = (id: number) => onOpen("delete", id);

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Descrição de Chamados" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showPrinterButton={true}
        onOpenPDF={() => {}}
        onOpen={handleOpenAdd}
      />
      <TableDescriptionCalled
        onOpenDelete={handleOpenDelete}
        onOpenEdit={handleOpenEdit}
        searchTerm={searchTerm}
      />
      {isOpen && (mode === "add" || mode === "edit") && (
        <FormDescriptionCalled id={id} />
      )}
      {isOpen && mode === "delete" && <ModalDescriptionCalledDelete />}
      <ToastContainer />
    </div>
  );
};
