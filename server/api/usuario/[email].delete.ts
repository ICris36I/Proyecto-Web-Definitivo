import { prisma } from '~~/server/utils/prisma'
export default defineEventHandler(async (event) => { 
    // Obtiene el email desde la URL (ej: /api/usuario/...@gmail.com -> email = ...@gmail.com ) 
    const email = getRouterParam(event, 'email')

    if (!email) { 
        throw createError({statusCode: 400, statusMessage: 'Ingrese el correo del usuario'})
    }

    // Borra el usuario que sea el mismo email 
    await prisma.usuario.delete({
        where: {email},
    })

    return {ok:true}

})