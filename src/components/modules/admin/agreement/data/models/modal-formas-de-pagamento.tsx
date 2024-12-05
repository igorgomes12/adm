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
  RegisterSchema,
  type TSchemaRegisterSchema,
} from "../dtos/regiter.zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface IDadosGeraisDoAcordo {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onNext: (data: any) => void;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  initialValues: any;
}

export const ModalFormasDePagamento: FC<IDadosGeraisDoAcordo> = ({
  initialValues,
  onNext,
}): JSX.Element => {
  const form = useForm<TSchemaRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: initialValues,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const onSubmit = (data: TSchemaRegisterSchema) => {
    console.log(data);
    onNext(data);
  };

  return (
    <section className="w-full items-start justify-center p-4 flex flex-col">
      <HeaderForms title="Formas de pagamento" />
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-4 p-4 w-full border-2 shadow-lg rounded-md flex flex-col"
        >
          <div className="flex lg:flex-row flex-col w-full space-x-1">
            <div className="flex w-full gap-2">
              <FormField
                control={control}
                name="paymment"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="paymment">Pagamento</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="supervisor">
                          <SelectValue placeholder="Selecione um supervisor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1">Canal 1</SelectItem>
                            <SelectItem value="2">Canal 2</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>{errors.paymment?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full gap-2">
              <FormField
                control={control}
                name="formpayment"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="formpayment">
                      Forma de pagamento
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="supervisor">
                          <SelectValue placeholder="Selecione um supervisor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1">Canal 1</SelectItem>
                            <SelectItem value="2">Canal 2</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>{errors.formpayment?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col w-full space-x-1">
            <div className="flex w-full gap-2">
              <FormField
                control={control}
                name="observation"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="observation">Observação</FormLabel>
                    <FormControl>
                      <Textarea {...field} id="observation" />
                    </FormControl>
                    <FormMessage>{errors.observation?.message}</FormMessage>
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
