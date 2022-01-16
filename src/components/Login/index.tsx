import { useState, FormEvent, memo, ChangeEvent } from 'react'
import { KcProps, KcContextBase, useKcMessage } from 'keycloakify'
import { Template } from '../Template'
import { useCssAndCx } from 'tss-react'
import { Box, Checkbox, Divider, FormControlLabel, Link, Stack, TextField, Typography } from '@mui/material'
import { useConstCallback } from 'powerhooks'
import { LoadingButton } from '@mui/lab'
import { SocialLoginButton } from '../SocialLoginButton'
import { PasswordTextField } from '../PasswordTextField'

export const Login = memo(({ kcContext, ...props }: { kcContext: KcContextBase.Login } & KcProps) => {
  const { msg, msgStr } = useKcMessage()
  const { social, realm, url, usernameEditDisabled, login, message, auth, registrationDisabled } = kcContext
  const { css, cx } = useCssAndCx()
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false)
  const [values, setValues] = useState({
    username: '',
    password: '',
  })
  const onSubmit = useConstCallback((event: FormEvent<HTMLFormElement>) => {
    setIsLoginButtonDisabled(true);
    
    return true;
  })
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  return (
    <Template
      {...{ kcContext, ...props }}
      doFetchDefaultThemeResources={false}
      displayInfo={social.displayInfo}
      displayWide={realm.password && social.providers !== undefined}
      headerNode={msg('doLogIn')}
      formNode={
        <Box>
          {realm.password && social.providers && (<Stack spacing={2}>
            {social.providers.map((provider) => (
              <SocialLoginButton key={provider.providerId} provider={provider} />))}

            <Divider>
              <Typography color='gray'>
                OR
              </Typography>
            </Divider>
          </Stack>)}

          <Box 
            component='form'
            id='kc-form-login'
            action={url.loginAction}
            onSubmit={onSubmit}
            method='post'
          >
            <Stack spacing={2}>
              <Box>
                {/* Username or E-mail */}
                <TextField 
                  id='username' 
                  name='username' 
                  defaultValue={login.username ?? ''}
                  label={
                    !realm.loginWithEmailAllowed
                      ? msg('username')
                      : !realm.registrationEmailAsUsername
                      ? msg('usernameOrEmail')
                      : msg('email')
                  }
                  onChange={onChange}
                  autoComplete='email'
                  margin='normal' 
                  type='text'
                  fullWidth 
                  autoFocus
                  required 
                />

                {/* Password */}
                <PasswordTextField 
                  pwd={values.password} 
                  onPasswordChange={onChange} 
                />
                
                <Box display='flex' justifyContent={realm.rememberMe && !usernameEditDisabled ? 'space-between' : 'end'} alignItems='center'>
                  {/* Remember Me */}
                  {realm.rememberMe && !usernameEditDisabled && (
                    <FormControlLabel
                      control={<Checkbox id='rememberMe' name='rememberMe' color='primary' />}
                      label={msg('rememberMe')}
                    />)}

                  {/* Forgot Password */}
                  {realm.resetPasswordAllowed && (
                    <Box display='flex' justifyContent='center' >
                      <Link href={url.loginResetCredentialsUrl} underline='none'>{msgStr('doForgotPassword')}</Link>
                    </Box>)}
                </Box>
              </Box>

              {/* Login Button */}
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={isLoginButtonDisabled}
                disabled={isLoginButtonDisabled}
              >
                {msg('doLogIn')}
              </LoadingButton>
            </Stack>
          </Box>
        </Box>
      }
      infoNode={
        // Register Link Button
        realm.password && realm.registrationAllowed && !registrationDisabled && (
          <Box id='kc-registration' display='flex' justifyContent='center'>
            <Typography color='gray' mr={1}>{msg('noAccount')}</Typography>
            <Link href={url.registrationUrl} underline='none'>{msg('doRegister')}</Link>
          </Box>
      )}
    />
  )
})