import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DadosRegisterSchema,
  type TSchemaDadosRegisterSchema,
} from "../dtos/regiter.zod";
import { format } from "date-fns";
import type { FC } from "react";
import { ToastContainer } from "react-toastify";
import { formatCurrency } from "@/common/regex/money";

interface IDadosGeraisDoAcordo {
  onNext: (data: TSchemaDadosRegisterSchema) => void;
  initialValues: TSchemaDadosRegisterSchema;
}

export const ModalDadosGeraisDoAcordo: FC<IDadosGeraisDoAcordo> = ({
  initialValues,
  onNext,
}) => {
  const form = useForm<TSchemaDadosRegisterSchema>({
    resolver: zodResolver(DadosRegisterSchema),
    defaultValues: initialValues,
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const onSubmit = (data: TSchemaDadosRegisterSchema) => {
    console.log(data);
    onNext(data);
  };

  return (
    <section className="w-full items-start justify-center p-4 flex flex-col">
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-4 p-4 w-full border-2 shadow-lg rounded-md flex flex-col"
        >
          <div className="flex lg:flex-row flex-col w-full space-x-1">
            <div className="flex w-full gap-2">
              <FormField
                control={control}
                name="id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="id">Código</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        placeholder="Código"
                      />
                    </FormControl>
                    <FormMessage>{errors.id?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full gap-2">
              <FormField
                control={control}
                name="time"
                render={({ field }) => {
                  const formattedValue = field.value
                    ? format(new Date(field.value), "yyyy-MM-dd'T'HH:mm")
                    : "";

                  return (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="time">Hora</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                          id="time"
                          value={formattedValue}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage>{errors.time?.message}</FormMessage>
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="flex w-full gap-2">
              <FormField
                control={control}
                name="channel"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="channel">Canal</FormLabel>
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
                    <FormMessage>{errors.channel?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col w-full space-x-1">
            <div className="flex w-full gap-2">
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="description">Descrição</FormLabel>
                    <FormControl>
                      <Input {...field} id="description" />
                    </FormControl>
                    <FormMessage>{errors.description?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full gap-2">
              <FormField
                control={control}
                name="value"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="value">Valor</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="value"
                        value={field.value || ""}
                        onChange={(e) => {
                          const formattedValue = formatCurrency(e.target.value);
                          setValue("value", formattedValue, {
                            shouldValidate: true,
                          });
                        }}
                        placeholder="R$ 0,00"
                      />
                    </FormControl>
                    <FormMessage>{errors.value?.message}</FormMessage>
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
