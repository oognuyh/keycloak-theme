import { memo } from 'react'
import { KcProps, KcContextBase, useKcMessage } from 'keycloakify'
import { Template } from '../Template'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'

export const LoginResetPassword = memo(({ kcContext, ...props }: { kcContext: KcContextBase.LoginResetPassword } & KcProps) => {
    const { msg, msgStr } = useKcMessage()
    const { url, realm, auth, messagesPerField } = kcContext

  return (
    <Template
      {...{ kcContext, ...props }}
      doFetchDefaultThemeResources={false}
      headerNode={msg('emailForgotTitle')}
      displayMessage={!messagesPerField.existsError('username')}
      displayInfo={true}
      formNode={
        <Box>
          <Box 
            component='form'
            id='kc-form-login'
            action={url.loginAction}
            method='post'
          >
            <Stack spacing={2}>
              <Typography textAlign="center">{msg("emailInstruction")}</Typography>
              
              
              {/* Username or E-mail */}
              <TextField 
                id='username' 
                name='username' 
                label={
                  !realm.loginWithEmailAllowed
                    ? msg('username')
                    : !realm.registrationEmailAsUsername
                    ? msg('usernameOrEmail')
                    : msg('email')
                }
                autoComplete='email'
                margin='normal' 
                type='text'
                fullWidth 
                autoFocus
                required 
                error={messagesPerField.existsError('username')}
                helperText={messagesPerField.existsError('username') && messagesPerField.get('username')}
                defaultValue={
                  auth !== undefined && auth.showUsername
                    ? auth.attemptedUsername
                    : undefined
                }
              />
              
              {/* doSumit */}
              <Box display='flex' justifyContent='end'>
                <Button type="submit" variant='contained'>
                  {msg('doSubmit')}
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      }
      infoNode={
        <Box id='kc-registration' display='flex' justifyContent='start'>
          <Button href={url.loginUrl}>
            {msg('backToLogin')}
          </Button>
        </Box>
      }
    />
  )
})