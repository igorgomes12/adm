import type { ImageDropzoneProps } from '@/features/system/domain/entity/image-dropzone'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { GoPaperclip } from 'react-icons/go'

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  onFileSelect,
  value,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0])
      }
    },
    [onFileSelect],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    maxFiles: 1,
  })

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <div className="border-2 border-dashed border-gray-300 gap-2 rounded-lg p-4 flex text-center cursor-pointer">
        <GoPaperclip />

        <p className="text-gray-500 text-sm">
          {!isDragActive && 'Arraste e solte para adicionar imagem'}
        </p>
        {value && (
          <p className="mt-2">{value instanceof File ? value.name : value}</p>
        )}
      </div>
    </div>
  )
}
