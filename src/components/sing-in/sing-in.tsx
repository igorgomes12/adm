import BlurIn from '../magicui/blur-in'
import Ripple from '../ui/ripple'
import { SignInForm } from './form-sign-in'

export const SignIn = () => {
  return (
    <div className="flex items-center justify-center bg-white w-full h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <div className="hidden md:flex bg-black  flex-col h-screen w-full items-center justify-center relative">
          <Ripple
            className="text-white"
            mainCircleOpacity={2.24}
            mainCircleSize={210}
            numCircles={5}
          />
          <img
            src="https://liderautomacao.s3.amazonaws.com/site/public/logo_icon.png"
            alt="logo"
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              top: '50%',
              left: '50%',
            }}
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
