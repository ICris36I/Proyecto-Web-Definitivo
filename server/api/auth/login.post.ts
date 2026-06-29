import bcrypt from 'bcryptjs'
import { prisma } from '~~/server/utils/prisma'


export default defineEventHandler(async (event) => { //define endpoint
  const { email, password } = await readBody(event) //lee email y contraseña
  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email y contraseña son obligatorios' }) //si no hay datos ingresados, coloca mensaje de error
  }

  const usuario = await prisma.usuario.findUnique({
    where: { email }, //busca mail en la base de datos
  })

  if (!usuario) {
    throw createError({ statusCode: 401, statusMessage: 'Credenciales incorrectas' }) //si no encuentra, error
  }

  const passwordOk = await bcrypt.compare(password, usuario.password) //busca contraseña en base de datos

  if (!passwordOk) {
    throw createError({ statusCode: 401, statusMessage: 'Credenciales incorrectas' }) //si no encuentra, error
  }

  await setUserSession(event, { //se crea la sesion guardando todos los datos menos la contraseña
    user: {
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: usuario.rol,
    },
  }) 

  return { ok: true } //retorna positivamente 
})