import type { FC } from 'react'

interface IContactFormClientProps {
  onNext: (data: any) => void
}

export const ContactFormClient: FC<IContactFormClientProps> = ({ onNext }) => {
  return <div>client</div>
}
