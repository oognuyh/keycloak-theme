import { getKcContext } from 'keycloakify'

export const { kcContext } = getKcContext<
  | {
      pageId: 'register.ftl'
    }
  //NOTE: A 'keycloakify' field must be added
  //in the package.json to generate theses pages
  | {
      pageId: 'login-page-expired.ftl'
    }
  | {
      pageId: 'login-update-password.ftl'
      username: string
      messagesPerField?: {
        printIfExists<T>(key: 'password' | 'password-confirm', x: T): T | undefined
      }
    }
>({
  mockPageId: 'register.ftl',
  mockData: [
    {
      pageId: 'register.ftl',
    },
  ],
  // mockPageId: "error.ftl",
  // mockData: [
  //   {
  //     pageId: "error.ftl",
  //   },
  // ],
})

export type KcContext = NonNullable<typeof kcContext>
