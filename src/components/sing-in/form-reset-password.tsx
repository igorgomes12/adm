import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Button } from "../ui/button";
import { FormField, FormItem, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";

const resetPasswordSchema = z.object({
  newPassword: z.string().min(4, { message: "Necessário digitar a nova senha completa" }),
  confirmPassword: z.string().min(4, { message: "Necessário confirmar a nova senha" }),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
});
type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;


export const ResetPasswordForm = ({ onSwitch }: { onSwitch: () => void }) => {
  const form = useForm<ResetPasswordForm>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const onSubmit = (data: ResetPasswordForm) => {
    console.log("nova senha", data);
    // Lógica para redefinir a senha
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col p-2 gap-2 items-center justify-center"
      >
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="w-80">
              <FormControl>
                <div className="relative flex items-center">
                  <Input
                    className="cursor-pointer p-2 pr-10"
                    placeholder="Nova senha"
                    type={showNewPassword ? "text" : "password"}
                    {...field}
                  />
                  <div
                    className="absolute right-0 pr-3 flex items-center cursor-pointer"
                    onClick={toggleNewPasswordVisibility}
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-80">
              <FormControl>
                <div className="relative flex items-center">
                  <Input
                    className="cursor-pointer p-2 pr-10"
                    placeholder="Confirmar senha"
                    type={showConfirmPassword ? "text" : "password"}
                    {...field}
                  />
                  <div
                    className="absolute right-0 pr-3 flex items-center cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex py-2 items-start justify-center">
          <Button className="w-full" type="submit">
            Redefinir Senha
          </Button>
        </div>
        <div className="w-full text-center">
          <a
            href="#"
            className="text-gray-500 hover:text-gray-800 text-sm"
            onClick={onSwitch}
          >
            Voltar ao Login
          </a>
        </div>
      </form>
    </FormProvider>
  );
};
