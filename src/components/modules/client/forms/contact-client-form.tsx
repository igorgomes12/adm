import { applyMask } from "@/common/regex/phones";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { FaPlus, FaRegStar, FaStar, FaTrash } from "react-icons/fa";
import { HeaderClientForms } from "../header-client";
import {
  type TContactDto,
  contactSchemaDto,
} from "../zod-form/contact-client-zod";
import { useFormStore } from "../zustand/form-client.zustand";

export const ContactClientForm: FC<{
  onNext: (data: TContactDto) => void;
  initialValues: TContactDto;
}> = ({ onNext, initialValues }) => {
  const { updateFormData } = useFormStore();

  const form = useForm<TContactDto>({
    resolver: zodResolver(contactSchemaDto),
    defaultValues: {
      description: initialValues?.description || "",
      contact: initialValues?.contact || "",
      telefones: initialValues?.telefones || [
        { number: "", type: "TELEFONE", favorite: true },
      ],
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "telefones",
  });

  const handleAddPhone = () => {
    append({ number: "", type: "TELEFONE", favorite: false });
  };

  const getMask = (type: string) => {
    switch (type) {
      case "WHATSAPP":
      case "CELULAR":
        return "(99) 99999-9999";
      case "TELEFONE":
        return "(99) 9999-9999";
      default:
        return "";
    }
  };

  const onSubmit = (data: TContactDto) => {
    const { description, contact, telefones } = data;
    const firstTelefone = telefones[0];

    updateFormData({
      contacts: [
        {
          description,
          contact,
          type: firstTelefone.type,
          favorite: firstTelefone.favorite,
          telefones,
        },
      ],
    });

    onNext(data);
  };

  return (
    <section className="w-full items-start justify-center p-4 flex flex-col">
      <HeaderClientForms title="Formulários de Contatos" />
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-4 p-4 w-full border-2 shadow-lg rounded-md flex flex-col"
        >
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>{errors.description?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="contact"
              render={({ field, fieldState }) => (
                <FormItem className="w-full">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="exemplo@dominio.com" />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="flex lg:flex-row flex-col w-full gap-2 items-center justify-between"
            >
              <FormField
                name={`telefones.${index}.type` as const}
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel>Tipo de Contato</FormLabel>
                    <FormControl>
                      <Controller
                        control={control}
                        name={`telefones.${index}.type` as const}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="TELEFONE">
                                Telefone fixo
                              </SelectItem>
                              <SelectItem value="WHATSAPP">WhatsApp</SelectItem>
                              <SelectItem value="CELULAR">Celular</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={`telefones.${index}.number` as const}
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel>Contatos</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => {
                            const mask = getMask(
                              form.getValues(`telefones.${index}.type`)
                            );
                            field.onChange(applyMask(e.target.value, mask));
                          }}
                          className="pr-10"
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                          {form.getValues(`telefones.${index}.favorite`) ? (
                            <FaStar
                              className="text-yellow-500"
                              onClick={() => {
                                fields.forEach((_, i) => {
                                  form.setValue(
                                    `telefones.${i}.favorite`,
                                    i === index
                                  );
                                });
                              }}
                            />
                          ) : (
                            <FaRegStar
                              className="text-gray-500"
                              onClick={() => {
                                fields.forEach((_, i) => {
                                  form.setValue(
                                    `telefones.${i}.favorite`,
                                    i === index
                                  );
                                });
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {index > 0 && (
                <FaTrash
                  onClick={() => remove(index)}
                  className="w-8 h-8 cursor-pointer text-red-500"
                />
              )}
            </div>
          ))}
          <Button
            type="button"
            onClick={handleAddPhone}
            variant="secondary"
            className="flex items-center"
          >
            <FaPlus className="mr-2" /> Adicionar contatos
          </Button>
          <div className="flex w-full items-center justify-center space-x-4">
            <Button className="w-full" type="submit" variant="success">
              Próximo
            </Button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};
