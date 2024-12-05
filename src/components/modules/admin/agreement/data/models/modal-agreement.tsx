import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  TSchemaAgreementDto,
  type TSchemaAgreementDtoForm,
} from "../dtos/agreement.zod";
import { useAgreementStore } from "../hooks/useAgreement";

export const ModalAgreement: FC = (): JSX.Element => {
  const { onClose } = useAgreementStore();

  const form = useForm<TSchemaAgreementDtoForm>({
    defaultValues: {},
    resolver: zodResolver(TSchemaAgreementDto),
  });

  const { register } = form;

  const onSubmitFunction = (data: TSchemaAgreementDtoForm): void => {
    console.log(data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-4 sm:w-2/3 lg:w-1/3">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Cadastro
        </h1>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitFunction)}
            className="gap-4 flex flex-col"
          >
            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Formas de pagamento</FormLabel>
                  <FormControl>
                    <Input
                      {...register("client")}
                      placeholder="Nome das formas de pagamento"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
