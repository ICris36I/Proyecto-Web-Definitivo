import { prisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const { email } = getQuery(event)

  if (!email) {
    throw createError({ statusCode: 400, statusMessage: 'El email es obligatorio' })
  }

  const inscripciones = await prisma.inscrito.findMany({
    where: { email: String(email) },
    include: { evento: true },
  })

  return inscripciones
})