// import { FC, useMemo } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '../../ui/table'
// import api from '@/components/sing-in/api/interceptors-axios'
// import type { representative } from './zod/types-representative'
// import { FaEdit, FaTrash } from 'react-icons/fa'
// import { SkeletonCard } from '@/components/skeleton-component/skeleton'
// import { Switch } from '@/components/ui/switch'

// const headers = [
//   'Cód.',
//   'Nome',
//   'Celular',
//   'Telefone',
//   'Tipo',
//   'Região',
//   'Status',
//   '',
// ]

// export const translateType = (type: string): string => {
//   switch (type) {
//     case 'REPRESENTATIVE':
//       return 'Representante'
//     case 'CONSULTANT':
//       return 'Consultor'
//     case 'PARTHER':
//       return 'Parceiro'
//     default:
//       return type
//   }
// }

// export const TableRepresentative: FC<{ searchTerm: string }> = ({
//   searchTerm,
// }) => {
//   // const { isOpen: isDeleteOpen, onOpen: onOpenDelete } =
//   //   useRepresentativeDeleteZustand()
//   // const { isOpen: isEditOpen, onOpen: onOpenEdit } =
//   //   useRepresentativeEditZustand()

//   const { data, isLoading, error } = useQuery<representative[], Error>({
//     queryKey: ['get-representative'],
//     queryFn: async () => {
//       const response = await api.get('/representative')
//       return response.data
//     },
//   })

//   const filteredData = useMemo(() => {
//     if (!data) return []

//     const searchTermLower = searchTerm.toLowerCase().trim()
//     const searchWords = searchTermLower.split(/\s+/)

//     const matchAllTerms = (value: string) => {
//       return searchWords.every(word => value.toLowerCase().includes(word))
//     }

//     return data.filter(representative => {
//       if (representative.id.toString() === searchTermLower) return true
//       if (matchAllTerms(representative.name)) return true
//       if (matchAllTerms(representative.cellphone)) return true
//       if (matchAllTerms(representative.phone)) return true
//       if (matchAllTerms(translateType(representative.type))) return true
//       if (matchAllTerms(representative.region)) return true
//       return false
//     })
//   }, [data, searchTerm])

//   const tableContent = useMemo(() => {
//     if (isLoading || !filteredData || filteredData.length === 0) {
//       return (
//         <TableRow>
//           <TableCell colSpan={headers.length}>
//             <div className="flex items-center justify-center">
//               <SkeletonCard />
//             </div>
//           </TableCell>
//         </TableRow>
//       )
//     }
//     if (error) {
//       return (
//         <TableRow>
//           <TableCell colSpan={headers.length}>
//             <div className="items-center justify-center flex w-full">
//               Erro ao carregar os dados: {error.message}
//             </div>
//           </TableCell>
//         </TableRow>
//       )
//     }

//     return filteredData.map((item, i: number) => (
//       <TableRow key={`representative${item.id}-${i}`}>
//         <TableCell className="text-sm items-center sticky">{item.id}</TableCell>
//         <TableCell className="text-sm items-center sticky">
//           {item.name}
//         </TableCell>
//         <TableCell className="text-sm items-center">{item.cellphone}</TableCell>
//         <TableCell className="text-sm items-center">{item.phone}</TableCell>
//         <TableCell className="text-sm items-center">
//           {translateType(item.type)}
//         </TableCell>
//         <TableCell className="text-sm items-center">{item.region}</TableCell>
//         <TableCell className="text-sm items-center">
//           <Switch
//             checked={item.status === 'ativo'}
//             // onCheckedChange={checked => onStatusChange(item.id || 0, checked)}
//           />
//         </TableCell>
//         <TableCell className="flex items-center justify-center w-full h-full space-x-2">
//           <button
//             // onClick={() => onOpenEdit(item.id)}
//             className="text-blue-200 hover:text-blue-500"
//           >
//             <FaEdit size={24} />
//           </button>
//           <button
//             // onClick={() => onOpenDelete(item.id)}
//             className="text-red-200 hover:text-red-500"
//           >
//             <FaTrash size={24} />
//           </button>
//         </TableCell>
//       </TableRow>
//     ))
//   }, [isLoading, error, filteredData, onOpenEdit, onOpenDelete])

//   return (
//     <div className="flex flex-col mt-4">
//       <Table className="min-w-full py-2 text-md">
//         <TableHeader>
//           <TableRow className="bg-gray-300 w-auto">
//             {headers.map((header, index) => (
//               <TableHead
//                 key={index}
//                 className={`text-black w-auto ${index < 2 ? 'sticky' : ''}`}
//               >
//                 {header}
//               </TableHead>
//             ))}
//           </TableRow>
//         </TableHeader>
//         <TableBody>{tableContent}</TableBody>
//       </Table>
//       {/* {isDeleteOpen && <ModalRepresentativeDelete />}
//       {isEditOpen && <EditRepresentativeModal />} */}
//     </div>
//   )
// }

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { FC, useMemo } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import api from '../../sing-in/api/interceptors-axios'
import { SkeletonCard } from '../../skeleton-component/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table'
import { Switch } from '../../ui/switch'

