import Ripple from '@/components/ui/ripple'

export const TelaPrincipal = () => {
  return (
    <div className="flex flex-col bg-white h-full bg-foreground w-full items-center justify-center">
      <div className="hidden md:flex bg-white flex-col h-screen w-full items-center justify-center relative">
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
    </div>
  )
}
