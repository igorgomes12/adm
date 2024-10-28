import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  SignInFormDto,
  signInSchemaDto,
} from '@/features/sign-in/domain/dto/sign-in.dto'

export const useSignInForm = () => {
  return useForm<SignInFormDto>({
    defaultValues: {
      email: 'lideradmin@gmail.com',
      password: '121195Ig.',
    },
    resolver: zodResolver(signInSchemaDto),
  })
}
