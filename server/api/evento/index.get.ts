import { prisma } from "~~/server/utils/prisma"

export default defineCachedEventHandler(async () => {
    return await prisma.evento.findMany({
        orderBy: { id: 'desc' }
    })
})