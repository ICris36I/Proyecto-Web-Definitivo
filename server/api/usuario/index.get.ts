import { prisma } from "~~/server/utils/prisma"

export default defineCachedEventHandler(async () => {
  return await prisma.usuario.findMany({
    orderBy: { email: 'desc' },
    select: {
    email: true,
    nombre: true,
    apellido: true,
    rol: true
    }
  })
})