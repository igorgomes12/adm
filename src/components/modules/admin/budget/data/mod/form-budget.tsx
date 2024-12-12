import type { FC } from "react";
import { useBudgetStore } from "../hooks/zustand/useBudgetStore";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BudgetSchema, BudgetType, type BudgetSchemaDto } from "../dtos";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type TBudget = {
  id: number | null;
};

export const FormBudget: FC<TBudget> = ({ id }) => {
  const { mode, onClose } = useBudgetStore();
  const isEditMode = mode === "edit";

  const form = useForm<BudgetSchemaDto>({
    resolver: zodResolver(BudgetSchema),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = (data: BudgetSchemaDto) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-4 sm:w-2/3 lg:w-6/12">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          {isEditMode ? "Editar Orçamento" : "Cadastro de Orçamento"}
        </h1>
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="gap-4 flex w-full flex-col"
          >
            <div className="flex flex-col w-full space-y-4 ">
              <div className="flex flex-col sm:flex-row justify-center gap-2">
                <FormField
                  control={control}
                  name="id"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>ID</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full" />
                      </FormControl>
                      <FormMessage>{errors.id?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="dataEmissao"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Data Emissão</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={
                            (field.value as Date)?.toISOString().slice(0, -1) ||
                            ""
                          }
                          onChange={(e) =>
                            field.onChange(new Date(e.target.value))
                          }
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage>{errors.dataEmissao?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                          className="w-full flex flex-row space-x-4"
                        >
                          {Object.values(BudgetType).map((status) => (
                            <RadioGroupItem key={status} value={status}>
                              {status}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage>{errors.status?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-2 mt-4">
              <Button
                className="w-full"
                variant="destructive"
                onClick={onClose}
                type="button"
              >
                Fechar
              </Button>
              <Button className="w-full" type="submit" variant="success">
                Salvar
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
