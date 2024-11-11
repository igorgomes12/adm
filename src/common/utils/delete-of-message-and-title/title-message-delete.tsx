import type { FC } from "react"

type TitleMessageProps = {
  title: string
  message: string
}
export const TitleMessageDelete: FC<TitleMessageProps> = ({
  title,
  message,
}) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <h1 className="text-lg sm:text-xl font-semibold mb-4 text-center">
        {title}
      </h1>
      <p className="text-center mb-4">{message}</p>
    </div>
  )
}
