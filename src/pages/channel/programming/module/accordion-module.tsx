import { useModuleZustand } from "@/components/modules/programming/module/entity/zustand/useModule"
import { ModalModuleDelete } from "@/components/modules/programming/module/mod/delete-modules"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { FC } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"

interface IAccordionItem {
  id: number
  name: string
}

interface IAccordionItemsProps {
  value: string
  trigger: string
  content: string | IAccordionItem[]
}

const accordionItems: IAccordionItemsProps[] = [
  {
    value: "item-1",
    trigger: "FRENTE",
    content: [
      { id: 1, name: "Módulo A" },
      { id: 2, name: "Módulo B" },
    ],
  },
  {
    value: "item-2",
    trigger: "RETAGUARDA-PLUS",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    value: "item-3",
    trigger: "LIDER PDV",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    value: "item-4",
    trigger: "WEBLIDER",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    value: "item-5",
    trigger: "LIDER ODONTO",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    value: "item-6",
    trigger: "OUTROS",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
]

export const AccordionModuleComponents: FC = (): JSX.Element => {
  const { onOpen, mode, isOpen } = useModuleZustand()

  return (
    <div className="flex flex-col gap-2 p-6 w-full">
      <Accordion type="single" collapsible>
        {accordionItems.map(item => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger className="text-md font-bold">
              {item.trigger}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {Array.isArray(item.content) ? (
                item.content.map(module => (
                  <div
                    key={module.id}
                    className="flex items-start justify-between w-full gap-2 border-b py-2"
                  >
                    <div>
                      <h3 className="font-mono text-sm">{module.name}</h3>
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
                ))
              ) : (
                <p>{item.content}</p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {isOpen && mode === "delete" && <ModalModuleDelete />}
    </div>
  )
}
