import { motion } from 'framer-motion'
import type { FC } from 'react'

export const FormHeader: FC<{ title: string }> = ({ title }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          scale: 0.8,
          opacity: 0,
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: 0.2,
          },
        },
      }}
      className="flex items-start justify-start"
    >
      <h1 className="text-2xl font-semibold">{title}</h1>
    </motion.div>
  )
}
