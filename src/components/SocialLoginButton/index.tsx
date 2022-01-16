import {
  FacebookLoginButton,
  GithubLoginButton
} from 'react-social-login-buttons'

export const FACEBOOK = 'facebook'
export const GITHUB = 'github'

export type ProviderProps = {
  loginUrl: string
  alias: string
  providerId: string
  displayName: string
}

export const SocialLoginButton = ({ provider }: { provider: ProviderProps }) => {
  const { providerId, loginUrl } = provider

  return providerId === FACEBOOK ? (
    <FacebookLoginButton onClick={() => window.location.href = loginUrl} />
  ) : (
    <GithubLoginButton onClick={() => window.location.href = loginUrl} />
  )
}