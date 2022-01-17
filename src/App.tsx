import React from 'react'
import { defaultKcProps, getKcContext } from 'keycloakify'
import { KcApp } from './KcApp'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

const theme = createTheme()
const { kcContext } = getKcContext({
  //mockPageId: 'login-page-expired.ftl'
})

const App: React.FC = () => {
  if (kcContext === undefined) throw new Error('kcContext is undefined.')

  return (
    <ThemeProvider 
      theme={theme}
    >
      <CssBaseline />
      <KcApp
        kcContext={kcContext}
        {...{
          ...defaultKcProps,
        }}
      />
    </ThemeProvider>
  )
}

export default App
