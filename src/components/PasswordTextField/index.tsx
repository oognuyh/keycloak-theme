import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material'
import { useKcMessage } from 'keycloakify'
import { ChangeEvent, MouseEvent, useState } from 'react'

export const PasswordTextField = ({ pwd, onPasswordChange, ...props }: { pwd: string, onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void } & TextFieldProps) => {
  const { msg, msgStr } = useKcMessage()
  const [isPasswordVisible, setPasswordIsVisible] = useState(false)

  const handleClickShowPassword = () => {
    setPasswordIsVisible(!isPasswordVisible)
  }

  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <TextField
      id='password'
      name='password'
      label={msg('password')}
      margin='normal'
      fullWidth
      required
      type={isPasswordVisible ? 'text' : 'password'}
      value={pwd}
      onChange={onPasswordChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDown}
            >
              {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )}}
      {...props}
    />
  )
}
