import { useKcMessage } from 'keycloakify'
import { memo } from 'react'
import { Template } from '../Template'

import type { KcContextBase, KcProps } from 'keycloakify'
import { Box, Link, Stack, Typography } from '@mui/material'

export const LoginPageExpired = memo(
  ({ kcContext, ...props }: { kcContext: KcContextBase.LoginPageExpired } & KcProps) => {
    const { msg } = useKcMessage()
    const { url } = kcContext

    return (
      <Template
        {...{ kcContext, ...props }}
        doFetchDefaultThemeResources={false}
        displayMessage={false}
        headerNode={msg('pageExpiredTitle')}
        formNode={
          <Stack spacing={2} fontSize='small'>
            <Typography variant='h5' sx={{marginBottom: 2}} align='center'>{msg('pageExpiredTitle')}</Typography>
            
            <Box display='flex' justifyContent='start' alignItems='center'>
              <Typography color='gray' mr={1}>{msg('pageExpiredMsg1')}</Typography>
              <Link href={url.loginRestartFlowUrl} underline='none'>{msg('doClickHere')}</Link>
            </Box>

            <Box display='flex' justifyContent='start' alignItems='center'>
              <Typography color='gray' mr={1}>{msg('pageExpiredMsg2')}</Typography>
              <Link href={url.loginAction} underline='none'>{msg('doClickHere')}</Link>
            </Box>  
          </Stack>
        }
      />
    )
  }
)
