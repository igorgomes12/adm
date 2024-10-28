import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInFormDto, signInSchemaDto } from '../dto/sign-in.dto'

export const useSignInForm = (): UseFormReturn<SignInFormDto> => {
  return useForm<SignInFormDto>({
    defaultValues: {
      email: 'lideradmin@gmail.com',
      password: '121195Ig.',
    },
    resolver: zodResolver(signInSchemaDto),
  })
}
