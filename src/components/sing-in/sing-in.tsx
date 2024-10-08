import BlurIn from '../magicui/blur-in'
import FlickeringGrid from '../magicui/flickering-grid'
import { SignInForm } from './form-sign-in'

export const SignIn = () => {
  return (
    <div className="flex items-center justify-center bg-white w-full h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <div className="hidden md:flex flex-col bg-background h-screen w-full items-center justify-center">
          <img
            src="https://liderautomacao.s3.amazonaws.com/site/public/logo_icon.png"
            alt="logo"
            className="absolute mr-20"
          />{' '}
          <FlickeringGrid
            className="z-0 absolute inset-0 size-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.5}
            flickerChance={0.1}
            width={900}
          />
        </div>
        <div className="flex flex-col w-full items-center justify-center">
          <div className="h-20 items-center justify-center flex w-full">
            <img
              alt="Logo"
              src="https://liderautomacao.s3.amazonaws.com/site/public/logo_icon.png"
              className="w-[3rem]"
            />
          </div>
          <div className="text-center text-md flex flex-col gap-2">
            <BlurIn word="Seja bem-vindo!" className="text-md"></BlurIn>
            <p className="text-sm">
              Insira suas credenciais para acessar o sistema
            </p>
          </div>
          <SignInForm />
        </div>
      </div>
    </div>
  )
}
