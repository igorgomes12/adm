import { HeaderForms } from "@/components/modules/representative-component/header-forms/header-forms";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { FaPlus, FaRegStar, FaStar, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  ContactSchema,
  type TContact,
} from "../../client/zod-form/zod_contact.schema";
import { useFormStore } from "../zustand/gerenciador-zustand";

const applyMask = (value: string, mask: string): string => {
  let formattedValue = "";
  let maskIndex = 0;
  for (let i = 0; i < value.length && maskIndex < mask.length; i++) {
    if (/\d/.test(value[i])) {
      while (maskIndex < mask.length && mask[maskIndex] !== "9") {
        formattedValue += mask[maskIndex++];
      }
      formattedValue += value[i];
      maskIndex++;
    }
  }
  return formattedValue;
};

export const ContactForm: FC<{
  onNext?: (data: TContact) => void;
  initialValues?: TContact;
}> = ({ onNext, initialValues }) => {
  const { updateFormData } = useFormStore();
  const form = useForm<TContact>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: initialValues?.name || "",
      contact: initialValues?.contact || "",
      telefones: initialValues?.telefones || [],
      description: initialValues?.description || "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
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

  const submitForm = async (data: TContact) => {
    try {
      const cellphone =
        data.telefones.find((t) => t.type === "CELULAR")?.number || "";
      const phone =
        data.telefones.find((t) => t.type === "TELEFONE")?.number || "";

      updateFormData({
        contact: {
          email: data.contact || "",
          cellphone,
          phone,
        },
      });
      onNext?.(data);
    } catch (error) {
      if (error instanceof Error) return toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col p-4 w-full h-screen">
      <div className="flex w-full items-start justify-start">
        <HeaderForms title="Formulários de Contatos" />
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex border bg-white rounded-xl shadow-lg p-4 flex-col space-y-4 w-full"
        >
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome do contato</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>{errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
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
                control={control}
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
                control={control}
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
                          className="pr-10" // Espaço para o ícone
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                          {form.getValues(`telefones.${index}.favorite`) ? (
                            <FaStar
                              className="text-yellow-500"
                              onClick={() => {
                                form.setValue(
                                  `telefones.${index}.favorite`,
                                  false
                                );
                              }}
                            />
                          ) : (
                            <FaRegStar
                              className="text-gray-500"
                              onClick={() => {
                                fields.forEach((_, i) => {
                                  form.setValue(
                                    `telefones.${i}.favorite`,
                                    false
                                  );
                                });

                                form.setValue(
                                  `telefones.${index}.favorite`,
                                  true
                                );
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
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full items-center justify-center">
            <Button className="w-full" type="submit" variant="success">
              Próximo
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
