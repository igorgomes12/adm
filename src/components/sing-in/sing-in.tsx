import { FormSignIn } from ".";

export const SignIn = () => {
    return (
      <div className="flex items-center justify-center bg-white w-full h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          <div className="hidden md:flex flex-col bg-zinc-500 h-screen w-full items-center justify-center">
            <img
              src="https://liderautomacao.s3.amazonaws.com/site/public/logo.png"
              alt="logo"
              className="w-[12rem]"
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
            <div className="text-center flex flex-col gap-2">
            <h1 className="text-3xl">Seja bem-vindo!</h1>
            <p className="text-sm">Insira suas credenciais para acessar o sistema</p>
            </div>
            <FormSignIn />
          </div>
        </div>
      </div>
    );
  };
