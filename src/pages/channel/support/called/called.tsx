import { FormFilter } from "@/components/form-utils/form-filter/form-filter";
import { FormHeader } from "@/components/form-utils/form-header/form-header";
import { useCalledStore } from "@/components/modules/support/called/data/entity/hook/use-called";
import { TableCalled } from "@/components/modules/support/called/table-called";
import { type FC, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CalledComponent: FC = () => {
  const { onOpen } = useCalledStore();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Chamados" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpen={() => onOpen("create")}
      />
      <TableCalled onOpenFormClient={() => {}} searchTerm={searchTerm} />
      {/* {isOpen && <AddEstablishmentModal />} */}
      <ToastContainer />
    </div>
  );
};
