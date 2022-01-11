import React from 'react'
import { defaultKcProps } from 'keycloakify'
import { kcContext } from './kcContext'
import { KcApp } from './KcApp'
import { Grommet, grommet } from 'grommet'

const App: React.FC = () => {
  if (kcContext === undefined) throw new Error('kcContext is undefined.')

  return (
    <Grommet full theme={grommet}>
      <KcApp
        kcContext={kcContext}
        {...{
          ...defaultKcProps,
        }}
      />
    </Grommet>
  )
}

export default App
