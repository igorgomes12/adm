import { HeaderForms } from "@/components/modules/representative-component/header-forms/header-forms";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import {
  ResponsableSchema,
  type TSchemaResponsableSchema,
} from "../dtos/regiter.zod";

interface IDadosGeraisDoAcordo {
  onNext: (data: TSchemaResponsableSchema) => void;
  initialValues: TSchemaResponsableSchema;
}

export const ModalResponsavelAcordo: FC<IDadosGeraisDoAcordo> = ({
  initialValues,
  onNext,
}): JSX.Element => {
  const form = useForm<TSchemaResponsableSchema>({
    resolver: zodResolver(ResponsableSchema),
    defaultValues: initialValues,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const onSubmit = (data: TSchemaResponsableSchema) => {
    console.log(data);
    onNext(data);
  };

  return (
    <section className="w-full items-start justify-center p-4 flex flex-col">
      <HeaderForms title="Responsável pelo Acordo" />
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-4 p-4 w-full border-2 shadow-lg rounded-md flex flex-col"
        >
          <div className="flex lg:flex-row flex-col w-full space-x-1">
            <div className="flex w-full gap-2">
              <FormField
                control={control}
                name="client"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="client">Cliente</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="client">
                          <SelectValue placeholder="Selecione um client" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1">Canal 1</SelectItem>
                            <SelectItem value="2">Canal 2</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>{errors.client?.message}</FormMessage>
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
