import bcrypt from 'bcryptjs'
import { prisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password, nombre, apellido } = body

  // Validación básica
  if (!email || !password || !nombre || !apellido) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Todos los campos son obligatorios',
    })
  }

  // Verificar que el email no exista ya
  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email },
  })

  if (usuarioExistente) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Ya existe un usuario con ese email',
    })
  }

  // Encriptar la contraseña
  const passwordHash = await bcrypt.hash(password, 10)

  // Crear el usuario con rol fijo "staff"
  const nuevoUsuario = await prisma.usuario.create({
    data: {
      email,
      password: passwordHash,
      nombre,
      apellido,
      rol: 'staff',
    },
    select: {
      email: true,
      nombre: true,
      apellido: true,
      rol: true,
    },
  })

  return nuevoUsuario
})