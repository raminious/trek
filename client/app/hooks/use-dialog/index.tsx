import { useContext } from 'react'

import { DialogContext } from './Context'

export function useDialog() {
  return useContext(DialogContext)
}
