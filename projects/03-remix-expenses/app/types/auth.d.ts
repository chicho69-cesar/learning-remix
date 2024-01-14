export interface Credentials {
  email:    string
  password: string
}

export type CredentialsNotRequired = {
  [T in keyof Credentials]?: Credentials[T]
}
