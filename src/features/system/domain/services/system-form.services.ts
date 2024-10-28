import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SystemSchemaDto, type TSystemSchemaDto } from '../dto/system.dto'

export const useSystemForm = (): UseFormReturn<TSystemSchemaDto> => {
  return useForm<TSystemSchemaDto>({
    defaultValues: {
      name: '',
      image_url: undefined,
      description: '',
    },
    resolver: zodResolver(SystemSchemaDto),
  })
}
