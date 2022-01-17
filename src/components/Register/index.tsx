import { ChangeEvent, memo, useState } from 'react'
import { KcProps, KcContextBase, useKcMessage } from 'keycloakify'
import { Template } from '../Template'
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { PasswordTextField } from '../PasswordTextField'

export const Register = memo(({ kcContext, ...props }: { kcContext: KcContextBase.Register  } & KcProps) => {
  const { url, message, messagesPerField, register, realm, passwordRequired, recaptchaRequired, recaptchaSiteKey } =
    kcContext
  const { msg, msgStr } = useKcMessage()
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',

  })
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({...prev, [e.target.name === 'password-confirm' ? 'passwordConfirm' : e.target.name]: e.target.value}))
  }

  return (
    <Template
      {...{ kcContext, ...props }}
      doFetchDefaultThemeResources={false}
      displayInfo={true}
      displayMessage={messagesPerField.exists('global')}
      headerNode={msg('registerTitle')}
      formNode={
        <Box 
          component='form'  
          id='kc-form'
          action={url.registrationAction}
          method='post'
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="firstName"
                type='text'
                name="firstName"
                variant="outlined"
                required
                fullWidth
                onChange={onChange}
                margin="normal"
                id="firstName"
                label={msg('firstName')}
                autoFocus
                defaultValue={register.formData.firstName ?? ''}
                error={messagesPerField.existsError('firstName')}
                helperText={messagesPerField.existsError('firstName') && messagesPerField.get('firstName')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                onChange={onChange}
                margin="normal"
                fullWidth
                id="lastName"
                label={msg('lastName')}
                name="lastName"
                autoComplete="lastName"
                defaultValue={register.formData.lastName ?? ''}
                error={messagesPerField.existsError('lastName')}
                helperText={messagesPerField.existsError('lastName') && messagesPerField.get('lastName')}
              />
            </Grid>

            {!realm.registrationEmailAsUsername && (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  onChange={onChange}
                  margin="normal"
                  name="username"
                  label={msg('username')}
                  type="text"
                  autoComplete='username'
                  defaultValue={register.formData.username ?? ''}
                  error={messagesPerField.existsError('username')}
                  helperText={messagesPerField.existsError('username') && messagesPerField.get('username')}
                />
              </Grid>)}

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                onChange={onChange}
                margin="normal"
                label={msg('email')}
                name="email"
                autoComplete="email"
                defaultValue={register.formData.email ?? ''}
                error={messagesPerField.existsError('email')}
                helperText={messagesPerField.existsError('email') && messagesPerField.get('email')}
              />
            </Grid>
            
            {passwordRequired && (
              <Grid item xs={12}>
                <PasswordTextField
                  variant="outlined"
                  pwd={values.password}
                  onPasswordChange={onChange}
                  label={msg('password')}
                  id="password"
                  error={messagesPerField.existsError('password')}
                  helperText={messagesPerField.existsError('password') && messagesPerField.get('password')}
                />
              </Grid>)}

            {passwordRequired && (  
              <Grid item xs={12}>
                <PasswordTextField
                  variant="outlined"
                  pwd={values.passwordConfirm}
                  onPasswordChange={onChange}
                  name="password-confirm"
                  label={msg('passwordConfirm')}
                  id="password-confirm"
                  error={messagesPerField.existsError('password-confirm')}
                  helperText={messagesPerField.existsError('password-confirm') && messagesPerField.get('password-confirm')}
                />
              </Grid>)}

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="user.attributes.phoneNumber"
                label={'Phonenumber'}
                margin="normal"
                name="user.attributes.phoneNumber"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                {msg('doRegister')}
              </Button>
            </Grid>
          </Grid>
        </Box>
      }
      infoNode={
        <Box display='flex' justifyContent='center'>
          <Typography color='gray' mr={1}>Already have an account?</Typography>
          <Link href={url.loginUrl} underline='none'>{msg('doLogIn')}</Link>
        </Box>
      }
    />
  )
})
