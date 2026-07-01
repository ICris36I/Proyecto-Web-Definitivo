import { prisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const { email, nombre, apellido, eventoId } = await readBody(event)

  if (!email || !nombre || !apellido || !eventoId) {
    throw createError({ statusCode: 400, statusMessage: 'Todos los campos son obligatorios' })
  }

  const yaInscrito = await prisma.inscrito.findFirst({
    where: {
      email,
      eventoId: Number(eventoId),
    },
  })

  if (yaInscrito) {
    throw createError({ statusCode: 409, statusMessage: 'Ya estás inscrito en este evento' })
  }

  const inscrito = await prisma.inscrito.create({
    data: {
      email,
      nombre,
      apellido,
      eventoId: Number(eventoId),
    },
  })

  return inscrito
})