import { prisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Falta el id del evento' })
  }

  // Primero borrar los inscritos de ese evento
  await prisma.inscrito.deleteMany({
    where: { eventoId: Number(id) }
  })

  // Luego borrar el evento
  await prisma.evento.delete({
    where: { id: Number(id) },
  })

  return { ok: true }
})