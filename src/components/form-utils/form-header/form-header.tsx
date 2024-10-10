import type { FC } from 'react'

export const FormHeader: FC<{ title: string }> = ({ title }) => {
  return (
    <div className="flex items-start justify-start">
      <h1 className="text-2xl font-semibold">{title}</h1>
    </div>
  )
}
