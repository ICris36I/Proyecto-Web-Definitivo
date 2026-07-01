import { prisma } from '~~/server/utils/prisma'
export default defineEventHandler(async () => {
  const eventos = await prisma.evento.findMany({
    include: {
      _count: {
        select: { inscritos: true } //lleva la cuenta de las personas inscritas a cada evento
      }
    }
  })
  return eventos
})