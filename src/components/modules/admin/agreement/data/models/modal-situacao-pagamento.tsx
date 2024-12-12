import { HeaderForms } from "@/components/modules/representative-component/header-forms/header-forms";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import {
  situationSchema,
  type TSchemaSituationSchema,
} from "../dtos/regiter.zod";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { translateType } from "@/components/modules/representative-component/table-representative";

interface IDadosGeraisDoAcordo {
  onNext: (data: TSchemaSituationSchema) => void;
  initialValues: TSchemaSituationSchema;
}

interface IOption {
  value: string;
  label: string;
}

const radioOptions: IOption[] = [
  { value: "option1", label: "Acordado" },
  { value: "option2", label: "Não Acordado" },
  { value: "option3", label: "Finalizado" },
];
const situationPaymmentOptions: IOption[] = [
  { value: "option1", label: "Receber no Cliente" },
  { value: "option2", label: "Receber aqui" },
  { value: "option3", label: "Depósito Bancário" },
  { value: "option4", label: "2° via de Boleto" },
];

export const ModalSituacaoPagamento: FC<IDadosGeraisDoAcordo> = ({
  initialValues,
  onNext,
}) => {
  const form = useForm<TSchemaSituationSchema>({
    resolver: zodResolver(situationSchema),
    defaultValues: initialValues,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: TSchemaSituationSchema) => {
    console.log(data);
    onNext(data);
  };

  return (
    <section className="w-full items-start justify-center p-4 flex flex-col">
      <HeaderForms title="Situação dos pagamentos" />
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-4 p-4 w-full border-2 shadow-lg rounded-md flex flex-col"
        >
          <div className="flex lg:flex-row flex-col w-full space-x-1">
            <div className="flex w-full gap-2">
              <FormField
                control={control}
                name="situation"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Situação</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="border-2 p-2 h-[7.75rem] rounded-md"
                      >
                        {radioOptions.map(({ value, label }) => (
                          <div key={value} className="flex gap-2 items-start">
                            <RadioGroupItem
                              value={value}
                              id={`situaton-${value}`}
                            />
                            <label
                              htmlFor={`type-${label}`}
                              className="cursor-pointer text-sm"
                            >
                              {translateType(label)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage>{errors.situation?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full gap-2">
              <FormField
                control={control}
                name="situatonpayment"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Situação de Pagamento</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="border-2 p-2 rounded-md"
                      >
                        {situationPaymmentOptions.map(({ value, label }) => (
                          <div key={value} className="flex gap-2 items-start">
                            <RadioGroupItem
                              value={value}
                              id={`situaton-${value}`}
                            />
                            <label
                              htmlFor={`type-${label}`}
                              className="cursor-pointer text-sm"
                            >
                              {translateType(label)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage>{errors.situatonpayment?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-2 mt-4">
            <Button className="w-full" type="submit" variant="success">
              Próximo
            </Button>
          </div>
        </form>
      </FormProvider>
      <ToastContainer />
    </section>
  );
};
