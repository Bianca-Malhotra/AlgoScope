import { createContext } from 'react'

export const MODE_STORAGE_KEY = 'algoscope-active-mode'

export const MODE_KEYS = {
  prep: 'prep',
  practice: 'practice',
  about: 'about',
}

export const ModeContext = createContext(null)