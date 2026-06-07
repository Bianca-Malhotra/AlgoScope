import { useCallback, useEffect, useMemo, useState } from 'react'
import { MODE_KEYS, MODE_STORAGE_KEY, ModeContext } from './mode'

const VALID_MODES = new Set(Object.values(MODE_KEYS))

const getInitialMode = () => {
  if (typeof window === 'undefined') {
    return MODE_KEYS.prep
  }

  try {
    const savedMode = window.localStorage.getItem(MODE_STORAGE_KEY)

    if (savedMode && VALID_MODES.has(savedMode)) {
      return savedMode
    }
  } catch {
    // Ignore storage failures and fall back to the default mode.
  }

  return MODE_KEYS.prep
}

export const ModeProvider = ({ children }) => {
  const [activeMode, setActiveMode] = useState(getInitialMode)

  useEffect(() => {
    try {
      window.localStorage.setItem(MODE_STORAGE_KEY, activeMode)
    } catch {
      // Mode still works even when storage is unavailable.
    }
  }, [activeMode])

  const setMode = useCallback((mode) => {
    if (VALID_MODES.has(mode)) {
      setActiveMode(mode)
    }
  }, [])

  const value = useMemo(
    () => ({
      activeMode,
      setActiveMode: setMode,
      isPrep: activeMode === MODE_KEYS.prep,
      isPractice: activeMode === MODE_KEYS.practice,
      isAbout: activeMode === MODE_KEYS.about,
    }),
    [activeMode, setMode]
  )

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>
}