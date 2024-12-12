import { FormFilter } from "@/components/form-utils/form-filter/form-filter";
import { FormHeader } from "@/components/form-utils/form-header/form-header";
import { useCardAdm } from "@/components/modules/admin/adm-card/data/hooks/zustand/useCardAdm";
import { ModalCardAdmDelete } from "@/components/modules/admin/adm-card/data/mod/delete-card-adm";
import { FormCardAdm } from "@/components/modules/admin/adm-card/data/mod/form-card-adm";
import TableCardAdm from "@/components/modules/admin/adm-card/table-card-adm";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export const CardAdmComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, onOpen, mode, id } = useCardAdm();

  const handleOpenAdd = () => onOpen("add", 0);
  const handleOpenEdit = (id: number) => onOpen("edit", id);
  const handleOpenDelete = (id: number) => onOpen("delete", id);

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Administradora de Cartão" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpen={handleOpenAdd}
      />

      <TableCardAdm
        onOpenDelete={handleOpenDelete}
        onOpenEdit={handleOpenEdit}
        searchTerm={searchTerm}
      />

      {isOpen && (mode === "add" || mode === "edit") && <FormCardAdm id={id} />}

      {isOpen && mode === "delete" && <ModalCardAdmDelete />}

      <ToastContainer />
    </div>
  );
};
