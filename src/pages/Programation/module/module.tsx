import { FormFilter } from "@/components/form-utils/form-filter/form-filter";
import { FormHeader } from "@/components/form-utils/form-header/form-header";
import { ToastContainer } from "react-toastify";
import { AccordionModuleComponents } from "../accordion-module";
import { ModuleAddComponent } from "@/components/modules/programming/module/mod/modules-add";
import { useModuleZustand } from "@/components/modules/programming/module/entity/zustand/useModule";

export const ModuleComponent = () => {
  const { isOpen, onOpen, mode } = useModuleZustand();

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <div className="flex w-full gap-2 items-start justify-between">
        <FormHeader title="Módulos" />
        <div className="flex gap-2 items-end justify-between">
          <FormFilter showFilter={false} onOpen={() => onOpen("create")} />
        </div>
      </div>
      <AccordionModuleComponents />
      {isOpen && (mode === "create" || mode === "edit") && (
        <ModuleAddComponent />
      )}
      <ToastContainer />
    </div>
  );
};
