import { FormProvider, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const signInSchema = z.object({
  username: z.string().min(4, { message: "Necessário digitar a login completo" }),
  password: z.string().min(4, { message: "Necessário digitar a senha completa" }).max(20),
});

type SignInForm = z.infer<typeof signInSchema>;

export const SignInForm = ({ onSwitch }: { onSwitch: () => void }) => {
  const form = useForm<SignInForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = (data: SignInForm) => {
    console.log("valores", data);
    navigate("/tela-principal"); // Navigate to the TelaPrincipal page
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col p-2 gap-2 items-center justify-center"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-80">
              <FormControl>
                <Input
                  className="cursor-pointer p-2"
                  placeholder="login"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-80">
              <FormControl>
                <div className="relative flex items-center">
                  <Input
                    className="cursor-pointer p-2 pr-10"
                    placeholder="senha"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  <div
                    className="absolute right-0 pr-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex py-2 items-start justify-center">
          <Button className="w-full" type="submit">
            Entrar
          </Button>
        </div>
      </form>
      <div className="w-full text-center">
        <a
          href="#"
          className="text-gray-500 hover:text-gray-800 text-sm"
          onClick={onSwitch}
        >
          Esqueceu a senha?
        </a>
      </div>
    </FormProvider>
  );
};
