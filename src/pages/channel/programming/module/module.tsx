import { FormFilter } from "@/components/form-utils/form-filter/form-filter"
import { FormHeader } from "@/components/form-utils/form-header/form-header"
import { useState } from "react"
import { ToastContainer } from "react-toastify"
import { AccordionModuleComponents } from "./accordion-module"
import { ModuleAddComponent } from "@/components/modules/programming/module/mod/modules-add"
import { useModuleZustand } from "@/components/modules/programming/module/entity/zustand/useModule"

export const ModuleComponent = () => {
  const { isOpen, onOpen, mode } = useModuleZustand()
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Módulo" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpen={() => onOpen("create")}
      />
      <AccordionModuleComponents />
      {isOpen && (mode === "create" || mode === "edit") && (
        <ModuleAddComponent />
      )}
      <ToastContainer />
    </div>
  )
}
