import { prisma } from "~~/server/utils/prisma"

export default defineCachedEventHandler(async () => {
  return await prisma.inscrito.findMany({
    orderBy: { id: 'desc' }
  })
})