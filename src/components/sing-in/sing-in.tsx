import { useEffect, useState } from "react"
import BlurIn from "../magicui/blur-in"
import FlickeringGrid from "../magicui/flickering-grid"
import { SignInForm } from "./form-sign-in"

export const SignIn = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="flex items-center justify-center bg-white w-full h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <div className="hidden md:flex bg-black flex-col h-screen w-full items-center justify-center relative">
          <FlickeringGrid
            className="z-0 absolute inset-0 w-full h-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.5}
            flickerChance={0.4}
            key={`${windowSize.width}-${windowSize.height}`}
          />

          <img
            src="https://liderautomacao.s3.amazonaws.com/site/public/logo.png"
            alt="logo"
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              top: "50%",
              left: "50%",
              maxWidth: "60%",
              height: "auto",
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
            <BlurIn word="Seja bem-vindo!" className="text-md" />

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
