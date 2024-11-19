import type { FC } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { FaEdit, FaTrash } from "react-icons/fa"
import { useModuleZustand } from "@/components/modules/programming/module/entity/zustand/useModule"
import { ModalModuleDelete } from "@/components/modules/programming/module/mod/delete-modules"
import { api } from "@/infra/auth/database/acess-api/api"
import type { GroupedModules, Module } from "."

const groupModulesBySystem = (modules: Module[]): GroupedModules => {
  return modules.reduce<GroupedModules>((acc, module) => {
    if (!acc[module.system]) {
      acc[module.system] = []
    }
    acc[module.system].push(module)
    return acc
  }, {})
}

export const AccordionModuleComponents: FC = (): JSX.Element => {
  const { onOpen, mode, isOpen } = useModuleZustand()

  const { data, error, isLoading } = useQuery({
    queryKey: ["get-modules"],
    queryFn: async () => {
      const response = await api.get<Module[]>("/modules")
      return response.data
    },
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error loading modules</p>
  }

  const groupedModules = data ? groupModulesBySystem(data) : {}

  return (
    <div className="flex flex-col gap-2 p-6 overflow-hidden w-full">
      <Accordion type="single" collapsible>
        {Object.entries(groupedModules).map(([system, modules]) => (
          <AccordionItem key={system} value={system}>
            <AccordionTrigger className="text-lg font-bold">
              {system}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {modules.map(module => (
                <div
                  key={module.id}
                  className={`flex items-start justify-between w-full gap-2 py-2 ${
                    groupedModules[system].lastIndexOf(module) ===
                    groupedModules[system].length - 1
                      ? "border-b-0"
                      : "border-b"
                  }`}
                >
                  <div className="flex items-center hover:bg-lime-100 w-full rounded-lg cursor-pointer p-2 gap-2">
                    <div className="text-xs rounded-full border-lime-500  font-mono border-2 w-8 h-8 flex justify-center items-center">
                      <span>{module.id}</span>
                    </div>
                    {" - "}
                    <h3 className="font-mono text-sm uppercase">
                      {module.module}
                    </h3>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-blue-200 hover:text-blue-500"
                      onClick={() => onOpen("edit", module.id)}
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      type="button"
                      className="text-red-200 hover:text-red-500"
                      onClick={() => onOpen("delete", module.id)}
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {isOpen && mode === "delete" && <ModalModuleDelete />}
    </div>
  )
}
