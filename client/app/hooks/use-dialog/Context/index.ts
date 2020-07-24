import { createContext } from 'react'

export interface Confirmation {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
}

export interface Context {
  confirmation: (options: Confirmation) => void
}

export const DialogContext = createContext<Context>({
  confirmation: () => {}
})