import { toast } from 'react-toastify'
import type { representative } from './zod/types-representative'
import { useRepresentativeDeleteZustand } from './zustand/delete-representative'
import { ModalRepresentativeDelete } from './mod/modal-representative-delete'
import { useRepresentativeEditZustand } from './zustand/edit-representative'
import { EditRepresentative } from './mod/modal-representative-edit'

const headers = [
  'Cód.',
  'Nome',
  'Celular',
  'Telefone',
  'Tipo',
  'Região',
  'Status',
  '',
]

export type TEstablishment = {
  id: number
  name: string
  status: boolean
}

export const translateType = (type: string): string => {
  switch (type) {
    case 'REPRESENTATIVE':
      return 'Representante'
    case 'CONSULTANT':
      return 'Consultor'
    case 'PARTHER':
      return 'Parceiro'
    default:
      return type
  }
}

const RepresentativeRow: FC<{
  item: representative
  onOpenDelete: (id: number) => void
  onOpenEdit: (id: number) => void
  onStatusChange: (id: number, newStatus: boolean) => void
}> = ({ item, onOpenDelete, onOpenEdit, onStatusChange }) => (
  <TableRow key={`representative${item.id}`}>
    <TableCell className="text-sm items-center sticky">{item.id}</TableCell>
    <TableCell className="text-sm items-center sticky">{item.name}</TableCell>
    <TableCell className="text-sm items-center">{item.cellphone}</TableCell>
    <TableCell className="text-sm items-center">{item.phone}</TableCell>
    <TableCell className="text-sm items-center">
      {translateType(item.type)}
    </TableCell>
    <TableCell className="text-sm items-center">{item.region}</TableCell>
    <TableCell className="text-sm items-center">
      <Switch
        checked={item.status === 'ativo'}
        onCheckedChange={checked => onStatusChange(item.id || 0, checked)}
      />
    </TableCell>
    <TableCell className="flex items-center justify-center w-full h-full space-x-2">
      <button
        onClick={() => onOpenEdit(item.id)}
        className="text-blue-200 hover:text-blue-500"
      >
        <FaEdit size={24} />
      </button>
      <button
        onClick={() => onOpenDelete(item.id)}
        className="text-red-200 hover:text-red-500"
      >
        <FaTrash size={24} />
      </button>
    </TableCell>
  </TableRow>
)

const LoadingRow: FC = () => (
  <TableRow>
    <TableCell colSpan={4}>
      <SkeletonCard />
    </TableCell>
  </TableRow>
)

export const TableRepresentative: FC<{ searchTerm: string }> = ({
  searchTerm,
}) => {
  const { isOpen, onOpen } = useRepresentativeDeleteZustand()
  const { isOpen: isOpenEdit, onOpen: onOpenEdit } =
    useRepresentativeEditZustand()
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery<representative[], Error>({
    queryKey: ['get-representative'],
    queryFn: async () => {
      const response = await api.get('/representative')
      return response.data
    },
  })

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      id,
      newStatus,
    }: {
      id: number
      newStatus: boolean
    }) => {
      const response = await api.patch(
        `/representative`,
        { status: newStatus },
        { params: { id } },
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-establishment'] })
      toast.success('Status atualizado com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao atualizar o status. Por favor, tente novamente.')
    },
  })

  const handleStatusChange = (id: number, newStatus: boolean) => {
    updateStatusMutation.mutate({ id, newStatus })
  }

  const filteredData = useMemo(() => {
    if (!data) return []

    const searchTermLower = searchTerm.toLowerCase().trim()
    const searchWords = searchTermLower.split(/\s+/)

    const matchAllTerms = (value: string) => {
      return searchWords.every(word => value.toLowerCase().includes(word))
    }

    return data.filter(establishment => {
      if (establishment.id.toString() === searchTermLower) return true
      if (matchAllTerms(establishment.name)) return true
      if (matchAllTerms(establishment.status ? 'Ativo' : 'Inativo')) return true
      return false
    })
  }, [data, searchTerm])

  const tableContent = useMemo(() => {
    if (isLoading || !filteredData || filteredData.length === 0) {
      return <LoadingRow />
    }
    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={4}>
            <div className="items-center justify-center flex w-full ">
              Erro ao carregar os dados: {error.message}
            </div>
          </TableCell>
        </TableRow>
      )
    }

    return filteredData.map(data => (
      <RepresentativeRow
        key={data.id}
        item={data}
        onOpenEdit={onOpenEdit}
        onOpenDelete={onOpen}
        onStatusChange={handleStatusChange}
      />
    ))
  }, [isLoading, error, filteredData, handleStatusChange, onOpenEdit, onOpen])

  return (
    <div className="flex flex-col mt-4">
      <Table className="min-w-full py-2 text-lg">
        <TableHeader>
          <TableRow className="bg-gray-300 w-auto">
            {headers.map((header, index) => (
              <TableHead key={index} className="text-black w-auto">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{tableContent}</TableBody>
      </Table>
      {isOpen && <ModalRepresentativeDelete />}
      {isOpenEdit && <EditRepresentative />}
    </div>
  )
}
