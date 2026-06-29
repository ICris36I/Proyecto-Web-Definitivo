
import type { Usuario } from '@prisma/client'

declare module '#auth-utils' {
  interface User extends Omit<Usuario, 'password'> {}
}

export {}