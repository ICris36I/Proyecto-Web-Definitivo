import { prisma } from '~~/server/utils/prisma'
export default defineEventHandler(async (event) => { 
    // Obtine el id desde la URL (/api/admin/7 -> id = "7")
    const id = getRouterParam(event, 'id')

    if (!id) { 
        throw createError({statusCode: 400, statusMessage: 'Falata el id de la inscripcion'})
    }
    // Borra la inscripcion que sea el mismo id
    await prisma.inscrito.delete({
        where: {id: Number(id)},
    })

    return {ok:true}
})