import type { SignInFormDto } from "@/features/sign-in/domain/dto/sign-in.dto"

import { useLogin } from "@/features/sign-in/domain/usecases/sign-in.usecase"
import { FormProvider } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Button } from "../ui/button"
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { usePasswordVisibilityStore } from "@/features/sign-in/domain/entity/passwordVisibility.entity"
import { useSignInForm } from "@/features/sign-in/domain/services/signIn-form.services"

export const SignInForm = () => {
  const { showPassword, togglePasswordVisibility } =
    usePasswordVisibilityStore()

  const form = useSignInForm()

  const { loginMutation } = useLogin()
  const onSubmit = (data: SignInFormDto) => {
    loginMutation.mutate(data)
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col p-2 gap-2 items-center justify-center"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-80">
              <FormControl>
                <Input
                  className="cursor-pointer p-2"
                  placeholder="Email"
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
                    placeholder="Senha"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute right-0 pr-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" w-80 flex py-2 items-start justify-center">
          <Button
            className="w-full"
            type="submit"
            disabled={loginMutation.isSuccess}
          >
            {loginMutation.isSuccess ? "Entrando..." : "Entrar"}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
