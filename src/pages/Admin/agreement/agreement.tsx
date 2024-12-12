import { FormFilter } from "@/components/form-utils/form-filter/form-filter";
import { FormHeader } from "@/components/form-utils/form-header/form-header";
import { useAgreementStore } from "@/components/modules/admin/agreement/data/hooks/useAgreement";
import { ModalAgreement } from "@/components/modules/admin/agreement/data/models/modal-agreement";
import { TableAgreement } from "@/components/modules/admin/table-agreement";
import { type FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AgreementComponent: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { isOpen, mode } = useAgreementStore();

  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate("/acordo-form");
  };

  // const handleEditClick = (id: number) => {
  //   navigate(`/acordo-form/${id}`);
  // };

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Acordo" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpen={handleAddClick}
        showPrinterButton={true}
      />
      <TableAgreement searchTerm={searchTerm} />
      {isOpen && mode === "add" && <ModalAgreement />}
      <ToastContainer />
    </div>
  );
};
