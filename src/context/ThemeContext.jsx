import { createTheme, ThemeProvider } from '@mui/material/styles'
import { createContext, useMemo, useState } from 'react'
import { DarkTheme } from './DarkTheme'
import { LightTheme } from './LightTheme'

export const ColorModeContext = createContext({ toggleColorMode: () => {} })

export const ColorProvider = ({ children }) => {
  const [mode, setMode] = useState('light')

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'))
        localStorage.setItem('theme', mode)
      }
    }),
    [mode]
  )
  const theme = useMemo(() => createTheme(mode === 'light' ? LightTheme : DarkTheme), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}
