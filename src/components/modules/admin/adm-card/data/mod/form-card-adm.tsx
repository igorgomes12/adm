import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useCardAdm } from "../hooks/zustand/useCardAdm";
import {
  AdministrationCardSchema,
  type AdministrationCardSchemaDto,
} from "../dtos";
import { zodResolver } from "@hookform/resolvers/zod";

type TCardAdm = {
  id: number | null;
};

export const FormCardAdm: FC<TCardAdm> = ({ id }) => {
  const { mode, onClose } = useCardAdm();
  const isEditMode = mode === "edit";

  const form = useForm<AdministrationCardSchemaDto>({
    resolver: zodResolver(AdministrationCardSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (values: AdministrationCardSchemaDto) => {
    console.log(values);
    // Handle form submission logic
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-4 sm:w-2/3 lg:w-6/12">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          {isEditMode
            ? "Editar Administradora de cartão"
            : "Cadastro de Administradora de cartão"}
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
                  name="moviment"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Movimento</FormLabel>
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
                      <FormMessage>{errors.moviment?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="forgod"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Bom para</FormLabel>
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
                      <FormMessage>{errors.forgod?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-2">
                <FormField
                  control={control}
                  name="admin"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Administradora</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full" />
                      </FormControl>
                      <FormMessage>{errors.admin?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="value"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Valor</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full" />
                      </FormControl>
                      <FormMessage>{errors.value?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-2">
                <FormField
                  control={control}
                  name="qtd_parcelas"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Quantidade de Parcelas</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full" />
                      </FormControl>
                      <FormMessage>{errors.qtd_parcelas?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="document"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Documento</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full" />
                      </FormControl>
                      <FormMessage>{errors.document?.message}</FormMessage>
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
