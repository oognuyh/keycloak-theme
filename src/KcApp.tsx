import { memo } from 'react'
import { defaultKcProps } from 'keycloakify'

import { LoginOtp } from 'keycloakify/lib/components/LoginOtp'
import { Register } from 'keycloakify/lib/components/Register'
import { Login } from 'keycloakify/lib/components/Login'
import { Terms } from 'keycloakify/lib/components/Terms'
import { Error } from 'keycloakify/lib/components/Error'
import { LoginIdpLinkConfirm } from 'keycloakify/lib/components/LoginIdpLinkConfirm'
import { Info } from 'keycloakify/lib/components/Info'
import { LoginResetPassword } from 'keycloakify/lib/components/LoginResetPassword'
import { LoginVerifyEmail } from 'keycloakify/lib/components/LoginVerifyEmail'
import { LoginUpdatePassword } from 'keycloakify/lib/components/LoginUpdatePassword'
import { LoginPageExpired } from 'keycloakify/lib/components/LoginPageExpired'
import { LoginUpdateProfile } from 'keycloakify/lib/components/LoginUpdateProfile'

import type { KcContext } from './kcContext'

export const KcApp = memo(({ kcContext }: { kcContext: KcContext }) => {
  const kcProps = defaultKcProps

  console.debug('KcApp kcContext.pageId', kcContext.pageId)

  switch (kcContext.pageId) {
    case 'login.ftl':
      return <Login {...{ kcContext, ...kcProps }} />
    case 'register.ftl':
      return <Register {...{ kcContext, ...kcProps }} />
    case 'terms.ftl':
      return <Terms {...{ kcContext, ...kcProps }} />
    case 'info.ftl':
      return <Info {...{ kcContext, ...kcProps }} />
    case 'error.ftl':
      return <Error {...{ kcContext, ...kcProps }} />
    case 'login-reset-password.ftl':
      return <LoginResetPassword {...{ kcContext, ...kcProps }} />
    case 'login-verify-email.ftl':
      return <LoginVerifyEmail {...{ kcContext, ...kcProps }} />
    case 'login-otp.ftl':
      return <LoginOtp {...{ kcContext, ...kcProps }} />
    case 'login-update-profile.ftl':
      return <LoginUpdateProfile {...{ kcContext, ...kcProps }} />
    case 'login-idp-link-confirm.ftl':
      return <LoginIdpLinkConfirm {...{ kcContext, ...kcProps }} />
    case 'login-update-password.ftl':
      return <LoginUpdatePassword {...{ kcContext, ...kcProps }} />
    case 'login-page-expired.ftl':
      return <LoginPageExpired {...{ kcContext, ...kcProps }} />
    default:
      return null
  }
})
